"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const counter_1 = require("../models/counter");
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
            console.log(123);
            if (err) {
                return next(err);
            }
            process.env["ACCOUNT"] = req.body.account;
            res.send({ status: 200, message: info.message });
            res.end();
        });
    })(req, res, next);
};
exports.loginGet = (req, res, next) => {
    res.type('html');
    res.render('login');
};
exports.save = (req, res, next) => {
    // 5ad9a85917dbc324205b6481 LastKey_users
    counter_1.getNextUserSequenceValue("5ad9a85917dbc324205b6481", next)
        .then((data) => {
        let newData = new user_1.default({
            account: 'xiaoming',
            password: '123456',
            key: data.userLastKey,
            checkStatusValue: "已审核",
            checkStatus: 1,
            hospitalLogo: "http://image-product-web.oss-cn-beijing.aliyuncs.com/ym_hospital/shhm_yyZc_yylogo_0.jpg",
            accountTypeValue: "医美机构",
            hospitalName: "上海华美医疗美容医院",
            accountType: 2,
        });
        return newData.save();
    })
        .then(() => {
        res.end();
    })
        .catch((err) => { return next(err); });
};
//# sourceMappingURL=login.js.map