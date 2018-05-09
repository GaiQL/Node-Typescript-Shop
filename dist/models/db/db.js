"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let dbS = new mongoose_1.default.Schema({
    key: Number,
    joinTime: Date,
    bdAddr: String,
    bdPhone: String,
    bdName: String
});
dbS.pre('save', function (next) {
    let data;
    data = this;
    console.log(this);
    data.joinTime = new Date();
    next();
});
exports.model_db = mongoose_1.default.model('db', dbS);
//# sourceMappingURL=db.js.map