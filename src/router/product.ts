var express = require('express');
var router = express.Router();
import { Request,Response,NextFunction } from 'express';

import * as Fn_product from '../controllers/product';

router.post('/doctorAndPromise.do',Fn_product.find);
router.get('/listType.do',Fn_product.listTypeFind);
router.post('/projectList.do',Fn_product.projectListFind);

module.exports = router;
