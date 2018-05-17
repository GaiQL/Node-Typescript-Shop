
var express = require('express');
var router = express.Router();
import { Request,Response,NextFunction } from 'express';

import * as Fn_institutionInfo from '../controllers/institutionInfo';
import * as Fn_image from '../controllers/image';

import { multer_storage } from '../congfig/multerStorage'

let uploadLogo = multer_storage('img/institutionLogo');

router.post('/currentHosp.do',Fn_institutionInfo.info_find);
router.post('/hospitalOSSImageUp.do',uploadLogo.single('file'),Fn_image.imageSave);
router.post('/editHospLogo.do',Fn_institutionInfo.info_edit);
router.post('/hospitalOSSImageDelete.do',Fn_institutionInfo.delete_Img);
router.post('/editHospInfo.do',Fn_institutionInfo.editHospInfo_examine,Fn_institutionInfo.info_edit);
router.post('/editHospContact.do',Fn_institutionInfo.editHospContact_examine,Fn_institutionInfo.info_edit);
router.post('/editHospPhotos.do',Fn_institutionInfo.editHospPhotos_examine,Fn_institutionInfo.info_edit);


module.exports = router;
    
