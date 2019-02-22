import { assert } from 'chai';

export const DELTA_BGS = 0.05;          // 5cm
export const DELTA_METERS = 0.01;       // 1cm
export const DELTA_DEGREES = 0.0000001; // 1cm

export function checkResult(expected, result, delta) {
  // console.log(Math.abs(expected[0] - result[0]));
  // console.log(Math.abs(expected[1] - result[1]));
  assert.closeTo(result[0], expected[0], delta);
}
