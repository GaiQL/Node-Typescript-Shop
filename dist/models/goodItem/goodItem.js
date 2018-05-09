"use strict";
// {
//   "typeName": "眼部",
//   "parentId": 0,
//   "typeSort": 1,
//   "isLeaf": 0,
//   "typeLevel": 1,
//   "key": 1
// },
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let goodItemS = new mongoose_1.default.Schema({
    key: Number,
    typeName: String
});
exports.model_goodItem = mongoose_1.default.model('goodItem', goodItemS);
//# sourceMappingURL=goodItem.js.map