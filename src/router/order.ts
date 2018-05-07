var express = require('express');
var router = express.Router();
import { Verification_omH_List } from '../controllers/order_Manage';

import { Request,Response,NextFunction } from 'express';
import * as Fn_order from '../controllers/order_Manage';
import * as time from '../controllers/add'

router.post('/orderManagement.do',Verification_omH_List,Fn_order.omH_List);
// router.get('/save.do',time.time_add);
router.get('/save.do',Fn_order.omH_ListSabe);

module.exports = router;
