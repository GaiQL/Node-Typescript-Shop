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
const order_Manage_1 = require("../controllers/order_Manage");
const Fn_order = __importStar(require("../controllers/order_Manage"));
router.post('/orderManagement.do', order_Manage_1.Verification_omH_List, Fn_order.omH_List);
// router.get('/save.do',time.time_add);
router.get('/save.do', Fn_order.omH_ListSabe);
module.exports = router;
//# sourceMappingURL=order.js.map