"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deleteImage_1 = require("../congfig/deleteImage");
exports.deleteImage = (req, res, next) => {
    deleteImage_1.deleteImage_FN(req.body.imgUrl || req.body.fileName, res);
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