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
// import multer from 'multer';
const multerStorage_1 = require("../congfig/multerStorage");
let upload = multerStorage_1.multer_storage('img/doctorsZiZhi');
// let upload = multer({ dest: 'img/doctors/' });
// .single  单
// .array   多
const Fn_goodItem = __importStar(require("../controllers/goodItem"));
const Fn_doctor = __importStar(require("../controllers/doctor"));
// 医美擅长项目
router.get('/saveGoodItem.do', Fn_goodItem.save);
router.get('/firstTypeList.do', Fn_goodItem.find);
// save doctor
router.post('/addDoctor.do', Fn_doctor.save_examine, Fn_doctor.save);
// find doctor
router.post('/ListDoctor.do', Fn_doctor.find_examine, Fn_doctor.find);
// change doctor top status
router.post('/editDoctorIsTop.do', Fn_doctor.editDoctorIsTop_examine, Fn_doctor.editDoctorIsTop);
// look a doctor details
router.post('/findByDoctorId.do', Fn_doctor.findOne_examine, Fn_doctor.findOne);
// eidt doctor'
router.post('/editDoctor.do', Fn_doctor.save_examine, Fn_doctor.editDoctor);
// delete doctor
router.post('/deleteDoctor.do', Fn_doctor.findOne_examine, Fn_doctor.deleteDoctor);
// save image
router.post('/uploadDoctorImg.do', upload.single('file'), Fn_doctor.save_Img);
// reject reason
router.post('/rejectReason.do', Fn_doctor.findOne_examine, Fn_doctor.rejectReason);
// delete image
router.post('/deleteDoctorImg.do', Fn_doctor.delete_Img_examine, Fn_doctor.delete_Img);
module.exports = router;
//# sourceMappingURL=doctor.js.map