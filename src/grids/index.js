import fs from 'node:fs';
import Grid from "./Grid.js";

// load grids into variables once 
const GRID_DEFINITIONS = {};

/**
 * Generates a unique key for the source and target CRS combination.
 * @param {string} source 
 * @param {string} target 
 * @returns {string} A unique key in the format "source_to_target".
 */
const generateKey = (source, target) => `${source}_to_${target}`;

const getOrLoadGrid = (sourceCRS, targetCRS) => {
    const key = generateKey(sourceCRS, targetCRS);
    if (!GRID_DEFINITIONS[key]) {
        // Dynamically import the grid and store it in the GRID_DEFINITIONS object
        const raw = fs.readFileSync(`./src/grids/${key}.bcsg`);
        GRID_DEFINITIONS[key] = Grid.LoadFromBinary(raw);
    }
    return GRID_DEFINITIONS[key];
}

export { Grid, getOrLoadGrid };