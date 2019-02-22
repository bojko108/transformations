import { checkResult, DELTA_METERS, DELTA_DEGREES } from './test';
import { Transformations, ellipsoids, projections } from '../src/main';

describe(`Test Geographic and UTM coordinates dS = ${DELTA_METERS}cm, ${DELTA_DEGREES}deg`, () => {
  it('Geographic to UTM coordinates', () => {
    let tr = new Transformations();
    let input = [42.450682, 24.749747];
    let expected = [4702270.179, 314955.869];
    let result = tr.transformGeographicToUTM(input);
    checkResult(expected, result, DELTA_METERS);
  });

  it('UTM to Geographic coordinates', () => {
    let tr = new Transformations();
    let input = [4702270.179, 314955.869];
    let expected = [42.450682, 24.749747];
    let result = tr.transformUTMToGeographic(input);
    checkResult(expected, result, DELTA_DEGREES);
  });
});
