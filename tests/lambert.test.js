import { checkResult, DELTA_METERS, DELTA_DEGREES } from './test';
import { Transformations, ellipsoids, projections } from '../src/main';

describe(`Test Geographic and Lambert coordinates dS = ${DELTA_METERS}cm, ${DELTA_DEGREES}deg`, () => {
  it('Geographic to Lambert coordinates', () => {
    let tr = new Transformations();
    let input = [42.7589996, 25.3799991];
    let expected = [4735953.349, 490177.508];
    let result = tr.transformGeographicToLambert(input, projections.BGS_2005_KK, ellipsoids.WGS84);
    checkResult(expected, result, DELTA_METERS);
  });

  it('Lambert to Geographic coordinates', () => {
    let tr = new Transformations();
    let input = [4735953.349, 490177.508];
    let expected = [42.7589996, 25.3799991];
    let result = tr.transformLambertToGeographic(input, projections.BGS_2005_KK, ellipsoids.WGS84);
    checkResult(expected, result, DELTA_DEGREES);
  });
});
