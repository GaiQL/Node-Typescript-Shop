"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
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
const multer_1 = __importDefault(require("multer"));
let storage = multer_1.default.diskStorage({
    destination: 'img/doctors',
    filename: function (req, file, cb) {
        console.log(file);
        let postfix = '.' + file.mimetype.split('/')[1];
        cb(null, file.fieldname + '-' + Date.now() + postfix);
    }
});
let upload = multer_1.default({
    storage,
    //   指定限制可以帮助保护您的站点免遭拒绝服务（DoS）攻击。
    limits: {
        fieldNameSize: 100,
        fieldSize: 512000,
        // 最大数量的非文件字段  没有非文件字段，是不是可以设置成0？....
        fields: 100,
        // 对于多部分表单，最大文件大小
        fileSize: 512000,
        // 对于多部分表单，文件字段的最大数量
        files: 100,
        // 对于多部分表单，最大数量的部分（字段+文件）
        parts: 512100
    }
});
// let upload = multer({ dest: 'img/doctors/' });
// .single  单
// .array   多
const Fn_goodItem = __importStar(require("../controllers/goodItem"));
const Fn_doctor = __importStar(require("../controllers/doctor"));
// 医美擅长项目
router.get('/saveGoodItem.do', Fn_goodItem.save);
router.get('/firstTypeList.do', Fn_goodItem.find);
// 医生
router.post('/addDoctor.do', Fn_doctor.save);
// image
router.post('/uploadDoctorImg.do', upload.single('file'), Fn_doctor.save_Img);
module.exports = router;
//# sourceMappingURL=doctor.js.map