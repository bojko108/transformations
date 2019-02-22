import { checkResult, DELTA_METERS, DELTA_DEGREES } from './test';
import { Transformations, ellipsoids, projections } from '../src/main';

describe(`Test Geographic and Geocentric coordinates dS = ${DELTA_METERS}cm, ${DELTA_DEGREES}deg`, () => {
  it('Geographic to Geocentric coordinates', () => {
    let tr = new Transformations();
    let input = [42.450682, 24.749747];
    let expected = [4280410.654, 1973273.422, 4282674.061];
    let result = tr.transformGeographicToGeocentric(input);
    checkResult(expected, result, DELTA_METERS);
  });

  it('Geocentric to Geographic coordinates', () => {
    let tr = new Transformations();
    let input = [4280410.654, 1973273.422, 4282674.061];
    let expected = [42.450682, 24.749747];
    let result = tr.transformGeocentricToGeographic(input);
    checkResult(expected, result, DELTA_DEGREES);
  });
});
