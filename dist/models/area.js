"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let areaS = new mongoose_1.default.Schema({
    key: Number,
    appShowState: Number,
    areaName: String,
    children: [{
            parentId: Number,
            appShowState: Number,
            areaName: String,
            children: [{
                    parentId: Number,
                    appShowState: Number,
                    areaName: String,
                    isHotcity: Number,
                    orderNum: Number,
                    code: String,
                    key: Number,
                }],
            isHotcity: Number,
            orderNum: Number,
            code: String,
            key: Number
        }],
    isHotcity: Number,
    orderNum: Number,
    code: String,
});
exports.model_area = mongoose_1.default.model('area', areaS);
//# sourceMappingURL=area.js.map