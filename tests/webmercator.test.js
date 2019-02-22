import { checkResult, DELTA_METERS, DELTA_DEGREES } from './test';
import { Transformations, ellipsoids, projections } from '../src/main';

describe(`Test Geographic and Web Mercator coordinates dS = ${DELTA_METERS}cm, ${DELTA_DEGREES}deg`, () => {
  it('Geographic to Web Mercator coordinates', () => {
    let tr = new Transformations();
    let input = [42.450682, 24.749747];
    let expected = [2755129.23, 5228730.33];
    let result = tr.transformGeographicToWebMercator(input);
    checkResult(expected, result, DELTA_METERS);
  });

  it('Web Mercator to Geographic coordinates', () => {
    let tr = new Transformations();
    let input = [2755129.23, 5228730.33];
    let expected = [42.450682, 24.749747];
    let result = tr.transformWebMercatorToGeographic(input);
    checkResult(expected, result, DELTA_DEGREES);
  });
});
