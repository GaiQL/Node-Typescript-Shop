var express = require('express');
var router = express.Router();
import { Request,Response,NextFunction } from 'express';

import * as Fn_image from '../controllers/image';

import { multer_storage } from '../congfig/multerStorage'

let upload = multer_storage('img/doctorsPhoto');

router.post('/delete_image.do',Fn_image.deleteImage);
router.post('/upload_image_to_server.do',upload.single('file'),Fn_image.imageSave);
// router.get('/listBdInfo.do',Fn_db.find);


module.exports = router;
