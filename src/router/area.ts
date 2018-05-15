var express = require('express');
var router = express.Router();
import { Request,Response,NextFunction } from 'express';

import * as Fn_area from '../controllers/area';

router.get('/save.do',Fn_area.save);
router.get('/listArea.do',Fn_area.find);

module.exports = router;
