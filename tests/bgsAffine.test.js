import { checkResult, DELTA_BGS } from './test';
import { BGSCoordinates, projections } from '../src/main';

describe(`Test BGS Coordinates with Affine transformation dS = ${DELTA_BGS}m`, () => {
  const tr = new BGSCoordinates();

  it('BGS 1930 24 degrees', () => {
    let input = [4728966.163, 8607005.227];
    let expected = [4728401.432, 483893.508];
    let result = tr.transform(input, projections.BGS_1930_24, projections.BGS_2005_KK, false);
    checkResult(expected, result, DELTA_BGS);

    input = [4728401.432, 483893.508];
    expected = [4728966.163, 8607005.227];
    result = tr.transform(input, projections.BGS_2005_KK, projections.BGS_1930_24, false);
    checkResult(expected, result, DELTA_BGS);
  });

  it('BGS 1930 27 degrees', () => {
    let input = [4729531.133, 9361175.733];
    let expected = [4728401.432, 483893.508];
    let result = tr.transform(input, projections.BGS_1930_27, projections.BGS_2005_KK, false);
    checkResult(expected, result, DELTA_BGS);

    input = [4728401.432, 483893.508];
    expected = [4729531.133, 9361175.733];
    result = tr.transform(input, projections.BGS_2005_KK, projections.BGS_1930_27, false);
    checkResult(expected, result, DELTA_BGS);
  });

  it('BGS 1950 3 24 degrees', () => {
    let input = [4729331.175, 8606933.614];
    let expected = [4728401.432, 483893.508];
    let result = tr.transform(input, projections.BGS_1950_3_24, projections.BGS_2005_KK, false);
    checkResult(expected, result, DELTA_BGS);

    input = [4728401.432, 483893.508];
    expected = [4729331.175, 8606933.614];
    result = tr.transform(input, projections.BGS_2005_KK, projections.BGS_1950_3_24, false);
    checkResult(expected, result, DELTA_BGS);
  });

  it('BGS 1950 3 27 degrees', () => {
    let input = [4729899.053, 9361082.96];
    let expected = [4728401.432, 483893.508];
    let result = tr.transform(input, projections.BGS_1950_3_27, projections.BGS_2005_KK, false);
    checkResult(expected, result, DELTA_BGS);

    input = [4728401.432, 483893.508];
    expected = [4729899.053, 9361082.96];
    result = tr.transform(input, projections.BGS_2005_KK, projections.BGS_1950_3_27, false);
    checkResult(expected, result, DELTA_BGS);
  });

  it('BGS 1950 6 21 degrees', () => {
    let input = [4737501.141, 4852808.182];
    let expected = [4728401.432, 483893.508];
    let result = tr.transform(input, projections.BGS_1950_6_21, projections.BGS_2005_KK, false);
    checkResult(expected, result, DELTA_BGS);

    input = [4728401.432, 483893.508];
    expected = [4737501.141, 4852808.182];
    result = tr.transform(input, projections.BGS_2005_KK, projections.BGS_1950_6_21, false);
    checkResult(expected, result, DELTA_BGS);
  });

  it('BGS 1950 6 27 degrees', () => {
    let input = [4729899.053, 5361082.96];
    let expected = [4728401.432, 483893.508];
    let result = tr.transform(input, projections.BGS_1950_6_27, projections.BGS_2005_KK, false);
    checkResult(expected, result, DELTA_BGS);

    input = [4728401.432, 483893.508];
    expected = [4729899.053, 5361082.96];
    result = tr.transform(input, projections.BGS_2005_KK, projections.BGS_1950_6_27, false);
    checkResult(expected, result, DELTA_BGS);
  });

  it('BGS Sofia', () => {
    let input = [48276.705, 45420.988];
    let expected = [4730215.229, 322402.935];
    let result = tr.transform(input, projections.BGS_SOFIA, projections.BGS_2005_KK, false);
    checkResult(expected, result, DELTA_BGS);

    input = [4730215.229, 322402.935];
    expected = [48276.705, 45420.988];
    result = tr.transform(input, projections.BGS_2005_KK, projections.BGS_SOFIA, false);
    checkResult(expected, result, DELTA_BGS);
  });

  it('BGS 1970 K3', () => {
    let input = [4725270.684, 8515734.475];
    let expected = [4816275.68, 332535.401];
    let result = tr.transform(input, projections.BGS_1970_К3, projections.BGS_2005_KK, false);
    checkResult(expected, result, DELTA_BGS);

    input = [4816275.68, 332535.401];
    expected = [4725270.684, 8515734.475];
    result = tr.transform(input, projections.BGS_2005_KK, projections.BGS_1970_К3, false);
    checkResult(expected, result, DELTA_BGS);
  });

  it('BGS 1970 K5', () => {
    let input = [4613479.192, 9493233.633];
    let expected = [4679669.825, 569554.918];
    let result = tr.transform(input, projections.BGS_1970_К5, projections.BGS_2005_KK, false);
    checkResult(expected, result, DELTA_BGS);

    input = [4679669.825, 569554.918];
    expected = [4613479.192, 9493233.633];
    result = tr.transform(input, projections.BGS_2005_KK, projections.BGS_1970_К5, false);
    checkResult(expected, result, DELTA_BGS);
  });

  it('BGS 1970 K7', () => {
    let input = [4708089.898, 9570974.988];
    let expected = [4810276.431, 626498.611];
    let result = tr.transform(input, projections.BGS_1970_К7, projections.BGS_2005_KK, false);
    checkResult(expected, result, DELTA_BGS);

    input = [4810276.431, 626498.611];
    expected = [4708089.898, 9570974.988];
    result = tr.transform(input, projections.BGS_2005_KK, projections.BGS_1970_К7, false);
    checkResult(expected, result, DELTA_BGS);
  });

  it('BGS 1970 K9', () => {
    let input = [4547844.976, 8508858.179];
    let expected = [4675440.847, 330568.434];
    let result = tr.transform(input, projections.BGS_1970_К9, projections.BGS_2005_KK, false);
    checkResult(expected, result, DELTA_BGS);

    input = [4675440.847, 330568.434];
    expected = [4547844.976, 8508858.179];
    result = tr.transform(input, projections.BGS_2005_KK, projections.BGS_1970_К9, false);
    checkResult(expected, result, DELTA_BGS);
  });
});
