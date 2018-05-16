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
const Fn_product = __importStar(require("../controllers/product"));
router.post('/doctorAndPromise.do', Fn_product.find);
router.get('/listType.do', Fn_product.listTypeFind);
router.post('/projectList.do', Fn_product.projectListFind);
module.exports = router;
//# sourceMappingURL=product.js.map