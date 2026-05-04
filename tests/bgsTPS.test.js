import { checkResult, DELTA_BGS } from './test';
import { BGSCoordinates, ellipsoids, projections, transformGaussToGeographic, transformGeographicToGauss, transformGeographicToUTM, transformLambertToGeographic } from '../src/main';

describe(`Test BGS Coordinates with TPS transformation dS = ${DELTA_BGS}m`, () => {
  it('Main test', () => {
    const tr = new BGSCoordinates();
    // BGS_1950 lat, lon
    const input = [42.75935, 25.38142];
    console.log('BGS_1950:', input);

    console.log('----------------------------------------------');

    const bgs1950324 = transformGeographicToGauss(input, projections.BGS_1950_3_24, ellipsoids.KRASSOVSKY);
    console.log('BGS_1950_3_24:', bgs1950324);
    const bgs1950327 = transformGeographicToGauss(input, projections.BGS_1950_3_27, ellipsoids.KRASSOVSKY);
    console.log('BGS_1950_3_27:', bgs1950327);
    const bgs1950621 = transformGeographicToGauss(input, projections.BGS_1950_6_21, ellipsoids.KRASSOVSKY);
    console.log('BGS_1950_6_21:', bgs1950621);
    const bgs1950627 = transformGeographicToGauss(input, projections.BGS_1950_6_27, ellipsoids.KRASSOVSKY);
    console.log('BGS_1950_6_27:', bgs1950627);

    console.log('----------------------------------------------');

    const bgs30result = tr.transform(bgs1950627, projections.BGS_1950_6_27, projections.BGS_1930_24, 'TPS', 20000);
    console.log('BGS_1930_24:', bgs30result);
    const bgs30 = transformGaussToGeographic(bgs30result, projections.BGS_1930_24, ellipsoids.HAYFORD);
    console.log('BGS_1930:', bgs30);
    const bgs30_27 = transformGeographicToGauss(bgs30, projections.BGS_1930_27, ellipsoids.HAYFORD);
    console.log('BGS_1930_27:', bgs30_27);

    console.log('----------------------------------------------');

    const bgs2005cc = tr.transform(bgs1950621, projections.BGS_1950_6_21, projections.BGS_2005_KK, 'TPS', 20000);
    console.log('BGS_2005_KK:', bgs2005cc);
    const bgs2005 = transformLambertToGeographic(bgs2005cc, projections.BGS_2005_KK, ellipsoids.GRS80);
    console.log('BGS_2005:', bgs2005);
    const bgs200521 = transformGeographicToUTM(bgs2005, projections.UTM34N, ellipsoids.GRS80);
    console.log('BGS_2005_21:', bgs200521);
    const bgs200527 = transformGeographicToUTM(bgs2005, projections.UTM35N, ellipsoids.GRS80);
    console.log('BGS_2005_27:', bgs200527);

    console.log('----------------------------------------------');

    const bgs1970k3 = tr.transform(bgs2005cc, projections.BGS_2005_KK, projections.BGS_1970_K3, 'TPS', 20000);
    console.log('BGS_1970_K3:', bgs1970k3);
    const bgs1970k5 = tr.transform(bgs2005cc, projections.BGS_2005_KK, projections.BGS_1970_K5, 'TPS', 20000);
    console.log('BGS_1970_K5:', bgs1970k5);
    const bgs1970k7 = tr.transform(bgs2005cc, projections.BGS_2005_KK, projections.BGS_1970_K7, 'TPS', 20000);
    console.log('BGS_1970_K7:', bgs1970k7);
    const bgs1970k9 = tr.transform(bgs2005cc, projections.BGS_2005_KK, projections.BGS_1970_K9, 'TPS', 20000);
    console.log('BGS_1970_K9:', bgs1970k9);
  });

  it('BGS 1930 24 degrees', () => {
    let tr = new BGSCoordinates();
    let input = [4703322.237223, 8675460.983256];
    let expected = [4700828.2487, 552055.0721];
    let result = tr.transform(input, projections.BGS_1930_24, projections.BGS_2005_KK, 'TPS', 20000);
    console.log('BGS_1930_24 to BGS_2005_KK:', result);
    checkResult(expected, result, DELTA_BGS);

    input = [4700828.2487, 552055.0721];
    expected = [4703322.237223, 8675460.983256];
    result = tr.transform(input, projections.BGS_2005_KK, projections.BGS_1930_24, 'TPS', 20000);
    console.log('BGS_2005_KK to BGS_1930_24:', result);
    checkResult(expected, result, DELTA_BGS);
    
    input = [4728966.163, 8607005.227];
    expected = [4728401.432, 483893.508];
    result = tr.transform(input, projections.BGS_1930_24, projections.BGS_2005_KK, 'TPS', 10000);
    console.log('BGS_1930_24 to BGS_2005_KK:', result);
    checkResult(expected, result, DELTA_BGS);

    // input = [4728401.432, 483893.508];
    // expected = [4728966.163, 8607005.227];
    // result = tr.transform(input, projections.BGS_2005_KK, projections.BGS_1930_24, 'TPS', 20000);
    // checkResult(expected, result, DELTA_BGS);
  });

  it('BGS 1930 27 degrees', () => {
    let tr = new BGSCoordinates();
    let input = [4729531.133, 9361175.733];
    let expected = [4728401.432, 483893.508];
    let result = tr.transform(input, projections.BGS_1930_27, projections.BGS_2005_KK, 'TPS', 20000);
    checkResult(expected, result, DELTA_BGS);

    input = [4728401.432, 483893.508];
    expected = [4729531.133, 9361175.733];
    result = tr.transform(input, projections.BGS_2005_KK, projections.BGS_1930_27, 'TPS', 20000);
    checkResult(expected, result, DELTA_BGS);
  });

  it('BGS 1950 3 24 degrees', () => {
    let tr = new BGSCoordinates();
    let input = [4729331.175, 8606933.614];
    let expected = [4728401.432, 483893.508];
    let result = tr.transform(input, projections.BGS_1950_3_24, projections.BGS_2005_KK, 'TPS', 20000);
    checkResult(expected, result, DELTA_BGS);
    tr.tra;
    input = [4728401.432, 483893.508];
    expected = [4729331.175, 8606933.614];
    result = tr.transform(input, projections.BGS_2005_KK, projections.BGS_1950_3_24, 'TPS', 20000);
    checkResult(expected, result, DELTA_BGS);
  });

  it('BGS 1950 3 27 degrees', () => {
    let tr = new BGSCoordinates();
    let input = [4729899.053, 9361082.96];
    let expected = [4728401.432, 483893.508];
    let result = tr.transform(input, projections.BGS_1950_3_27, projections.BGS_2005_KK, 'TPS', 20000);
    checkResult(expected, result, DELTA_BGS);

    input = [4728401.432, 483893.508];
    expected = [4729899.053, 9361082.96];
    result = tr.transform(input, projections.BGS_2005_KK, projections.BGS_1950_3_27, 'TPS', 20000);
    checkResult(expected, result, DELTA_BGS);
  });

  it('BGS 1950 6 21 degrees', () => {
    let tr = new BGSCoordinates();
    let input = [4737501.141, 4852808.182];
    let expected = [4728401.432, 483893.508];
    let result = tr.transform(input, projections.BGS_1950_6_21, projections.BGS_2005_KK, 'TPS', 20000);
    checkResult(expected, result, DELTA_BGS);

    input = [4728401.432, 483893.508];
    expected = [4737501.141, 4852808.182];
    result = tr.transform(input, projections.BGS_2005_KK, projections.BGS_1950_6_21, 'TPS', 20000);
    checkResult(expected, result, DELTA_BGS);
  });

  it('BGS 1950 6 27 degrees', () => {
    let tr = new BGSCoordinates();
    let input = [4729899.053, 5361082.96];
    let expected = [4728401.432, 483893.508];
    let result = tr.transform(input, projections.BGS_1950_6_27, projections.BGS_2005_KK, 'TPS', 20000);
    checkResult(expected, result, DELTA_BGS);

    input = [4728401.432, 483893.508];
    expected = [4729899.053, 5361082.96];
    result = tr.transform(input, projections.BGS_2005_KK, projections.BGS_1950_6_27, 'TPS', 20000);
    checkResult(expected, result, DELTA_BGS);
  });

  it('BGS Sofia', () => {
    let tr = new BGSCoordinates();
    let input = [48276.705, 45420.988];
    let expected = [4730215.229, 322402.935];
    let result = tr.transform(input, projections.BGS_SOFIA, projections.BGS_2005_KK, 'TPS', 20000);
    checkResult(expected, result, DELTA_BGS);

    input = [4730215.229, 322402.935];
    expected = [48276.705, 45420.988];
    result = tr.transform(input, projections.BGS_2005_KK, projections.BGS_SOFIA, 'TPS', 20000);
    checkResult(expected, result, DELTA_BGS);
  });

  it('BGS 1970 K3', () => {
    let tr = new BGSCoordinates();
    let input = [4725270.684, 8515734.475];
    let expected = [4816275.68, 332535.401];
    let result = tr.transform(input, projections.BGS_1970_K3, projections.BGS_2005_KK, 'TPS', 20000);
    checkResult(expected, result, DELTA_BGS);

    input = [4816275.68, 332535.401];
    expected = [4725270.684, 8515734.475];
    result = tr.transform(input, projections.BGS_2005_KK, projections.BGS_1970_K3, 'TPS', 20000);
    checkResult(expected, result, DELTA_BGS);
  });

  it('BGS 1970 K5', () => {
    let tr = new BGSCoordinates();
    let input = [4613479.192, 9493233.633];
    let expected = [4679669.825, 569554.918];
    let result = tr.transform(input, projections.BGS_1970_K5, projections.BGS_2005_KK, 'TPS', 20000);
    checkResult(expected, result, DELTA_BGS);

    input = [4679669.825, 569554.918];
    expected = [4613479.192, 9493233.633];
    result = tr.transform(input, projections.BGS_2005_KK, projections.BGS_1970_K5, 'TPS', 20000);
    checkResult(expected, result, DELTA_BGS);
  });

  it('BGS 1970 K7', () => {
    let tr = new BGSCoordinates();
    let input = [4708089.898, 9570974.988];
    let expected = [4810276.431, 626498.611];
    let result = tr.transform(input, projections.BGS_1970_K7, projections.BGS_2005_KK, 'TPS', 20000);
    checkResult(expected, result, DELTA_BGS);

    input = [4810276.431, 626498.611];
    expected = [4708089.898, 9570974.988];
    result = tr.transform(input, projections.BGS_2005_KK, projections.BGS_1970_K7, 'TPS', 20000);
    checkResult(expected, result, DELTA_BGS);
  });

  it('BGS 1970 K9', () => {
    let tr = new BGSCoordinates();
    let input = [4547844.976, 8508858.179];
    let expected = [4675440.847, 330568.434];
    let result = tr.transform(input, projections.BGS_1970_K9, projections.BGS_2005_KK, 'TPS', 20000);
    checkResult(expected, result, DELTA_BGS);

    input = [4675440.847, 330568.434];
    expected = [4547844.976, 8508858.179];
    result = tr.transform(input, projections.BGS_2005_KK, projections.BGS_1970_K9, 'TPS', 20000);
    checkResult(expected, result, DELTA_BGS);
  });
});
