"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const multiparty_1 = __importDefault(require("multiparty"));
exports.save = (req, res, next) => {
};
exports.save_Img = (req, res, next) => {
    let form = new multiparty_1.default.Form();
    form.uploadDir = 'Img';
};
//# sourceMappingURL=doctor.js.map