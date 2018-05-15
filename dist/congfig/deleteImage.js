"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
exports.deleteImage_FN = (data, res) => {
    let arr = data instanceof Array ? data : data.split(',');
    try {
        arr.forEach((e, i) => {
            fs_1.default.unlinkSync('img' + e.split('img')[1]);
        });
        res.send({ status: 200, message: 'success' });
    }
    catch (err) {
        res.send({ status: 500, message: 'some error' });
    }
    res.end();
};
//# sourceMappingURL=deleteImage.js.map