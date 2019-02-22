﻿import ControlPointsClass from './ControlPointsClass';

export default class BGS1970K9 extends ControlPointsClass {
  constructor() {
    super();

    this.initPoints();
    this.initTree();
  }

  initPoints() {
    this._points = [
      { id: 70109, x: 4532969.635, y: 8508033.895 },
      { id: 52582, x: 4572180.505, y: 8651129.045 },
      { id: 63924, x: 4618663.067, y: 8526827.976 },
      { id: 52583, x: 4571797.112, y: 8645117.265 },
      { id: 71142, x: 4491344.693, y: 8522823.536 },
      { id: 71143, x: 4489220.987, y: 8515223.898 },
      { id: 52586, x: 4567810.83, y: 8640710.486 },
      { id: 72175, x: 4502802.923, y: 8468674.065 },
      { id: 70114, x: 4526264.117, y: 8503108.351 },
      { id: 52587, x: 4567415.919, y: 8651195.623 },
      { id: 52589, x: 4565801.241, y: 8646743.493 },
      { id: 72186, x: 4521992.471, y: 8470739.346 },
      { id: 72187, x: 4518292.24, y: 8464253.87 },
      { id: 72190, x: 4512807.28, y: 8470417.44 },
      { id: 72193, x: 4509695.021, y: 8465916.658 },
      { id: 66018, x: 4581352.165, y: 8435354.533 },
      { id: 69112, x: 4562644.051, y: 8449270.876 },
      { id: 69115, x: 4562089.495, y: 8433728.981 },
      { id: 69119, x: 4558686.083, y: 8436437.298 },
      { id: 66026, x: 4573429.862, y: 8440156.897 },
      { id: 66028, x: 4572483.904, y: 8451019.606 },
      { id: 54687, x: 4562716.161, y: 8630861.533 },
      { id: 50564, x: 4598480.68, y: 8587512.065 },
      { id: 69122, x: 4553159.582, y: 8443549.561 },
      { id: 54688, x: 4561392.043, y: 8622343.076 },
      { id: 54689, x: 4559202.201, y: 8635473.553 },
      { id: 50568, x: 4594073.333, y: 8591973.591 },
      { id: 66033, x: 4568901.14, y: 8436803.204 },
      { id: 50569, x: 4592269.758, y: 8580624.14 },
      { id: 69127, x: 4548872.882, y: 8437634.58 },
      { id: 54693, x: 4556021.925, y: 8628846.305 },
      { id: 54695, x: 4551680.861, y: 8621576.055 },
      { id: 50572, x: 4587643.635, y: 8588275.817 },
      { id: 54696, x: 4551665.114, y: 8631946.542 },
      { id: 59854, x: 4489963.337, y: 8651500.764 },
      { id: 54699, x: 4546318.602, y: 8619645.505 },
      { id: 59855, x: 4489707.359, y: 8646176.626 },
      { id: 54700, x: 4546608.193, y: 8631985.618 },
      { id: 59856, x: 4490046.898, y: 8657332.938 },
      { id: 59860, x: 4486361.639, y: 8641560.972 },
      { id: 59861, x: 4486298.582, y: 8650495.032 },
      { id: 59862, x: 4484363.925, y: 8658598.131 },
      { id: 56770, x: 4524581.489, y: 8582357.072 },
      { id: 59865, x: 4482163.013, y: 8644807.637 },
      { id: 56772, x: 4522050.917, y: 8585800.918 },
      { id: 56773, x: 4521168.707, y: 8577723.146 },
      { id: 59868, x: 4480994.31, y: 8653751.373 },
      { id: 56775, x: 4517884.31, y: 8595454.647 },
      { id: 59869, x: 4479528.771, y: 8658262.028 },
      { id: 56778, x: 4516191.049, y: 8582017.897 },
      { id: 56779, x: 4513680.083, y: 8575437.46 },
      { id: 59874, x: 4475368.812, y: 8640377.438 },
      { id: 56782, x: 4513275.066, y: 8587300.342 },
      { id: 59876, x: 4473563.985, y: 8650438.486 },
      { id: 56783, x: 4511362.588, y: 8580290.84 },
      { id: 56784, x: 4510551.15, y: 8583812.904 },
      { id: 72249, x: 4482879.726, y: 8467444.166 },
      { id: 56786, x: 4508174.808, y: 8586399.079 },
      { id: 72259, x: 4464924.016, y: 8471023.436 },
      { id: 72261, x: 4452956.573, y: 8465942.328 },
      { id: 65047, x: 4600165.443, y: 8435318.901 },
      { id: 61954, x: 4631503.429, y: 8505926.86 },
      { id: 65048, x: 4598763.958, y: 8447369.584 },
      { id: 61955, x: 4631086.022, y: 8510732.484 },
      { id: 61956, x: 4630497.403, y: 8497112.115 },
      { id: 61960, x: 4626330.179, y: 8502524.093 },
      { id: 65054, x: 4593879.011, y: 8450644.367 },
      { id: 65055, x: 4593466.333, y: 8433155.672 },
      { id: 61962, x: 4625670.16, y: 8511107.222 },
      { id: 61963, x: 4624066.746, y: 8493720.223 },
      { id: 61964, x: 4623188.054, y: 8506808.247 },
      { id: 65059, x: 4591000.35, y: 8440032.546 },
      { id: 61967, x: 4620669.758, y: 8505722.624 },
      { id: 61968, x: 4620020.519, y: 8511104.069 },
      { id: 61969, x: 4619696.954, y: 8494494.164 },
      { id: 57852, x: 4507884.846, y: 8600890.529 },
      { id: 51666, x: 4595721.553, y: 8623321.977 },
      { id: 65069, x: 4583280.585, y: 8446476.221 },
      { id: 57853, x: 4508159.244, y: 8615991.456 },
      { id: 51667, x: 4593905.367, y: 8618047.322 },
      { id: 51668, x: 4593964.651, y: 8633253.905 },
      { id: 57857, x: 4503343.118, y: 8607192.453 },
      { id: 57860, x: 4500013.599, y: 8601103.13 },
      { id: 51674, x: 4588102.319, y: 8625676.479 },
      { id: 51675, x: 4587105.523, y: 8617694.014 },
      { id: 57864, x: 4497102.845, y: 8604576.348 },
      { id: 51678, x: 4585066.493, y: 8634471.925 },
      { id: 51680, x: 4582508.58, y: 8618630.704 },
      { id: 57869, x: 4492680.326, y: 8610117.862 },
      { id: 71272, x: 4507598.1, y: 8554269.57 },
      { id: 71273, x: 4507355.49, y: 8536155.302 },
      { id: 71275, x: 4502664.537, y: 8543617.422 },
      { id: 71278, x: 4497115.304, y: 8536714.187 },
      { id: 71281, x: 4493502.326, y: 8547634.353 },
      { id: 55820, x: 4544874.966, y: 8598935.47 },
      { id: 55823, x: 4542143.786, y: 8614970.729 },
      { id: 55825, x: 4539855.011, y: 8602165.414 },
      { id: 55827, x: 4536855.718, y: 8611690.743 },
      { id: 55829, x: 4535100.5, y: 8598764.269 },
      { id: 55830, x: 4533906.551, y: 8603813.091 },
      { id: 55832, x: 4531725.53, y: 8616158.885 },
      { id: 55836, x: 4527295.459, y: 8611079.168 },
      { id: 68210, x: 4596861.018, y: 8547999.305 },
      { id: 68214, x: 4593258.672, y: 8536587.678 },
      { id: 68222, x: 4587476.883, y: 8544356.687 },
      { id: 68223, x: 4587579.731, y: 8533826.442 },
      { id: 67213, x: 4599271.701, y: 8506159.661 },
      { id: 67216, x: 4597749.513, y: 8495662.712 },
      { id: 67220, x: 4594524.247, y: 8508612.782 },
      { id: 49695, x: 4639652.59, y: 8554842.117 },
      { id: 67223, x: 4592882.887, y: 8501756.261 },
      { id: 73409, x: 4486363.475, y: 8542901.884 },
      { id: 61038, x: 4618509.455, y: 8454398.603 },
      { id: 63101, x: 4617565.563, y: 8499697.922 },
      { id: 73411, x: 4483713.602, y: 8536756.246 },
      { id: 61040, x: 4616155.93, y: 8469410.472 },
      { id: 67228, x: 4588851.253, y: 8495840.34 },
      { id: 73414, x: 4481518.439, y: 8550084.317 },
      { id: 67229, x: 4588739.618, y: 8494902.086 },
      { id: 63105, x: 4615459.562, y: 8512018.978 },
      { id: 61043, x: 4614936.352, y: 8458265.042 },
      { id: 67230, x: 4587773.577, y: 8504383.825 },
      { id: 61044, x: 4613768.637, y: 8465090.491 },
      { id: 73417, x: 4479823.741, y: 8541009.349 },
      { id: 63108, x: 4613197.851, y: 8493305.724 },
      { id: 61047, x: 4612395.254, y: 8461477.26 },
      { id: 63110, x: 4612165.365, y: 8497730.337 },
      { id: 63111, x: 4611727.796, y: 8497959.188 },
      { id: 73421, x: 4473345.957, y: 8539219.892 },
      { id: 67236, x: 4583024.209, y: 8505555.041 },
      { id: 63112, x: 4611559.42, y: 8501485.431 },
      { id: 61052, x: 4609625.396, y: 8470355.674 },
      { id: 61054, x: 4609019.575, y: 8456726.754 },
      { id: 61056, x: 4607222.401, y: 8465041.229 },
      { id: 72399, x: 4482861.509, y: 8474322.397 },
      { id: 61059, x: 4605564.322, y: 8470974.091 },
      { id: 72400, x: 4482574.547, y: 8480284.425 },
      { id: 63122, x: 4604868.893, y: 8495740.517 },
      { id: 72403, x: 4476978.136, y: 8487116.943 },
      { id: 61063, x: 4603902.167, y: 8457248.562 },
      { id: 56939, x: 4505700.674, y: 8581169.308 },
      { id: 63126, x: 4602496.55, y: 8501361.819 },
      { id: 72405, x: 4475538.385, y: 8480760.388 },
      { id: 61065, x: 4601955.486, y: 8465979.938 },
      { id: 72406, x: 4475314.323, y: 8473607.354 },
      { id: 56942, x: 4504298.929, y: 8586894.659 },
      { id: 61067, x: 4600864.008, y: 8471652.534 },
      { id: 56943, x: 4501362.473, y: 8583923.993 },
      { id: 56944, x: 4501017.343, y: 8579106.848 },
      { id: 72409, x: 4471272.602, y: 8487184.64 },
      { id: 61069, x: 4600332.338, y: 8461891.393 },
      { id: 56945, x: 4501329.709, y: 8594045.705 },
      { id: 71382, x: 4525684.079, y: 8538572.354 },
      { id: 56951, x: 4494831.255, y: 8584058.142 },
      { id: 56952, x: 4493871.349, y: 8575889.052 },
      { id: 71388, x: 4519825.981, y: 8547551.812 },
      { id: 56956, x: 4490658.643, y: 8591587.451 },
      { id: 71391, x: 4517520.126, y: 8539130.792 },
      { id: 71397, x: 4511855.725, y: 8540333.077 },
      { id: 71400, x: 4509465.727, y: 8548038.007 },
      { id: 73469, x: 4468348.065, y: 8548082.723 },
      { id: 73473, x: 4464041.846, y: 8541458.122 },
      { id: 73474, x: 4460482.372, y: 8534631.754 },
      { id: 70387, x: 4542060.376, y: 8483874.26 },
      { id: 70389, x: 4541544.824, y: 8476690.353 },
      { id: 53895, x: 4542049.349, y: 8581944.347 },
      { id: 53897, x: 4540665.456, y: 8587736.866 },
      { id: 70395, x: 4532746.768, y: 8479128.859 },
      { id: 53901, x: 4536681.737, y: 8593076.636 },
      { id: 70400, x: 4528927.742, y: 8482396.681 },
      { id: 70401, x: 4527892.693, y: 8472478.668 },
      { id: 64218, x: 4636144.354, y: 8541179.529 },
      { id: 53908, x: 4528120.861, y: 8591494.35 },
      { id: 49784, x: 4621501.064, y: 8565327.239 },
      { id: 64221, x: 4634001.477, y: 8548764.801 },
      { id: 64223, x: 4630997.811, y: 8537729.096 },
      { id: 64228, x: 4625576.462, y: 8553088.651 },
      { id: 64235, x: 4621226.278, y: 8543221.429 },
      { id: 58050, x: 4526795.664, y: 8649242.443 },
      { id: 58051, x: 4524051.423, y: 8642275.259 },
      { id: 58053, x: 4522922.163, y: 8656186.799 },
      { id: 58054, x: 4522180.65, y: 8647384.764 },
      { id: 58057, x: 4517726.421, y: 8643547.687 },
      { id: 58059, x: 4516653.89, y: 8653701.377 },
      { id: 69404, x: 4557119.202, y: 8467980.587 },
      { id: 58064, x: 4511089.989, y: 8649018.115 },
      { id: 58065, x: 4510234.925, y: 8639641.263 },
      { id: 50848, x: 4581875.575, y: 8591326.5 },
      { id: 69408, x: 4553557.625, y: 8454587.966 },
      { id: 69409, x: 4551594.788, y: 8461589.352 },
      { id: 50852, x: 4579465.481, y: 8579378.949 },
      { id: 69416, x: 4545952.084, y: 8456940.607 },
      { id: 49828, x: 4624512.053, y: 8592850.55 },
      { id: 49830, x: 4622084.815, y: 8574916.725 },
      { id: 50862, x: 4572274.008, y: 8579492.329 },
      { id: 49831, x: 4621908.248, y: 8585390.221 },
      { id: 50864, x: 4571450.569, y: 8588214.491 },
      { id: 51897, x: 4582422.229, y: 8626378.067 },
      { id: 51899, x: 4581590.295, y: 8630641.974 },
      { id: 51900, x: 4580285.659, y: 8634183.69 },
      { id: 50869, x: 4566068.652, y: 8581599.589 },
      { id: 51904, x: 4577590.616, y: 8621739.28 },
      { id: 51907, x: 4575784.333, y: 8628536.056 },
      { id: 51910, x: 4574576.359, y: 8632171.832 },
      { id: 73561, x: 4469690.114, y: 8533488.964 },
      { id: 60162, x: 4470861.205, y: 8644441.08 },
      { id: 51914, x: 4570159.864, y: 8626130.56 },
      { id: 51915, x: 4568698.765, y: 8631501.334 },
      { id: 73567, x: 4463732.363, y: 8517341.283 },
      { id: 59134, x: 4483128.258, y: 8628359.097 },
      { id: 60166, x: 4468766.739, y: 8656768.098 },
      { id: 59135, x: 4482809.939, y: 8620779.441 },
      { id: 59136, x: 4482714.994, y: 8634696.635 },
      { id: 73570, x: 4459417.922, y: 8524949.423 },
      { id: 60168, x: 4466403.209, y: 8640325.033 },
      { id: 52952, x: 4562472.575, y: 8559442.409 },
      { id: 60170, x: 4463749.029, y: 8644830.643 },
      { id: 73574, x: 4451852.432, y: 8471607.41 },
      { id: 60172, x: 4461228.03, y: 8649372.55 },
      { id: 73576, x: 4450733.938, y: 8485986.335 },
      { id: 59143, x: 4477332.834, y: 8620038.27 },
      { id: 57081, x: 4506337.843, y: 8564337.757 },
      { id: 73577, x: 4450681.614, y: 8481449.429 },
      { id: 59144, x: 4475495.275, y: 8626304.103 },
      { id: 57082, x: 4506358.828, y: 8572959.025 },
      { id: 73578, x: 4450674.72, y: 8481445.986 },
      { id: 60176, x: 4457215.631, y: 8643498.784 },
      { id: 57083, x: 4502755.695, y: 8555894.894 },
      { id: 52959, x: 4554672.328, y: 8571117.648 },
      { id: 59146, x: 4473987.589, y: 8635179.948 },
      { id: 57084, x: 4502196.847, y: 8566814.487 },
      { id: 52960, x: 4551315.28, y: 8556827.087 },
      { id: 52961, x: 4551202.419, y: 8562711.224 },
      { id: 59148, x: 4472310.795, y: 8621660.683 },
      { id: 52963, x: 4547572.545, y: 8570539.816 },
      { id: 57089, x: 4497291.952, y: 8561078.184 },
      { id: 60192, x: 4450762.127, y: 8654070.816 },
      { id: 67411, x: 4580211.8, y: 8510361.92 },
      { id: 71537, x: 4523072.91, y: 8532152.002 },
      { id: 67414, x: 4578491.052, y: 8502962.288 },
      { id: 71541, x: 4519480.689, y: 8522899.266 },
      { id: 71544, x: 4515093.031, y: 8529441.259 },
      { id: 67422, x: 4571686.819, y: 8509068.681 },
      { id: 71546, x: 4512243.673, y: 8517977.118 },
      { id: 67423, x: 4570105.306, y: 8502417.671 },
      { id: 67425, x: 4569495.059, y: 8493522.388 },
      { id: 68459, x: 4581114.24, y: 8533615.668 },
      { id: 68461, x: 4578308.439, y: 8549556.021 },
      { id: 68463, x: 4577118.79, y: 8542520.941 },
      { id: 68470, x: 4570128.481, y: 8534768.15 },
      { id: 68472, x: 4568701.771, y: 8548124.352 },
      { id: 68478, x: 4563658.108, y: 8548529.006 },
      { id: 56107, x: 4561618.085, y: 8644066.604 },
      { id: 72603, x: 4487776.952, y: 8499382.251 },
      { id: 68480, x: 4563795.988, y: 8534750.159 },
      { id: 56108, x: 4558329.322, y: 8641372.191 },
      { id: 72604, x: 4487074.242, y: 8508479.166 },
      { id: 58171, x: 4508148.262, y: 8650825.763 },
      { id: 56109, x: 4558579.677, y: 8650619.717 },
      { id: 72606, x: 4486477.02, y: 8492871.639 },
      { id: 60235, x: 4639574.586, y: 8469789.123 },
      { id: 56111, x: 4555008.478, y: 8653296.355 },
      { id: 60236, x: 4639294.541, y: 8461527.117 },
      { id: 56112, x: 4552747.332, y: 8637744.328 },
      { id: 54050, x: 4540095.058, y: 8559653.116 },
      { id: 70547, x: 4558064.646, y: 8515138.659 },
      { id: 58175, x: 4506712.781, y: 8655745.214 },
      { id: 70548, x: 4557478.626, y: 8523899.074 },
      { id: 56114, x: 4552859.656, y: 8648854.07 },
      { id: 54052, x: 4537806.482, y: 8567070.317 },
      { id: 72611, x: 4479229.756, y: 8509595.264 },
      { id: 72612, x: 4478293.619, y: 8494450.512 },
      { id: 69520, x: 4544573.097, y: 8467621.437 },
      { id: 56118, x: 4547999.818, y: 8647502.455 },
      { id: 54057, x: 4532699.154, y: 8562519.533 },
      { id: 58182, x: 4500690.537, y: 8644184.951 },
      { id: 72616, x: 4472510.031, y: 8502240.377 },
      { id: 70555, x: 4550840.973, y: 8526526.161 },
      { id: 56121, x: 4546216.986, y: 8652680.843 },
      { id: 54059, x: 4531033.66, y: 8555784.602 },
      { id: 70556, x: 4546548.75, y: 8533293.922 },
      { id: 58184, x: 4496646.66, y: 8640844.197 },
      { id: 70557, x: 4546029.084, y: 8520162.6 },
      { id: 69526, x: 4539113.064, y: 8456031.18 },
      { id: 58185, x: 4496548.839, y: 8652906.437 },
      { id: 54061, x: 4529630.625, y: 8573007.543 },
      { id: 58186, x: 4496209.648, y: 8647015.807 },
      { id: 54064, x: 4526763.669, y: 8566745.8 },
      { id: 58189, x: 4493002.335, y: 8643105.414 },
      { id: 58190, x: 4492118.37, y: 8638262.567 },
      { id: 69532, x: 4534542.919, y: 8453382.83 },
      { id: 69533, x: 4530673.731, y: 8461465.324 },
      { id: 69534, x: 4529523.37, y: 8456359.01 },
      { id: 64403, x: 4616516.691, y: 8551539.38 },
      { id: 49969, x: 4614852.26, y: 8594387.843 },
      { id: 64405, x: 4614961.26, y: 8536271.823 },
      { id: 61313, x: 4617957.111, y: 8433196.297 },
      { id: 64407, x: 4612995.335, y: 8545434.895 },
      { id: 61314, x: 4617546.395, y: 8443612.251 },
      { id: 49973, x: 4610914.915, y: 8580416.766 },
      { id: 64409, x: 4610109.816, y: 8551963.156 },
      { id: 49975, x: 4610110.373, y: 8587316.684 },
      { id: 64411, x: 4608872.428, y: 8539081.036 },
      { id: 69567, x: 4544047.922, y: 8431823.735 },
      { id: 69568, x: 4543486.703, y: 8447363.556 },
      { id: 69569, x: 4541378.082, y: 8440694.294 },
      { id: 64414, x: 4605788.118, y: 8545683.353 },
      { id: 61321, x: 4613524.165, y: 8437304.998 },
      { id: 61322, x: 4612672.206, y: 8449889.136 },
      { id: 64416, x: 4603710.316, y: 8552046.663 },
      { id: 49984, x: 4601416.588, y: 8576014.314 },
      { id: 64419, x: 4601559.002, y: 8541286.014 },
      { id: 61328, x: 4609172.134, y: 8444108.612 },
      { id: 61330, x: 4608502.875, y: 8431405.663 },
      { id: 61336, x: 4605258.527, y: 8436199.448 },
      { id: 61337, x: 4604062.945, y: 8443994.384 },
      { id: 61338, x: 4603914.307, y: 8449008.17 },
      { id: 61343, x: 4600534.488, y: 8440283.335 },
      { id: 60317, x: 4639062.427, y: 8497432.188 },
      { id: 57224, x: 4523777.071, y: 8600189.048 },
      { id: 60319, x: 4638296.877, y: 8507924.083 },
      { id: 57226, x: 4522852.394, y: 8607449.788 },
      { id: 60320, x: 4638048.984, y: 8502220.957 },
      { id: 57227, x: 4522340.293, y: 8615691.141 },
      { id: 57229, x: 4519915.342, y: 8608271.45 },
      { id: 57231, x: 4519244.842, y: 8602236.697 },
      { id: 57232, x: 4518835.774, y: 8614817.675 },
      { id: 65481, x: 4598698.516, y: 8467501.664 },
      { id: 57233, x: 4515719.978, y: 8608407.68 },
      { id: 57235, x: 4514169.423, y: 8599361.06 },
      { id: 57237, x: 4514180.472, y: 8615653.694 },
      { id: 65487, x: 4595687.171, y: 8460006.367 },
      { id: 57239, x: 4511470.359, y: 8606360.247 },
      { id: 65492, x: 4588940.119, y: 8452744.953 },
      { id: 71679, x: 4506516.905, y: 8475966.725 },
      { id: 65494, x: 4588073.114, y: 8464073.863 },
      { id: 71680, x: 4504746.327, y: 8481218.942 },
      { id: 71683, x: 4501828.128, y: 8486058.01 },
      { id: 71685, x: 4500839.774, y: 8476951.862 },
      { id: 71689, x: 4495119.77, y: 8474436.91 },
      { id: 71690, x: 4493545.049, y: 8482159.268 },
      { id: 71693, x: 4491283.372, y: 8478316.495 },
      { id: 66550, x: 4599927.921, y: 8478506.817 },
      { id: 51087, x: 4580786.371, y: 8566617.305 },
      { id: 66552, x: 4598604.307, y: 8486130.492 },
      { id: 58308, x: 4486916.431, y: 8565035.003 },
      { id: 51095, x: 4574968.842, y: 8561149.458 },
      { id: 66561, x: 4591922.1, y: 8483221.088 },
      { id: 66565, x: 4589448.006, y: 8472724.995 },
      { id: 58317, x: 4474412.471, y: 8557237.124 },
      { id: 58318, x: 4474671.981, y: 8571215.449 },
      { id: 51102, x: 4570647.839, y: 8568297.022 },
      { id: 60383, x: 4639814.629, y: 8485378.153 },
      { id: 66571, x: 4582656.711, y: 8480812.56 },
      { id: 60386, x: 4638929.99, y: 8479234.04 },
      { id: 60387, x: 4637460.496, y: 8489972.755 },
      { id: 52151, x: 4581711.6, y: 8607543.521 },
      { id: 52154, x: 4580586.654, y: 8600137.474 },
      { id: 52156, x: 4577806.089, y: 8604395.996 },
      { id: 52158, x: 4576391.331, y: 8614198.887 },
      { id: 52159, x: 4575278.721, y: 8609122.216 },
      { id: 52161, x: 4573711.979, y: 8599711.968 },
      { id: 52164, x: 4570263.983, y: 8606627.137 },
      { id: 52165, x: 4567502.544, y: 8614778.076 },
      { id: 52167, x: 4565168.896, y: 8596101.614 },
      { id: 72791, x: 4466085.644, y: 8504455.591 },
      { id: 60420, x: 4638287.28, y: 8546501.031 },
      { id: 72792, x: 4465876.938, y: 8492990.626 },
      { id: 72794, x: 4463224.547, y: 8510304.319 },
      { id: 72798, x: 4460139.271, y: 8495763.614 },
      { id: 60440, x: 4639964.099, y: 8519686.297 },
      { id: 60441, x: 4639599.912, y: 8530254.937 },
      { id: 60442, x: 4638618.551, y: 8524622.134 },
      { id: 60467, x: 4618248.777, y: 8426602.413 },
      { id: 55313, x: 4545162.147, y: 8624596.016 },
      { id: 60469, x: 4611765.334, y: 8429270.465 },
      { id: 55314, x: 4541534.52, y: 8636247.957 },
      { id: 60471, x: 4601590.419, y: 8429133.577 },
      { id: 55318, x: 4537082.715, y: 8621074.844 },
      { id: 55320, x: 4533342.874, y: 8629762.834 },
      { id: 68733, x: 4579597.686, y: 8515312.368 },
      { id: 71826, x: 4502196.843, y: 8497158.486 },
      { id: 71827, x: 4501056.757, y: 8512582.49 },
      { id: 68735, x: 4576877.124, y: 8525663.569 },
      { id: 71828, x: 4500255.608, y: 8504755.135 },
      { id: 71831, x: 4495572.693, y: 8512853.187 },
      { id: 58429, x: 4483051.853, y: 8578273.436 },
      { id: 68739, x: 4572137.208, y: 8529569.318 },
      { id: 71832, x: 4495603.648, y: 8492540.114 },
      { id: 58430, x: 4483089.662, y: 8585332.087 },
      { id: 71833, x: 4494487.41, y: 8499876.089 },
      { id: 68741, x: 4569721.983, y: 8520821.441 },
      { id: 67710, x: 4579317.259, y: 8490933.838 },
      { id: 58435, x: 4476912.528, y: 8584780.37 },
      { id: 67714, x: 4575437.705, y: 8479520.322 },
      { id: 58436, x: 4477070.441, y: 8596111.808 },
      { id: 68747, x: 4564666.567, y: 8515746.896 },
      { id: 70812, x: 4555172.828, y: 8552112.554 },
      { id: 70814, x: 4553687.38, y: 8540839.46 },
      { id: 67721, x: 4569452.287, y: 8474146.592 },
      { id: 67727, x: 4564208.316, y: 8482093.875 },
      { id: 57430, x: 4526075.051, y: 8618614.674 },
      { id: 57431, x: 4524960.521, y: 8628983.194 },
      { id: 57432, x: 4523484.11, y: 8636398.315 },
      { id: 57433, x: 4521660.249, y: 8621366.387 },
      { id: 60530, x: 4624779.671, y: 8451030.234 },
      { id: 57437, x: 4518933.233, y: 8637050.123 },
      { id: 57438, x: 4518064.365, y: 8629555.921 },
      { id: 60532, x: 4623897.975, y: 8442812.192 },
      { id: 57440, x: 4516458.852, y: 8623414.035 },
      { id: 60534, x: 4622289.628, y: 8437490.164 },
      { id: 57444, x: 4512618.137, y: 8635526.583 },
      { id: 57445, x: 4511964.074, y: 8626402.182 },
      { id: 60539, x: 4620029.4, y: 8448455.672 },
      { id: 57447, x: 4510301.332, y: 8619814.391 },
      { id: 68792, x: 4554130.592, y: 8425566.657 },
      { id: 59517, x: 4470608.265, y: 8638186.895 },
      { id: 59519, x: 4470044.747, y: 8629474.986 },
      { id: 50242, x: 4616165.316, y: 8558188.795 },
      { id: 59522, x: 4467037.156, y: 8624728.998 },
      { id: 50246, x: 4611360.79, y: 8563203.626 },
      { id: 50247, x: 4611162.666, y: 8571026.099 },
      { id: 59527, x: 4464712.713, y: 8630115.353 },
      { id: 59528, x: 4464840.324, y: 8634982.117 },
      { id: 54374, x: 4562051.36, y: 8611108.666 },
      { id: 50251, x: 4607796.803, y: 8557866.503 },
      { id: 54376, x: 4560020.882, y: 8602397.838 },
      { id: 59533, x: 4460500.036, y: 8629314.611 },
      { id: 61596, x: 4633870.103, y: 8482656.417 },
      { id: 59534, x: 4459822.912, y: 8618212.129 },
      { id: 54379, x: 4558401.783, y: 8614812.162 },
      { id: 61597, x: 4633092.59, y: 8492408.977 },
      { id: 59535, x: 4455932.176, y: 8620722.296 },
      { id: 61599, x: 4632721.107, y: 8478467.201 },
      { id: 54382, x: 4553536.966, y: 8600174.183 },
      { id: 61601, x: 4632642.447, y: 8473323.228 },
      { id: 54384, x: 4552420.507, y: 8610714.23 },
      { id: 50260, x: 4600839.899, y: 8563845.975 },
      { id: 61602, x: 4631387.959, y: 8488047.337 },
      { id: 54389, x: 4548318.382, y: 8615884.179 },
      { id: 54390, x: 4546942.736, y: 8606632.634 },
      { id: 52328, x: 4601029.77, y: 8649490.687 },
      { id: 61608, x: 4628684.305, y: 8482005.543 },
      { id: 50268, x: 4609758.082, y: 8656527.104 },
      { id: 52331, x: 4597893.403, y: 8637489.832 },
      { id: 71920, x: 4521206.775, y: 8511643.646 },
      { id: 69859, x: 4558440.219, y: 8490333.306 },
      { id: 71921, x: 4519984.382, y: 8501361.273 },
      { id: 61612, x: 4627299.595, y: 8476450.46 },
      { id: 71922, x: 4519279.74, y: 8495298.548 },
      { id: 69861, x: 4557194.912, y: 8479615.114 },
      { id: 61615, x: 4625408.409, y: 8488310.059 },
      { id: 52336, x: 4594993.324, y: 8645023.416 },
      { id: 71925, x: 4510035.26, y: 8508879.764 },
      { id: 52337, x: 4594763.716, y: 8649080.634 },
      { id: 71927, x: 4509120.81, y: 8495942.992 },
      { id: 52341, x: 4590452.095, y: 8646259.211 },
      { id: 71930, x: 4524912.741, y: 8489099.542 },
      { id: 69869, x: 4549437.866, y: 8489901.009 },
      { id: 61621, x: 4622376.752, y: 8472354.766 },
      { id: 52342, x: 4589504.01, y: 8638592.47 },
      { id: 52343, x: 4588379.105, y: 8652498.956 },
      { id: 71932, x: 4521174.001, y: 8481466.116 },
      { id: 61623, x: 4621360.162, y: 8477265.294 },
      { id: 61624, x: 4620240.368, y: 8482604.472 },
      { id: 61625, x: 4619107.329, y: 8489105.268 },
      { id: 51315, x: 4596542.204, y: 8610503.003 },
      { id: 52347, x: 4584194.702, y: 8641099.319 },
      { id: 51316, x: 4596133.5, y: 8604103.854 },
      { id: 52348, x: 4583943.79, y: 8648894.821 },
      { id: 51317, x: 4594220.933, y: 8596201.33 },
      { id: 71939, x: 4515129.125, y: 8476422.199 },
      { id: 71940, x: 4514712.589, y: 8486625.955 },
      { id: 51322, x: 4590386.627, y: 8598011.558 },
      { id: 51324, x: 4589459.657, y: 8605035.72 },
      { id: 51326, x: 4588904.298, y: 8611118.39 },
      { id: 71946, x: 4509227.946, y: 8485532.844 },
      { id: 51328, x: 4585579.184, y: 8604087.061 },
      { id: 56485, x: 4541558.519, y: 8641962.748 },
      { id: 56486, x: 4540319.034, y: 8654026.309 },
      { id: 51331, x: 4582802.121, y: 8595970.37 },
      { id: 56487, x: 4538776.083, y: 8647861.405 },
      { id: 59581, x: 4470414.253, y: 8602308.511 },
      { id: 59582, x: 4470626.019, y: 8611429.184 },
      { id: 59583, x: 4468921.14, y: 8617440.19 },
      { id: 59584, x: 4468160.547, y: 8606138.4 },
      { id: 56491, x: 4534385.299, y: 8653769.255 },
      { id: 56492, x: 4532627.09, y: 8647422.449 },
      { id: 59586, x: 4462808.021, y: 8606363.073 },
      { id: 56493, x: 4531156.427, y: 8639453.081 },
      { id: 59587, x: 4462303.411, y: 8612966.519 },
      { id: 56495, x: 4527655.199, y: 8638911.686 },
      { id: 56497, x: 4528072.788, y: 8654331.504 },
      { id: 63715, x: 4613897.609, y: 8485353.29 },
      { id: 63716, x: 4613846.417, y: 8480358.136 },
      { id: 63717, x: 4613462.949, y: 8473606.173 },
      { id: 63724, x: 4608167.083, y: 8486247.753 },
      { id: 63727, x: 4607136.698, y: 8478187.441 },
      { id: 53421, x: 4562527.287, y: 8586948.625 },
      { id: 53422, x: 4561519.374, y: 8575493.515 },
      { id: 63733, x: 4600668.16, y: 8490099.292 },
      { id: 53426, x: 4556897.291, y: 8593704.092 },
      { id: 53427, x: 4554565.554, y: 8581296.665 },
      { id: 53428, x: 4553824.825, y: 8587164.458 },
      { id: 73019, x: 4468677.072, y: 8476744.663 },
      { id: 53432, x: 4547827.698, y: 8577299.284 },
      { id: 53433, x: 4546862.977, y: 8591999.749 },
      { id: 73027, x: 4459819.1, y: 8476216.147 },
      { id: 73029, x: 4459188.856, y: 8484789.801 },
      { id: 70968, x: 4544574.994, y: 8547869.294 },
      { id: 70972, x: 4541500.73, y: 8539259.018 },
      { id: 73036, x: 4453741.502, y: 8478597.39 },
      { id: 70975, x: 4538667.851, y: 8551247.95 },
      { id: 70977, x: 4535057.256, y: 8537317.678 },
      { id: 70980, x: 4532900.851, y: 8546622.879 },
      { id: 70982, x: 4531462.693, y: 8538001.295 },
      { id: 65846, x: 4578129.811, y: 8455893.063 },
      { id: 65848, x: 4577671.176, y: 8463781.26 },
      { id: 65853, x: 4569489.206, y: 8466111.472 },
      { id: 65859, x: 4564476.374, y: 8458678.899 },
      { id: 64851, x: 4615957.55, y: 8515735.16 },
      { id: 64853, x: 4614398.354, y: 8520131.498 },
      { id: 50421, x: 4596317.358, y: 8555709.385 },
      { id: 64857, x: 4611592.693, y: 8532723.4 },
      { id: 64858, x: 4610214.821, y: 8522907.25 },
      { id: 56611, x: 4522689.767, y: 8559244.453 },
      { id: 50425, x: 4592419.094, y: 8567190.518 },
      { id: 64860, x: 4608514.829, y: 8513893.072 },
      { id: 56613, x: 4521846.625, y: 8572967.225 },
      { id: 64865, x: 4605325.809, y: 8517645.486 },
      { id: 56618, x: 4514690.222, y: 8556415.825 },
      { id: 56619, x: 4514798.253, y: 8566589.198 },
      { id: 50434, x: 4585497.142, y: 8557299.06 },
      { id: 70026, x: 4560064.76, y: 8505235.758 },
      { id: 64872, x: 4602122.521, y: 8523897.587 },
      { id: 70029, x: 4557334.864, y: 8498839.934 },
      { id: 64874, x: 4600251.966, y: 8515291.18 },
      { id: 50440, x: 4582757.139, y: 8572693.512 },
      { id: 70041, x: 4546685.802, y: 8507651.734 },
      { id: 70042, x: 4545766.771, y: 8493699.628 },
      { id: 64887, x: 4589342.911, y: 8425982.662 },
      { id: 64894, x: 4567389.167, y: 8427847.869 },
      { id: 60785, x: 4634953.017, y: 8464370.554 },
      { id: 60786, x: 4634946.854, y: 8457376.948 },
      { id: 57693, x: 4507660.98, y: 8625615.923 },
      { id: 57695, x: 4505669.43, y: 8634829.86 },
      { id: 60789, x: 4631441.29, y: 8468965.161 },
      { id: 58727, x: 4488915.765, y: 8615634.425 },
      { id: 57697, x: 4505048.653, y: 8629177.798 },
      { id: 60792, x: 4629264.571, y: 8462850.96 },
      { id: 58730, x: 4486426.015, y: 8611389.922 },
      { id: 60794, x: 4628241.933, y: 8457739.581 },
      { id: 58732, x: 4485303.121, y: 8600036.231 },
      { id: 57702, x: 4500229.909, y: 8623810.919 },
      { id: 60796, x: 4626919.9, y: 8471982.415 },
      { id: 58734, x: 4483217.848, y: 8605468.769 },
      { id: 57703, x: 4499250.189, y: 8618161.054 },
      { id: 58735, x: 4482520.808, y: 8602751.653 },
      { id: 57704, x: 4498985.933, y: 8629910.931 },
      { id: 58736, x: 4481932.379, y: 8609778.715 },
      { id: 57705, x: 4498947.534, y: 8635940.645 },
      { id: 58739, x: 4478153.497, y: 8611892.793 },
      { id: 57708, x: 4496871.467, y: 8622377.575 },
      { id: 68019, x: 4599407.64, y: 8528789.198 },
      { id: 60802, x: 4624346.027, y: 8461064.393 },
      { id: 58740, x: 4477606.375, y: 8607597.114 },
      { id: 60803, x: 4623700.627, y: 8466641.274 },
      { id: 57710, x: 4495222.288, y: 8630248.498 },
      { id: 58742, x: 4475664.635, y: 8604764.006 },
      { id: 71117, x: 4543262.69, y: 8513294.185 },
      { id: 57715, x: 4491926.677, y: 8624906.29 },
      { id: 68026, x: 4596147.539, y: 8521336.055 },
      { id: 60809, x: 4619976.807, y: 8458026.321 },
      { id: 63903, x: 4635486.195, y: 8516761.255 },
      { id: 60810, x: 4619324.192, y: 8466559.307 },
      { id: 57717, x: 4491018.599, y: 8632500.659 },
      { id: 63905, x: 4633033.747, y: 8528139.641 },
      { id: 73184, x: 4488858.88, y: 8531431.105 },
      { id: 71123, x: 4537451.072, y: 8519108.801 },
      { id: 63907, x: 4632497.891, y: 8523033.458 },
      { id: 68032, x: 4592844.017, y: 8528321.685 },
      { id: 63909, x: 4631231.503, y: 8514414.458 },
      { id: 71127, x: 4533492.024, y: 8529797.217 },
      { id: 73189, x: 4479729.407, y: 8532844.154 },
      { id: 68035, x: 4590774.471, y: 8514930.329 },
      { id: 73191, x: 4479377.049, y: 8524178.155 },
      { id: 63914, x: 4626642.027, y: 8528601.568 },
      { id: 73193, x: 4478396.943, y: 8522574.195 },
      { id: 71132, x: 4526691.683, y: 8520332.127 },
      { id: 63915, x: 4626170.185, y: 8520706.905 },
      { id: 52575, x: 4578799.863, y: 8649124.564 },
      { id: 70103, x: 4539493.596, y: 8505313.959 },
      { id: 52576, x: 4577035.479, y: 8640705.654 },
      { id: 68042, x: 4585136.188, y: 8526588.183 },
      { id: 63918, x: 4623591.504, y: 8518142.95 },
      { id: 52577, x: 4576705.423, y: 8654375.558 },
      { id: 71136, x: 4502740.993, y: 8523208.845 },
      { id: 63919, x: 4623176.641, y: 8530905.069 },
      { id: 52578, x: 4576230.003, y: 8646251.804 },
      { id: 71137, x: 4497691.942, y: 8522929.009 },
      { id: 70106, x: 4535413.826, y: 8494076.799 },
      { id: 73200, x: 4472642.785, y: 8516205.171 },
      { id: 63922, x: 4620981.943, y: 8520930.089 },
      { id: 73201, x: 4471786.404, y: 8525758.291 }
    ];
  }
}
