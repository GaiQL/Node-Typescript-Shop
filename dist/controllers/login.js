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
            if (err) {
                return next(err);
            }
            process.env["ACCOUNT"] = req.body.account;
            let promise = user_1.default.findOne({ account: req.body.account }, { key: 1 }).exec();
            promise.then((data) => {
                res.cookie('key', data.key, { signed: true, maxAge: 5000000 });
                res.send({ status: 200, message: info.message });
                res.end();
            });
        });
    })(req, res, next);
};
exports.loginGet = (req, res, next) => {
    res.type('html');
    res.render('login');
};
exports.save = (req, res, next) => {
    // 5ad9a85917dbc324205b6481 LastKey_users
    counter_1.getNextUserSequenceValue("key_user", next)
        .then((data) => {
        let newData = new user_1.default({
            account: 'xiaoming',
            password: '123456',
            key: data.last_key,
            checkStatusValue: "已审核",
            checkStatus: 1,
            hospitalLogo: "http://image-product-web.oss-cn-beijing.aliyuncs.com/ym_hospital/shhm_yyZc_yylogo_0.jpg",
            accountTypeValue: "医美机构",
            hospitalName: "上海华美医疗美容医院",
            accountType: 1,
            "provinceId": 21,
            "cityId": 51,
            "hospInfo": "上海华美医疗美容医院坐落于上海浦东小陆家嘴商圈，紧邻闹中取静的浦东大道，交通便利，停车方便。院内环境优雅，装修温馨雅致，是一家力求将美融入到精致生活中的特色美容医院。医院设有整形外科、皮肤美容、注射美容、毛发种植、口腔美容等核心科室，同时，也在不断创新医疗美容体系和高品质个性化服务。...",
            "cityName": "上海市",
            "provinceName": "上海",
            "areaId": 52,
            "hospType": "医疗美容/医疗美容医院",
            "hospLogo": "http://image-product-web.oss-cn-beijing.aliyuncs.com/ym_hospital/shhm_yyZc_yylogo_0.jpg",
            "ziZhi": [
                {
                    "key": 345,
                    "hospitalId": 10045,
                    "zizhiType": 1,
                    "usefulUrl": "http://image-product-web.oss-cn-beijing.aliyuncs.com/ym_hospital/shhm_yyZc_yyzz_0.jpg",
                    "usefulTime": "2018-01-10 17:07:00",
                    "zizhiState": 1,
                    "isValid": 1
                },
                {
                    "key": 346,
                    "hospitalId": 10045,
                    "zizhiType": 2,
                    "usefulUrl": "http://image-product-web.oss-cn-beijing.aliyuncs.com/ym_hospital/shhm_yyZc_zyxkz_0.jpg",
                    "usefulTime": "2019-01-31 17:07:00",
                    "zizhiState": 2,
                    "isValid": 1
                },
                {
                    "key": 347,
                    "hospitalId": 10045,
                    "zizhiType": 3,
                    "usefulUrl": "http://image-product-web.oss-cn-beijing.aliyuncs.com/ym_hospital/shhm_yyZc_ggsczm_0.jpg",
                    "usefulTime": "2019-01-31 17:07:08",
                    "zizhiState": 2,
                    "isValid": 1
                },
                {
                    "key": 348,
                    "hospitalId": 10045,
                    "zizhiType": 3,
                    "usefulUrl": "http://image-product-web.oss-cn-beijing.aliyuncs.com/ym_hospital/shhm_yyZc_ggsczm_1.jpg",
                    "usefulTime": "2019-01-31 17:07:08",
                    "zizhiState": 2,
                    "isValid": 1
                }
            ],
            "contactTelephone": "",
            "lat": "31.245465",
            "contactQQ": "",
            "lon": "121.53707",
            "hospName": "上海华美医疗美容医院",
            "contactEmail": "",
            "openTimeStart": "08:00:00",
            "bankName": "建设银行",
            "typeName": "眼部,鼻部,面部轮廓",
            "bankInfo": "建行上海卢湾支行",
            "openTimeOver": "21:00:00",
            "areaName": "浦东新区",
            "accountHolder": "上海华美医疗美容医院有限公司",
            "hospStyle": 2,
            "goodatProject": "1,2,3",
            "authFileUrl": null,
            "hospAddress": "上海华美医疗美容医院有限公司",
            "contactName": "李凡",
            "bdName": "林谟阳",
            "contactMobile": "18701738716",
            "hospPhotos": "http://image-product-web.oss-cn-beijing.aliyuncs.com/ym_hospital/45_hospitalMy_2202.jpg,http://image-product-web.oss-cn-beijing.aliyuncs.com/ym_hospital/45_hospitalMy_1572.jpg,http://image-product-web.oss-cn-beijing.aliyuncs.com/ym_hospital/45_hospitalMy_8187.jpg,http://image-product-web.oss-cn-beijing.aliyuncs.com/ym_hospital/45_hospitalMy_125.jpg,http://image-product-web.oss-cn-beijing.aliyuncs.com/ym_hospital/45_hospitalMy_97.jpg,http://image-product-web.oss-cn-beijing.aliyuncs.com/ym_hospital/45_hospitalMy_2757.jpg,http://image-product-web.oss-cn-beijing.aliyuncs.com/ym_hospital/45_hospitalMy_9622.jpg,http://image-product-web.oss-cn-beijing.aliyuncs.com/ym_hospital/45_hospitalMy_9622.jpg,http://image-product-web.oss-cn-beijing.aliyuncs.com/ym_hospital/45_hospitalMy_9748.jpg",
            "bankAccount": "31001509600050011119"
        });
        return newData.save();
    })
        .then(() => {
        res.end();
    })
        .catch((err) => { return next(err); });
};
//# sourceMappingURL=login.js.map