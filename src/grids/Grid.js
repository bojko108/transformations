const MAGIC = 'BCSG';
const MAGIC_BUF = Buffer.from(MAGIC, 'ascii');
const VERSION = 1;
const SUPPORTED_VERSION = 1;
const FLAGS_FLOAT64 = 0b00000001;

/**
 * Regular correction grid for transforming coordinates between two coordinate systems.
 *
 * The grid stores per-node \(dx, dy\) shifts and a validity flag, and supports
 * bilinear interpolation to compute a shift for any point inside the grid extent.
 *
 * Coordinates follow the project's convention:
 * - `x` → 0 / easting / longitude
 * - `y` → 1 / northing / latitude
 *
 * @export
 * @class Grid
 */
export default class Grid {
    /**
     * Create a new grid instance.
     *
     * `extent` is given in the **source** CRS units (meters for the supported BGS systems).
     * The grid nodes are generated starting from `floor(minX)` and `floor(minY)` to
     * align to integer coordinates.
     *
     * @param {{minX:number, minY:number, maxX:number, maxY:number}} extent Grid extent in source CRS.
     * @param {number} size Grid cell size (resolution) in source CRS units.
     * @param {string} sourceCRS Source coordinate system name (e.g. `BGS_1930_24`).
     * @param {string} targetCRS Target coordinate system name (e.g. `BGS_2005_KK`).
     * @param {number[]} [dx=[]] Flat array of x-shifts per grid node (row-major).
     * @param {number[]} [dy=[]] Flat array of y-shifts per grid node (row-major).
     * @param {boolean[]} [valid=[]] Flat array of validity flags per grid node (row-major).
     */
    constructor(extent, size, sourceCRS, targetCRS, dx = [], dy = [], valid = []) {
        const name = `${sourceCRS}_to_${targetCRS}`;

        //remove extent and keep only x0, y0 propertiesnpm run 
        const { minX, minY, maxX, maxY } = extent;

        const x0 = Math.floor(minX);
        const y0 = Math.floor(minY);
        const rows = Math.ceil((maxY - minY) / size);
        const cols = Math.ceil((maxX - minX) / size);
        const stride = cols + 1;

        /**
         * Grid metadata required to interpret the arrays and locate/interpolate nodes.
         *
         * @type {{
         *   name: string,
         *   sourceCRS: string,
         *   targetCRS: string,
         *   rows: number,
         *   cols: number,
         *   stride: number,
         *   minX: number,
         *   minY: number,
         *   maxX: number,
         *   maxY: number,
         *   x0: number,
         *   y0: number,
         *   size: number
         * }}
         */
        this.metadata = { name, sourceCRS, targetCRS, rows, cols, stride, minX, minY, maxX, maxY, x0, y0, size };

        /** @type {number[]} Flat array of x-shifts per node (row-major, length = (rows+1)*(cols+1)). */
        this.dx = dx;
        /** @type {number[]} Flat array of y-shifts per node (row-major, length = (rows+1)*(cols+1)). */
        this.dy = dy;
        /** @type {boolean[]} Flat array of validity flags per node (row-major). */
        this.valid = valid;
    }

    /**
     * Create a `Grid` instance from previously serialized JSON.
     *
     * @param {{metadata: object, dx: number[], dy: number[], valid: boolean[]}} json Serialized grid.
     * @returns {Grid} A new `Grid` instance.
     */
    static LoadFromJson(json) {
        const { metadata, dx, dy, valid } = json;
        const { sourceCRS, targetCRS, minX, minY, maxX, maxY, size } = metadata;

        return new Grid({ minX, minY, maxX, maxY }, size, sourceCRS, targetCRS, dx, dy, valid);
    }

    /**
     * Load a `Grid` from a .bcsg binary buffer.
     * 
     * Binary layout (must match gridBinaryWriter.js):
     *   [0-3]       magic       char[4]   "BCSG"
     *   [4]         version     uint8     1
     *   [5]         flags       uint8     bit0 = float64
     *   [6-7]       meta_len    uint16BE  byte length of metadata JSON
     *   [8 .. 8+meta_len-1]     utf8      metadata JSON string
     *   [8+meta_len ..]         float64[] dx  — M doubles, big-endian
     *   [.. + 8*M]              float64[] dy  — M doubles, big-endian
     *   [.. + 8*M]              uint8[]   valid bits — ceil(M/8) bytes, LSB-first
     *
     * @param {Buffer | ArrayBuffer | Uint8Array} data Binary data of a .bcsg file.
     * @returns {{ metadata: object, dx: number[], dy: number[], valid: boolean[] }}
     * @throws {Error} On magic mismatch, unsupported version, or truncated data.
     */
    static LoadFromBinary(data) {
        // Normalize to Node.js Buffer for convenient readXxx helpers
        const buf = Buffer.isBuffer(data) ? data : Buffer.from(data);

        // ---------- Header (8 bytes) ----------
        if (buf.length < 8) {
            throw new Error('File too small to contain a valid BCSG header');
        }

        const magic = buf.subarray(0, 4).toString('ascii');
        if (magic !== MAGIC) {
            throw new Error(`Expected "BCSG", got "${magic}"`);
        }

        const version = buf.readUInt8(4);
        if (version !== SUPPORTED_VERSION) {
            throw new Error(`Unsupported BCSG version: ${version} (expected ${SUPPORTED_VERSION})`);
        }

        const flags = buf.readUInt8(5);
        const isFloat64 = (flags & FLAGS_FLOAT64) !== 0;
        const floatBytes = isFloat64 ? 8 : 4;

        const metaLen = buf.readUInt16BE(6);

        // ---------- Metadata
        const metaStart = 8;
        const metaEnd = metaStart + metaLen;
        if (buf.length < metaEnd) {
            throw new Error('Metadata section extends beyond buffer');
        }
        
        const metadata = JSON.parse(buf.subarray(metaStart, metaEnd).toString('utf8'));
        const M = (metadata.rows + 1) * (metadata.cols + 1);

        // ---------- Data section offsets ----------
        const dxStart = metaEnd;
        const dyStart = dxStart + M * floatBytes;
        const validStart = dyStart + M * floatBytes;
        const validByteCount = Math.ceil(M / 8);
        const expectedSize = validStart + validByteCount;

        if (buf.length < expectedSize) {
            throw new Error(
                `Expected ${expectedSize} bytes, got ${buf.length} ` +
                `(M=${M} nodes, float${isFloat64 ? 64 : 32})`
            );
        }

        // ---------- Read dx / dy ----------
        const dx = new Array(M);
        const dy = new Array(M);

        if (isFloat64) {
            for (let i = 0; i < M; i++) {
                dx[i] = buf.readDoubleBE(dxStart + i * 8);
                dy[i] = buf.readDoubleBE(dyStart + i * 8);
            }
        } else {
            // float32 path kept for forward-compatibility with future file variants
            for (let i = 0; i < M; i++) {
                dx[i] = buf.readFloatBE(dxStart + i * 4);
                dy[i] = buf.readFloatBE(dyStart + i * 4);
            }
        }

        // ---------- Unpack valid bits ----------
        const valid = new Array(M);
        for (let i = 0; i < M; i++) {
            valid[i] = (buf[validStart + Math.floor(i / 8)] & (1 << (i % 8))) !== 0;
        }

        return Grid.LoadFromJson({ metadata, dx, dy, valid });
    }

    /**
     * Populate this grid with per-node shifts by calling an external transformation engine.
     *
     * This method appends values to `dx`, `dy`, and `valid` in row-major order, iterating
     * over all nodes \((rows+1) * (cols+1)\).
     *
     * @param {function({xn: number, yn: number}):{xt: number, yt: number}} transformNodeFunc - receives 
     * grid node coordinates in sourceCRS and must return grid node coordinates in targetCRS
     * @returns {void}
     */
    calculateGridShifts(transformNodeFunc) {
        const { rows, cols, size, x0, y0 } = this.metadata;

        for (let row = 0; row <= rows; row++) {
            for (let col = 0; col <= cols; col++) {
                const xn = x0 + col * size;
                const yn = y0 + row * size;

                let dx = 0, dy = 0;
                let valid = true;

                try {
                    const { xt, yt } = transformNodeFunc({ xn, yn });
                    dx = Math.round((xt - xn) * 10000) / 10000;
                    dy = Math.round((yt - yn) * 10000) / 10000;
                } catch (ex) {
                    valid = false;
                }

                this.dx.push(dx);
                this.dy.push(dy);
                this.valid.push(valid);
            }
        }
    }

    /**
     * Find the grid cell indices \((row, col)\) that contain a point.
     *
     * @param {{x:number, y:number}} point Point in source CRS.
     * @returns {{row:number, col:number}} Zero-based cell indices.
     */
    findGridCellForPoint(point) {
        const { x0, y0, size } = this.metadata;
        const { x, y } = point;

        const col = Math.floor((x - x0) / size);
        const row = Math.floor((y - y0) / size);

        return { row, col };
    }

    /**
     * Convert a flat node index into \((row, col)\) indices for the node arrays.
     *
     * Node arrays are stored row-major with `stride = cols + 1`.
     *
     * @param {number} index Flat node index in `[0, dx.length)`.
     * @returns {{row:number, col:number}} Node indices.
     */
    findGridCell(index) {
        const row = Math.floor(index / this.metadata.stride);
        const col = index % this.metadata.stride;

        return { row, col };
    }

    /**
     * Get the source CRS coordinates of a node at \((row, col)\).
     *
     * @param {number} row Node row index.
     * @param {number} col Node column index.
     * @returns {{x:number, y:number}} Node coordinates in source CRS.
     */
    findGridCellCoordinates(row, col) {
        const { x0, y0, size } = this.metadata;
        const x = x0 + col * size;
        const y = y0 + row * size;

        return { x, y };
    }

    /**
     * Transform a point using the grid by bilinear interpolation of the surrounding node shifts.
     *
     * @param {{x:number, y:number}} point Point in source CRS.
     * @returns {{x:number, y:number, row:number, col:number}} Transformed point (target CRS) plus the used cell indices.
     * @throws {Error} If the point is outside the grid extent.
     * @throws {Error} If any of the 4 surrounding nodes are invalid.
     * @throws {Error} If the computed cell has zero area (should not happen for well-formed grids).
     */
    extract(point) {
        const { x, y } = point;
        const { rows, cols, x0, y0, size } = this.metadata;
        const { row, col } = this.findGridCellForPoint(point);

        // bounds check (important near edges)
        if (col < 0 || row < 0 || col >= cols || row >= rows) {
            throw new Error(`Point outside grid extent (row=${row}, col=${col})`);
        }

        // shifts are stored as a flat array:
        // row-major: row * (cols + 1) + col
        const colsCount = cols + 1;
        // helper to get shift index
        const getNode = (r, c) => {
            const index = r * colsCount + c;
            return { dx: this.dx[index], dy: this.dy[index], valid: this.valid[index] };
        };

        // get 4 surrounding nodes
        const Q11 = getNode(row, col);
        const Q21 = getNode(row, col + 1);
        const Q12 = getNode(row + 1, col);
        const Q22 = getNode(row + 1, col + 1);

        const invalidNodes = [];
        if (!Q11.valid) invalidNodes.push('Q11');
        if (!Q21.valid) invalidNodes.push('Q21');
        if (!Q12.valid) invalidNodes.push('Q12');
        if (!Q22.valid) invalidNodes.push('Q22');

        if (invalidNodes.length > 0) {
            throw new Error(`Invalid node(s) detected: ${invalidNodes.join(', ')} (row=${row}, col=${col})`);
        }

        // compute cell bounds
        const x1 = x0 + col * size;
        const x2 = x1 + size;
        const y1 = y0 + row * size;
        const y2 = y1 + size;

        const denom = (x2 - x1) * (y2 - y1);

        if (denom === 0) {
            throw new Error(`Invalid grid cell - zero area (row=${row}, col=${col})`);
        }

        // bilinear interpolation for dx
        const dx =
            (Q11.dx * (x2 - x) * (y2 - y) +
                Q21.dx * (x - x1) * (y2 - y) +
                Q12.dx * (x2 - x) * (y - y1) +
                Q22.dx * (x - x1) * (y - y1)) / denom;

        // bilinear interpolation for dy
        const dy =
            (Q11.dy * (x2 - x) * (y2 - y) +
                Q21.dy * (x - x1) * (y2 - y) +
                Q12.dy * (x2 - x) * (y - y1) +
                Q22.dy * (x - x1) * (y - y1)) / denom;

        // apply shift
        return {
            x: x + dx,
            y: y + dy,
            row, col
        };
    }

    /**
     * Serialize the grid as plain JSON data.
     *
     * @returns {{metadata: object, dx: number[], dy: number[], valid: boolean[]}} Serializable representation.
     */
    toJson() {
        const { metadata, dx, dy, valid } = this;
        return { metadata, dx, dy, valid };
    }

    /**
     * Export all grid nodes as GeoJSON Point features.
     *
     * Each feature has `properties: { id, dx, dy, valid }` and `geometry.coordinates: [x, y]`.
     *
     * @returns {{type:'FeatureCollection', features:Array}} GeoJSON FeatureCollection.
     */
    toGeoJSON() {
        const features = [];

        for (let i = 0; i < this.dx.length; i++) {
            const dx = this.dx[i];
            const dy = this.dy[i];
            const valid = this.valid[i];
            const { row, col } = this.findGridCell(i);
            const { x, y } = this.findGridCellCoordinates(row, col);

            features.push({
                type: 'Feature',
                properties: { id: `${row}.${col}`, dx, dy, valid },
                geometry: {
                    type: 'Point',
                    coordinates: [x, y]
                }
            });
        }

        return {
            type: 'FeatureCollection',
            features
        };
    }

    /**
     * Serialize this `Grid` to a `Buffer` in BCSG binary format.
     * 
     * Binary layout:
     *   [0-3]       magic       char[4]   "BCSG"
     *   [4]         version     uint8     1
     *   [5]         flags       uint8     bit0=1 means float64 (always set)
     *   [6-7]       meta_len    uint16    byte length of the metadata JSON string
     *   [8 .. 8+meta_len-1]     utf8      metadata JSON (same object as before)
     *   [8+meta_len ..]         float64[] dx  array  — M = (rows+1)*(cols+1) values
     *   [.. + 8*M]              float64[] dy  array  — M values
     *   [.. + 8*M]              uint8[]   valid bits — ceil(M/8) bytes, LSB-first per byte
     *
     * @param {{ metadata: object, dx: number[], dy: number[], valid: boolean[] }} gridJson
     * @returns {Buffer}
     */
    toBinary() {
        // Metadata
        const metaJson = JSON.stringify(this.metadata);
        const metaBuf = Buffer.from(metaJson, 'utf8');
        if (metaBuf.length > 65535) {
            throw new Error(`Metadata JSON too large for uint16 length field: ${metaBuf.length} bytes`);
        }

        // ---------- Validate array lengths ----------
        const M = this.dx.length;
        if (this.dy.length !== M || this.valid.length !== M) {
            throw new Error(`Array length mismatch: dx=${M}, dy=${this.dy.length}, valid=${this.valid.length}`);
        }

        const expectedM = (this.metadata.rows + 1) * (this.metadata.cols + 1);
        if (M !== expectedM) {
            console.warn(`Warning: expected ${expectedM} nodes from metadata but got ${M}`);
        }

        // ---------- Bit-pack the valid flags ----------
        //   Each byte holds 8 flags, LSB = first flag in the group.
        const validByteCount = Math.ceil(M / 8);
        const validBuf = Buffer.alloc(validByteCount, 0);
        for (let i = 0; i < M; i++) {
            if (this.valid[i]) {
                validBuf[Math.floor(i / 8)] |= (1 << (i % 8));
            }
        }

        // ---------- Typed arrays for dx / dy ----------
        const dxBuf = Buffer.allocUnsafe(M * 8);
        const dyBuf = Buffer.allocUnsafe(M * 8);
        for (let i = 0; i < M; i++) {
            dxBuf.writeDoubleBE(this.dx[i], i * 8);
            dyBuf.writeDoubleBE(this.dy[i], i * 8);
        }

        // ---------- Assemble final buffer ----------
        //   Header: 4 (magic) + 1 (version) + 1 (flags) + 2 (meta_len) = 8 bytes
        const header = Buffer.alloc(8);
        MAGIC_BUF.copy(header, 0);
        header.writeUInt8(VERSION, 4);
        header.writeUInt8(FLAGS_FLOAT64, 5);
        header.writeUInt16BE(metaBuf.length, 6);

        return Buffer.concat([header, metaBuf, dxBuf, dyBuf, validBuf]);
    }
}