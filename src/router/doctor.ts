var express = require('express');
var router = express.Router();
import { Request,Response,NextFunction } from 'express';

import * as Fn_goodItem from '../controllers/goodItem';
import * as Fn_doctor from '../controllers/doctor';

// 医美擅长项目
router.get('/saveGoodItem.do',Fn_goodItem.save);
router.get('/firstTypeList.do',Fn_goodItem.find);
// 医生
router.post('/addDoctor.do',Fn_doctor.save);
// image
router.get( '/uploadDoctorImg.do',Fn_doctor.save_Img )

module.exports = router;
