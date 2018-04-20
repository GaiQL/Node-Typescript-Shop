"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const check_1 = require("express-validator/check");
const passport_1 = __importDefault(require("passport"));
exports.loginVerification = [
    check_1.body('account', '最少四位字符').isLength({ min: 4 }),
    check_1.body('password', '密码为4-20个数字字符').isLength({ min: 4, max: 20 }).matches(/^\d+$/)
];
exports.login = (req, res, next) => {
    //有了 passport ，在登录中验证可以放弃 express-validator 了
    const errors = check_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.send({
            status: 422,
            data: '您输入的信息有误',
            message: errors.mapped()
        });
        res.end();
        // return res.status(422).json({ errors: errors.mapped() });
    }
    passport_1.default.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            res.send({ status: 500, message: info.message });
            res.end();
            return;
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            res.send({ status: 200, message: info.message });
            res.end();
        });
    })(req, res, next);
};
exports.loginGet = (req, res, next) => {
    res.render('../public/login.html');
};
exports.save = (req, res, next) => {
    let newData = new user_1.default({
        account: 'xiaoming',
        password: '123456'
    });
    newData.save((err) => {
        if (err)
            return next(err);
        console.log('添加成功');
        res.end();
    });
};
//# sourceMappingURL=login.js.map