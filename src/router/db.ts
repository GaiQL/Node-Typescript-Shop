var express = require('express');
var router = express.Router();
import { Request,Response,NextFunction } from 'express';

import * as Fn_db from '../controllers/db';

router.get('/save.do',Fn_db.save);
router.get('/listBdInfo.do',Fn_db.find);

module.exports = router;
   
