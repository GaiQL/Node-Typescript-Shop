"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verification_N_1 = require("../models/order/verification_N");
const check_1 = require("express-validator/check");
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
exports.Verification_omH_List = [
    check_1.body('verificationState', '最少四位字符').isLength({ min: 1 }),
    check_1.body('settlementState', '密码为4-20个数字字符').isLength({ min: 4, max: 20 }).matches(/^\d+$/),
    check_1.body('currentPage', '密码为4-20个数字字符').isLength({ min: 4, max: 20 }).matches(/^\d+$/),
    check_1.body('orderCode', '密码为4-20个数字字符').isLength({ min: 4, max: 20 }).matches(/^\d+$/),
    check_1.body('verificationCode', '密码为4-20个数字字符').isLength({ min: 4, max: 20 }).matches(/^\d+$/),
    check_1.body('startTime', '密码为4-20个数字字符').isLength({ min: 4, max: 20 }).matches(/^\d+$/),
    check_1.body('endTime', '密码为4-20个数字字符').isLength({ min: 4, max: 20 }).matches(/^\d+$/)
];
exports.omH_List = (req, res, next) => {
    console.log(req.body);
    const errors = check_1.validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        res.send({
            status: 422,
            data: '您输入的信息有误',
            message: errors.mapped()
        });
        res.end();
        console.log('error');
    }
    else {
        console.log('successs');
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
    let promise = verification_N_1.model_verification_N.find().exec();
    promise
        .then((data) => {
        console.log(data);
    })
        .catch((err) => {
        return next(err);
    });
};
//# sourceMappingURL=order_Manage.js.map