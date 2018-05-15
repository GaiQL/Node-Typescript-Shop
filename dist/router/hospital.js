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
const Fn_institutionInfo = __importStar(require("../controllers/institutionInfo"));
const Fn_image = __importStar(require("../controllers/image"));
const multerStorage_1 = require("../congfig/multerStorage");
let uploadLogo = multerStorage_1.multer_storage('img/institutionLogo');
router.post('/currentHosp.do', Fn_institutionInfo.info_find);
router.post('/hospitalOSSImageUp.do', uploadLogo.single('file'), Fn_image.imageSave);
router.post('/editHospLogo.do', Fn_institutionInfo.info_edit);
router.post('/hospitalOSSImageDelete.do', Fn_institutionInfo.delete_Img);
module.exports = router;
//# sourceMappingURL=hospital.js.map