import assert from 'node:assert/strict';

export const DELTA_BGS = 0.1; // 10cm
export const DELTA_METERS = 0.01; // 1cm
export const DELTA_DEGREES = 0.0000001; // 1cm

export function closeTo(actual, expected, delta, message) {
  const diff = Math.abs(actual - expected);
  assert.ok(
    diff <= delta,
    message ?? `Expected ${actual} to be within ${delta} of ${expected} (diff=${diff})`
  );
}

export function checkResult(expected, result, delta) {
  // console.log(Math.abs(expected[0] - result[0]));
  // console.log(Math.abs(expected[1] - result[1]));
  const ds = Math.sqrt(Math.pow(result[0] - expected[0], 2) + Math.pow(result[1] - expected[1], 2));
  closeTo(ds, 0.0, delta);
}
