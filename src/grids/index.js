import Grid from "./Grid.js";

import BGS_SOFIA_to_BGS_2005_KK from './BGS_SOFIA_to_BGS_2005_KK.json' with { type: 'json' };
import BGS_1930_24_to_BGS_2005_KK from './BGS_1930_24_to_BGS_2005_KK.json' with { type: 'json' };
import BGS_1930_27_to_BGS_2005_KK from './BGS_1930_27_to_BGS_2005_KK.json' with { type: 'json' };
import BGS_1950_3_24_to_BGS_2005_KK from './BGS_1950_3_24_to_BGS_2005_KK.json' with { type: 'json' };
import BGS_1950_3_27_to_BGS_2005_KK from './BGS_1950_3_27_to_BGS_2005_KK.json' with { type: 'json' };
import BGS_1950_6_21_to_BGS_2005_KK from './BGS_1950_6_21_to_BGS_2005_KK.json' with { type: 'json' };
import BGS_1950_6_27_to_BGS_2005_KK from './BGS_1950_6_27_to_BGS_2005_KK.json' with { type: 'json' };
import BGS_1970_K3_to_BGS_2005_KK from './BGS_1970_K3_to_BGS_2005_KK.json' with { type: 'json' };
import BGS_1970_K5_to_BGS_2005_KK from './BGS_1970_K5_to_BGS_2005_KK.json' with { type: 'json' };
import BGS_1970_K7_to_BGS_2005_KK from './BGS_1970_K7_to_BGS_2005_KK.json' with { type: 'json' };
import BGS_1970_K9_to_BGS_2005_KK from './BGS_1970_K9_to_BGS_2005_KK.json' with { type: 'json' };
import BGS_2005_KK_to_BGS_SOFIA from './BGS_2005_KK_to_BGS_SOFIA.json' with { type: 'json' };
import BGS_2005_KK_to_BGS_1930_24 from './BGS_2005_KK_to_BGS_1930_24.json' with { type: 'json' };
import BGS_2005_KK_to_BGS_1930_27 from './BGS_2005_KK_to_BGS_1930_27.json' with { type: 'json' };
import BGS_2005_KK_to_BGS_1950_3_24 from './BGS_2005_KK_to_BGS_1950_3_24.json' with { type: 'json' };
import BGS_2005_KK_to_BGS_1950_3_27 from './BGS_2005_KK_to_BGS_1950_3_27.json' with { type: 'json' };
import BGS_2005_KK_to_BGS_1950_6_21 from './BGS_2005_KK_to_BGS_1950_6_21.json' with { type: 'json' };
import BGS_2005_KK_to_BGS_1950_6_27 from './BGS_2005_KK_to_BGS_1950_6_27.json' with { type: 'json' };
import BGS_2005_KK_to_BGS_1970_K3 from './BGS_2005_KK_to_BGS_1970_K3.json' with { type: 'json' };
import BGS_2005_KK_to_BGS_1970_K5 from './BGS_2005_KK_to_BGS_1970_K5.json' with { type: 'json' };
import BGS_2005_KK_to_BGS_1970_K7 from './BGS_2005_KK_to_BGS_1970_K7.json' with { type: 'json' };
import BGS_2005_KK_to_BGS_1970_K9 from './BGS_2005_KK_to_BGS_1970_K9.json' with { type: 'json' };

// load control points into variables
const GRID_DEFINITIONS = {
    BGS_SOFIA_to_BGS_2005_KK,
    BGS_1930_24_to_BGS_2005_KK,
    BGS_1930_27_to_BGS_2005_KK,
    BGS_1950_3_24_to_BGS_2005_KK,
    BGS_1950_3_27_to_BGS_2005_KK,
    BGS_1950_6_21_to_BGS_2005_KK,
    BGS_1950_6_27_to_BGS_2005_KK,
    BGS_1970_K3_to_BGS_2005_KK,
    BGS_1970_K5_to_BGS_2005_KK,
    BGS_1970_K7_to_BGS_2005_KK,
    BGS_1970_K9_to_BGS_2005_KK,
    BGS_2005_KK_to_BGS_SOFIA,
    BGS_2005_KK_to_BGS_1930_24,
    BGS_2005_KK_to_BGS_1930_27,
    BGS_2005_KK_to_BGS_1950_3_24,
    BGS_2005_KK_to_BGS_1950_3_27,
    BGS_2005_KK_to_BGS_1950_6_21,
    BGS_2005_KK_to_BGS_1950_6_27,
    BGS_2005_KK_to_BGS_1970_K3,
    BGS_2005_KK_to_BGS_1970_K5,
    BGS_2005_KK_to_BGS_1970_K7,
    BGS_2005_KK_to_BGS_1970_K9
};

export const loadGrid = (sourceCRS, targetCRS) => {
    const key = `${sourceCRS}_to_${targetCRS}`;
    const gridData = GRID_DEFINITIONS[key];
    if (gridData) {
        return Grid.LoadFromFile(gridData);
    } else {
        //throw new Error(`Grid transformation from ${sourceCRS} to ${targetCRS} not found.`);
    }
}

export { Grid };