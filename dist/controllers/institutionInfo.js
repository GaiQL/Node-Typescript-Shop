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
    check_1.body('hospLogo').isLength({ min: 1, max: 200 }),
    validationResult_1.validationResult_middleware
];
exports.editHospInfo_examine = [
    check_1.body('hospInfo').isLength({ min: 1, max: 200 }),
    validationResult_1.validationResult_middleware
];
exports.editHospContact_examine = [
    check_1.body('contactName').isLength({ min: 1, max: 20 }),
    check_1.body('contactMobile').isLength({ min: 11, max: 11 }).isNumeric(),
    check_1.body('contactEmail').optional({ checkFalsy: true }).isLength({ min: 1, max: 100 }).isEmail(),
    check_1.body('contactTelephone').optional({ checkFalsy: true }).isLength({ min: 1, max: 20 }).isNumeric(),
    check_1.body('contactQQ').optional({ checkFalsy: true }).isLength({ min: 1, max: 20 }).isNumeric(),
    validationResult_1.validationResult_middleware
];
// 多张图片逗号隔开字符串，设计到设置主图传对象index，存储为JSON对象
exports.editHospPhotos_examine = [
    check_1.body('hospPhotos').optional({ checkFalsy: true }).isLength({ min: 1, max: 1000 }),
];
exports.info_edit = (req, res, next) => {
    let promise = user_1.default.findOne({ key: req.signedCookies.key }).exec();
    promise.then((data) => {
        for (let key in req.body) {
            data[key] = req.body[key];
        }
        data.save((err) => {
            if (err)
                next(err);
            res.send({ status: 200, message: '修改成功' });
            res.end();
        });
    });
};
exports.delete_Img = (req, res, next) => {
    deleteImage_1.deleteImage_FN(req.body.fileName, res);
};
//# sourceMappingURL=institutionInfo.js.map