import { checkResult, DELTA_METERS, DELTA_DEGREES } from './test';
import { Transformations, ellipsoids, projections } from '../src/main';

describe(`Test Geographic and Gauss-Kruger coordinates dS = ${DELTA_METERS}cm, ${DELTA_DEGREES}deg`, () => {
  it('Geographic to Gauss-Kruger coordinates', () => {
    let tr = new Transformations();
    let input = [42.7602978166667, 25.3824052611111];
    let expected = [4736629.503, 8613154.6069];
    let result = tr.transformGeographicToGauss(input, projections.BGS_1930_24, ellipsoids.HAYFORD);
    checkResult(expected, result, DELTA_METERS);
  });

  it('Gauss-Kruger to Geographic coordinates', () => {
    let tr = new Transformations();
    let input = [4736629.503, 8613154.6069];
    let expected = [42.7602978166667, 25.3824052611111];
    let result = tr.transformGaussToGeographic(input, projections.BGS_1930_24, ellipsoids.HAYFORD);
    checkResult(expected, result, DELTA_DEGREES);
  });
});
