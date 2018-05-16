"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let baseProListS = new mongoose_1.default.Schema({
    restoreCycle: String,
    treatmentMethos: Number,
    resultHold: String,
    appShowState: Number,
    treatmentTimes: String,
    bigPrice: Number,
    proSort: Number,
    smallPrice: Number,
    typeName: String,
    proName: String,
    productNum: Number,
    STId: Number,
    proBaike: String,
    FTId: Number,
    proUseState: Number,
    key: Number,
    proIntroduction: String,
    brandList: Array,
    normList: Array
});
exports.model_baseProList = mongoose_1.default.model('baseProList', baseProListS);
//# sourceMappingURL=baseProList.js.map