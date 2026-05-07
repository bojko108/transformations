import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { convertDecimalDegreesToDMS, convertDMStoDecimalDegrees } from '../src/main.js';

describe('Test Coordinate formatters', () => {
  it('Decimal degrees to degrees, minutes and seconds', () => {
    let input = 42.336542;
    let expected = '422011.5512';
    let result = convertDecimalDegreesToDMS(input);

    assert.notEqual(result, null);
    assert.strictEqual(result, expected);
  });

  it('Degrees, minutes and seconds to decimal degrees', () => {
    let input = '422011.5512';
    let expected = 42.336542;
    let result = convertDMStoDecimalDegrees(input);

    assert.notEqual(result, null);
    assert.strictEqual(result, expected);
  });
});
