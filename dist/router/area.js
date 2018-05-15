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
const Fn_area = __importStar(require("../controllers/area"));
router.get('/save.do', Fn_area.save);
router.get('/listArea.do', Fn_area.find);
module.exports = router;
//# sourceMappingURL=area.js.map