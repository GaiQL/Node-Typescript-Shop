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
const Fn_image = __importStar(require("../controllers/image"));
const multerStorage_1 = require("../congfig/multerStorage");
let upload = multerStorage_1.multer_storage('img/doctorsPhoto');
router.post('/delete_image.do', Fn_image.deleteImage);
router.post('/upload_image_to_server.do', upload.single('file'), Fn_image.imageSave);
// router.get('/listBdInfo.do',Fn_db.find);
module.exports = router;
//# sourceMappingURL=image.js.map