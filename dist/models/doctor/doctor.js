"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let doctorS = new mongoose_1.default.Schema({});
exports.modle_doctor = mongoose_1.default.model('doctor', doctorS);
//# sourceMappingURL=doctor.js.map