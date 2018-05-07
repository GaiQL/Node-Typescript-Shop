"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let verification_Y = new mongoose_1.default.Schema({
    time: { type: Date }
}, {
    read: 'nearest'
});
exports.model_verification_Y = mongoose_1.default.model('verification_Y', verification_Y);
/*



*/
//# sourceMappingURL=verification_Y.js.map