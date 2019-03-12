import { assert } from 'chai';
import { calculateExtent, buffer } from '../src/common/helpers';

describe(`Calculate extent`, () => {
  it('Should create empy extent', () => {
    let expected = [Infinity, Infinity, -Infinity, -Infinity];
    let result = calculateExtent();

    assert.isArray(result);
    assert.strictEqual(result[0], expected[0]);
    assert.strictEqual(result[1], expected[1]);
    assert.strictEqual(result[2], expected[2]);
    assert.strictEqual(result[3], expected[3]);
  });

  it('Should calculate bounding extent', () => {
    let input = [
      [4612778.004817882, 8444855.995714663],
      [4617531.798447665, 8452778.985097634],
      [4627039.385707232, 8469077.706114035],
      [4634509.63283975, 8465682.139235618],
      [4632472.292712699, 8486961.02500703],
      [4613683.489318793, 8482659.973627703],
      [4602138.561932175, 8464097.541359024]
    ];
    let expected = [4602138.561932175, 8444855.995714663, 4634509.63283975, 8486961.02500703];
    let result = calculateExtent(input);

    assert.isArray(result);
    assert.closeTo(result[0], expected[0], 0);
    assert.closeTo(result[1], expected[1], 0);
    assert.closeTo(result[2], expected[2], 0);
    assert.closeTo(result[3], expected[3], 0);
  });

  it('Should buffer extent', () => {
    let input = [
      [4612778.004817882, 8444855.995714663],
      [4617531.798447665, 8452778.985097634],
      [4627039.385707232, 8469077.706114035],
      [4634509.63283975, 8465682.139235618],
      [4632472.292712699, 8486961.02500703],
      [4613683.489318793, 8482659.973627703],
      [4602138.561932175, 8464097.541359024]
    ];
    let expected = [4582138.561932175, 8424855.995714663, 4654509.63283975, 8506961.02500703];
    let result = calculateExtent(input);

    // buffer with 20 km
    result = buffer(result, 20000);

    assert.isArray(result);
    assert.closeTo(result[0], expected[0], 0);
    assert.closeTo(result[1], expected[1], 0);
    assert.closeTo(result[2], expected[2], 0);
    assert.closeTo(result[3], expected[3], 0);
  });
});
