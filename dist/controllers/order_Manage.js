"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verification_N_1 = require("../models/order/verification_N");
const check_1 = require("express-validator/check");
// 本想着给req.body，天真了...
// interface omH_ListBody{
//   verificationState: string;
//   settlementState: string;
//   currentPage: string;
//   orderCode: string;
//   verificationCode: string;
//   startTime: Date;
//   endTime: Date;
//   heihei: string;
// }
// .matches  正则验证
//  is 判断然后返回结果  to 使成为；
// .custom   验证函数；
// .customSanitizer  666666
// 有了这两个函数，这天下岂不是就属于我的了！！！！！！！66666666
// .optional() checkFalsy:true 如果当前值为"", 0, false, null,undefined,当前链上的所有不产生效果   is通不通过都会执行to
exports.Verification_omH_List = [
    check_1.body('currentPage', '页数，必填数字').isLength({ min: 1, max: 5 }).isNumeric().toInt(),
    check_1.body('verificationState', '数字').optional({ checkFalsy: true }).isLength({ min: 0, max: 1 }).isNumeric().toInt(),
    check_1.body('settlementState', '数字').optional({ checkFalsy: true }).isLength({ min: 0, max: 1 }).isNumeric().toInt(),
    check_1.body('orderCode', '订单编号，数字').optional({ checkFalsy: true }).isLength({ min: 0, max: 30 }).isNumeric(),
    check_1.body('verificationCode', '核销券号').optional({ checkFalsy: true }).isLength({ min: 0, max: 5 }),
];
//从req.body中取出来的所有都是字符串？？   啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！  要静，要安静，要宁静，要心经，要克制，世界如此美好，如此美好，美好，好，好尼玛
exports.omH_List = (req, res, next) => {
    console.log(req.body);
    const errors = check_1.validationResult(req);
    let time = new Date();
    console.log(time);
    if (!errors.isEmpty()) {
        res.send({
            status: 422,
            data: '您输入的信息有误',
            message: errors.mapped(),
            time: new Date()
        });
        res.end();
        return;
    }
    // settlementState,verificationState 决定了使用哪个Model，
    // currentPage 当前页，
    // orderCode 订单编号，verificationCode核销券号
    // startTime，endTime
    let medel_Promise;
    // if( verificationState == 0 ){
    //   medel_Promise =
    // }else if(  verificationState == 1 ){
    //
    // }else if(  verificationState == 4 ){
    //
    // }else if(  settlementState == 1 ){
    //
    // }
    let page = 0;
    let pageSize = 5;
    verification_N_1.model_verification_N.count({}, (err, count) => {
        if (err)
            return next(err);
        let promise = verification_N_1.model_verification_N.find()
            .skip(page * 5)
            .limit(pageSize)
            .exec()
            .then((data) => {
            data[0].verificationTime = req.body.startTime;
            data[0].refundTime = new Date();
            data[0].save((err) => {
                if (err)
                    return console.log(err);
                res.send({
                    status: 200,
                    data: {
                        resultData: data,
                        resultDataSize: count,
                        pageSize: pageSize
                    },
                    message: '获取成功'
                });
            });
        })
            .catch((err) => {
            return next(err);
        });
    });
};
exports.omH_ListSabe = (req, res, next) => {
    let newDate = new verification_N_1.model_verification_N({
        "createTime": "2017-07-11 23:55:26",
        "orderCode": "15224001798350210228",
        "paymentType": 1,
        "payAtShop": 12.4,
        "onlinePrice": 20,
        "nameUsp": "超微小气泡 超人气清洁神器 首次体验价！",
        "verificationTime": null,
        "refundTime": null,
        "productType": 1,
        "fixedPrice": 0,
        "verificationCode": "6R7AA13UFRTU",
        "userName": "18504345533",
        "prepayment": 7.6,
        "realPayment": 7.6,
        "key": 85
    });
    newDate.save((err) => {
        if (err)
            return next(err);
        res.send('成功喽');
        res.end();
    });
};
//# sourceMappingURL=order_Manage.js.map