"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
const Fn_goodItem = __importStar(require("../controllers/goodItem"));
const Fn_doctor = __importStar(require("../controllers/doctor"));
// 医美擅长项目
router.get('/saveGoodItem.do', Fn_goodItem.save);
router.get('/firstTypeList.do', Fn_goodItem.find);
// 医生
router.post('/addDoctor.do', Fn_doctor.save);
// image
router.get('/uploadDoctorImg.do', Fn_doctor.save_Img);
module.exports = router;
//# sourceMappingURL=doctor.js.map