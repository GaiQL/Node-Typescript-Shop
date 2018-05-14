"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
exports.deleteImage = (req, res, next) => {
    try {
        req.body.imgUrl.split(',').forEach((e, i) => {
            fs_1.default.unlinkSync('img' + e.split('img')[1]);
        });
        res.send({ status: 200, message: 'success' });
    }
    catch (err) {
        res.send({ status: 500, message: 'some error' });
    }
    res.end();
};
exports.imageSave = (req, res, next) => {
    let data = {};
    if (req.file.path) {
        data.status = 200;
        data.data = process.env["img_domainName"] + '/' + req.file.path;
    }
    else {
        data.status = 500;
        data.data = 'some error';
    }
    res.send(data);
    res.end();
};
//# sourceMappingURL=image.js.map