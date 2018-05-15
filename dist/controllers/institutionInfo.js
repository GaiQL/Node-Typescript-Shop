"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const check_1 = require("express-validator/check");
const validationResult_1 = require("../congfig/validationResult");
const deleteImage_1 = require("../congfig/deleteImage");
exports.info_find = (req, res, next) => {
    let promise = user_1.default.findOne({ key: req.signedCookies.key }, { account: 0, password: 0 }).exec();
    promise.then((data) => {
        res.send({ status: 200, message: '获取信息成功', data });
        res.end();
    });
};
exports.editDoctorIsTop_examine = [
    check_1.body('hospLogo').isLength({ min: 1, max: 200 })
];
let oneParamsChange = (req, res, next, str, message) => {
    let promise = user_1.default.findOne({ key: req.signedCookies.key }).exec();
    promise.then((data) => {
        data[str] = req.body[str];
        data.save((err) => {
            if (err)
                next(err);
            res.send({ status: 200, message });
            res.end();
        });
    });
};
exports.info_edit = (req, res, next) => {
    if (validationResult_1.validationResult_FN(req, res))
        return;
    oneParamsChange(req, res, next, 'hospLogo', '修改Logo成功');
};
exports.delete_Img = (req, res, next) => {
    deleteImage_1.deleteImage_FN(req.body.fileName, res);
};
//# sourceMappingURL=institutionInfo.js.map