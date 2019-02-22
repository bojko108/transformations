import { assert } from 'chai';
import { Transformations } from '../src/main';

describe('Test Coordinate formatters', () => {
  it('Decimal degrees to degrees, minutes and seconds', () => {
    let tr = new Transformations();
    let input = 42.336542;
    let expected = '422011.5512';
    let result = tr.ConvertDecimalDegreesToDMS(input);

    assert.isNotNull(result);
    assert.strictEqual(result, expected);
  });

  it('Degrees, minutes and seconds to decimal degrees', () => {
    let tr = new Transformations();
    let input = '422011.5512';
    let expected = 42.336542;
    let result = tr.ConvertDMStoDecimalDegrees(input);

    assert.isNotNull(result);
    assert.strictEqual(result, expected);
  });
});
