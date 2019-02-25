import { checkResult, DELTA_METERS, DELTA_DEGREES } from './test';
import { transformGeographicToUTM, transformUTMToGeographic } from '../src/main';

describe(`Test Geographic and UTM coordinates dS = ${DELTA_METERS}m, ${DELTA_DEGREES}deg`, () => {
  it('Geographic to UTM coordinates', () => {
    let input = [42.450682, 24.749747];
    let expected = [4702270.179, 314955.869];
    let result = transformGeographicToUTM(input);
    checkResult(expected, result, DELTA_METERS);
  });

  it('UTM to Geographic coordinates', () => {
    let input = [4702270.179, 314955.869];
    let expected = [42.450682, 24.749747];
    let result = transformUTMToGeographic(input);
    checkResult(expected, result, DELTA_DEGREES);
  });
});
