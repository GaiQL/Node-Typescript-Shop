"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let Sth = new mongoose_1.default.Schema({
    age: Number
});
exports.SthModel = mongoose_1.default.model('sth', Sth);
//# sourceMappingURL=sth.js.map