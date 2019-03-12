# Transformations

Transform coordinates between various coordinate systems used in Bulgaria.

## Contents

- [Info](#info)
- [Install](#install)
- [Ellipsoids](#ellipsoids)
- [Projections](#projections)
- [Examples](#examples)
  - [Transform between geographic coordinates and projected in Lambert projection](#transform-between-geographic-coordinates-and-projected-in-lambert-projection)
  - [Transform between geographic coordinates and projected in UTM](#transform-between-geographic-coordinates-and-projected-in-utm)
  - [Transform between geographic coordinates and projected in Gauss–Krüger](#transform-between-geographic-coordinates-and-projected-in-gauss-krüger)
  - [Transform between geographic coordinates and projected in Web Mercator](#transform-between-geographic-coordinates-and-projected-in-web-mercator)
  - [Transform between geographic and geocentric coordinates](#transform-between-geographic-and-geocentric-coordinates)
  - [Transform between BGS coordinates](#transform-between-bgs-coordinates)
    - [Transform points in extent](#transform-points-in-extent)
  - [Format decimal degrees from/to degrees, minutes and seconds](#format-decimal-degrees-from/to-degrees,-minutes-and-seconds)
- [Dependencies](#dependencies)
- [Tests](#tests)
- [License](#license)

## Info

This project is based on [Transformations.NET](https://github.com/bojko108/Transformations.NET) library.

The project can be used for transforming coordinates between various coordinate systems:

- BGS 1930
- BGS 1950
- BGS Sofia
- BGS 1970 (there can be no control points near by if the point is close to the zone's border)
- BGS 2005

Following projections are available:

- Lambert Conformal Conic with 2SP
- Universal Transverse Mercator
- Gauss–Krüger
- Spherical Web Mercator

You can transform between:

- Geographic coordinates
- Projected coordinates
- Geocentric coordinates

Transformations between BGS coordinate systems are done by calculating transformation parameters using TPS or Affine transformation based on predefined control points ([ControlPoints namespace](https://github.com/bojko108/transformations/tree/master/src/controlPoints)). You can control what type of transformation is used by passing `useTPS` boolean parameter to `BGSCoordinates.transform()`. All other transformations are done directly as the transformation parameters are known. Precision is arround `10cm`.

## Install

You can install it with NPM (`npm install transformations`) or Yarn (`yarn add transformations`) and then import a desired transformation function:

```js
import { transformGeographicToUTM } from 'transformations';

const input = [42.450682, 24.749747];
const result = transformGeographicToUTM(input);
```

### Ellipsoids

```js
import { ellipsoids } from 'transformations';
```

- GRS80 - GRS 1980
- BESSEL_1841 - Bessel 1841
- CLARKE_1866 - Clarke 1866
- EVEREST - Everest (Sabah and Sarawak)
- HELMERT - Helmert 1906
- HAYFORD - Hayford
- KRASSOVSKY - Krassovsky, 1942
- WALBECK - Walbeck
- WGS72 - WGS 1972
- WGS84 - WGS 1984
- SPHERE - Normal Sphere (R=6378137)

### Projections

```js
import { projections } from 'transformations';
```

- BGS_SOFIA - BGS Sofia. Local projection based on BGS 1950
- BGS_1930_24 - Gauss–Krüger projection based on Hayford ellipsoid
- BGS_1930_27 - Gauss–Krüger projection based on Hayford ellipsoid
- BGS_1950_3_24 - Gauss–Krüger projection based on Krassovsky ellipsoid
- BGS_1950_3_27 - Gauss–Krüger projection based on Krassovsky ellipsoid
- BGS_1950_6_21 - Gauss–Krüger projection based on Krassovsky ellipsoid
- BGS_1950_6_27 - Gauss–Krüger projection based on Krassovsky ellipsoid
- BGS_1970_K3 - ~ Northewest Bulgaria
- BGS_1970_K5 - ~ Southeast Bulgaria
- BGS_1970_K7 - ~ Northeast Bulgaria
- BGS_1970_K9 - ~ Southwest Bulgaria
- BGS_2005_KK - Lambert Conformal Conic with 2SP used by Cadastral Agency
- UTM34N - Universal Transverse Mercator zone 34 North
- UTM35N - Universal Transverse Mercator zone 35 North

## Examples

### Transform between geographic coordinates and projected in Lambert projection

```js
import { transformGeographicToLambert, transformLambertToGeographic } from 'transformations';

let input = [42.7589996, 25.3799991];
let result = transformGeographicToLambert(input);
// result is: 4735953.342, 490177.508

let input = [4735953.349, 490177.508;
let result = transformLambertToGeographic(input);
// result is: 42.7589997, 25.3799991
```

### Transform between geographic coordinates and projected in UTM

```js
import { transformGeographicToUTM, transformUTMToGeographic } from 'transformations';

let input = [42.450682, 24.749747];
let result = transformGeographicToUTM(input);
// result is: 4702270.178, 314955.869

let input = [4702270.179, 314955.869];
let result = transformUTMToGeographic(input);
// result is: 42.450682, 24.749747
```

### Transform between geographic coordinates and projected in Gauss–Krüger

```js
import { transformGeographicToGauss, transformGaussToGeographic } from 'transformations';

let input = [42.7602978166667, 25.3824052611111];
let result = transformGeographicToGauss(input);
// result is: 4736629.503, 8613154.606

let input = [4736629.503, 8613154.607);
let result = transformGaussToGeographic(input);
// result is: 42.7602978, 25.38240528
```

### Transform between geographic coordinates and projected in Web Mercator

```js
import { transformGeographicToWebMercator, transformWebMercatorToGeographic } from 'transformations';

let input = [42.450682, 24.749747];
let result = transformGeographicToWebMercator(input);
// result is: 2755129.233, 5228730.328

let input = [2755129.23, 5228730.33];
let result = transformWebMercatorToGeographic(input);
// result is: 42.4506820, 24.7497470
```

### Transform between geographic and geocentric coordinates

```js
import { transformGeographicToGeocentric, transformGeocentricToGeographic } from 'transformations';

let input = [42.450682, 24.749747];
let result = transformGeographicToGeocentric(input);
// result is: X: 4280410.654, 1973273.422, 4282674.061

let input = [4280410.654, 1973273.422, 4282674.061];
let result = transformGeocentricToGeographic(input);
// result is: 42.450682, 24.749747
```

### Transform between BGS coordinates

- BGS 1930

```js
import { BGSCoordinates } from 'transformations';

const bgs = new BGSCoordinates();

let input = [4728966.163, 8607005.227];
let result = bgs.transform(input, projections.BGS_1930_24, projections.BGS_2005_KK);
// result is: 4728401.432, 483893.508

let input = [4728401.432, 483893.508];
let result = bgs.transform(input, projections.BGS_2005_KK, projections.BGS_1930_24);
// result is: 4728966.153, 8607005.214
```

- BGS 1950

```js
import { BGSCoordinates } from 'transformations';

const bgs = new BGSCoordinates();

let input = [4729331.175, 8606933.614];
let result = bgs.transform(input, projections.BGS_1950_3_24, projections.BGS_2005_KK);
// result is: 4728401.442, 483893.521

let input = [4728401.432, 483893.508];
let result = tr.transform(input, projections.BGS_2005_KK, projections.BGS_1950_3_24);
// result is: 4729331.165, 8606933.601
```

- BGS Sofia

```js
import { BGSCoordinates } from 'transformations';

const bgs = new BGSCoordinates();

let input = [48276.705, 45420.988];
let result = bgs.transform(input, projections.BGS_SOFIA, projections.BGS_2005_KK);
// result is: 4730215.221, 322402.929

let input = [4730215.229, 322402.935];
let result = bgs.transform(input, projections.BGS_2005_KK, projections.BGS_SOFIA);
// result is: 48276.713, 45420.993
```

- BGS 1970

```js
import { BGSCoordinates } from 'transformations';

const bgs = new BGSCoordinates();

let input = [4725270.684, 8515734.475];
let result = bgs.transform(input, projections.BGS_1970_K3, projections.BGS_2005_KK);
// result is: 4816275.688, 332535.346

let input = [4816275.68, 332535.401];
let result = bgs.transform(input, projections.BGS_2005_KK, projections.BGS_1970_K3);
// result is: 4725270.677, 8515734.530

let input = [4613479.192, 9493233.633];
let result = bgs.transform(input, projections.BGS_1970_K5, projections.BGS_2005_KK);
// result is: 4679669.824, 569554.912

let input = [4679669.825, 569554.918];
let result = bgs.transform(input, projections.BGS_2005_KK, projections.BGS_1970_K5);
// result is: 4613479.193, 9493233.639

let input = [4708089.898, 9570974.988];
let result = bgs.transform(input, projections.BGS_1970_K7, projections.BGS_2005_KK);
// result is: 4810276.410, 626498.618

let input = [4810276.431, 626498.611];
let result = bgs.transform(input, projections.BGS_2005_KK, projections.BGS_1970_K7);
// result is: 4708089.919, 9570974.981

let input = [4547844.976, 8508858.179];
let result = bgs.transform(input, projections.BGS_1970_K9, projections.BGS_2005_KK);
// result is: 4675440.859, 330568.410

let input = [4675440.847, 330568.434];
let result = bgs.transform(input, projections.BGS_2005_KK, projections.BGS_1970_K9);
// result is: 4547844.965, 8508858.203
```

#### Transform points in extent

Use this method to calculate transformation parameters once and apply them to all input points. 

You can either pass an extent, for which the transformation parameters will be calculated:
```js
let extent = [4515891.16322039, 8471284.82458501, 4565579.62520789, 8551929.53794741];
let result = bgs.transformArray([...], projections.BGS_1970_K9, projections.BGS_2005_KK, true, extent);
```

or just pass the points and use the bounding extent:
```js
let result = bgs.transformArray([...], projections.BGS_1970_K9, projections.BGS_2005_KK, true);
```

***Use TPS transformation as it gives better accuracy.**

### Format decimal degrees from/to degrees, minutes and seconds

```js
import { convertDecimalDegreesToDMS, convertDMStoDecimalDegrees } from 'transformations';

let latitude = 42.336542;
let dms = convertDecimalDegreesToDMS(latitude);
// dms is: "422011.5512000000052"

let dms = '422011.5512000000052';
let result = convertDMStoDecimalDegrees(dms);
// result is: 42.336542
```

## Dependencies

- [KDBush](https://www.npmjs.com/package/kdbush)
- [transformation-models](https://www.npmjs.com/package/transformation-models)

## Tests

Check [tests](https://github.com/bojko108/transformations/tree/master/tests) for more examples.

## License

transformations is [MIT](https://github.com/bojko108/transformations/tree/master/LICENSE) License @ bojko108
