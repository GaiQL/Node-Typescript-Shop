"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
/*

      订单编号
      核销券号
      项目名称
      用户信息
      项目金额
      预约金金额
      到店支付金额
      下单时间

*/
let stringTime = (what) => {
    // console.log( what );
    return new Date(what);
};
let verification_N = new mongoose_1.default.Schema({
    createTime: { type: Date, get: stringTime },
    orderCode: String,
    paymentType: Number,
    payAtShop: Number,
    onlinePrice: Number,
    nameUsp: String,
    // verificationTime:{ type:Date,default:Date.now() },
    verificationTime: { type: Date },
    refundTime: Date,
    productType: Number,
    fixedPrice: Number,
    verificationCode: String,
    userName: String,
    prepayment: Number,
    realPayment: Number,
    key: Number
}, {
    timestamps: true,
});
// type type_stringTime = ( ) => void;
// let stringTime:type_stringTime = ( ) => {
//   this.forEach(( e:verification_NIF,i:number )=>{
//     e.createTime = moment( e.createTime ).format('YYYY-MM-DD HH:mm:ss');
//   })
// }
// verification_N.methods.stringTime = stringTime;
exports.model_verification_N = mongoose_1.default.model('verification_N', verification_N);
// {
//   "data": {
//     "resultData": [
//       {
//         "createTime": "2017-07-11 23:55:26",
//         "orderCode": "15224001798350210228",
//         "paymentType": 1,
//         "payAtShop": 12.4,
//         "onlinePrice": 20,
//         "nameUsp": "超微小气泡 超人气清洁神器 首次体验价！",
//         "verificationTime": null,
//         "refundTime": null,
//         "productType": 1,
//         "fixedPrice": 0,
//         "verificationCode": "6R7AA13UFRTU",
//         "userName": "18504345533",
//         "prepayment": 7.6,
//         "realPayment": 7.6,
//         "key": 85
//       },
//       {
//         "createTime": "2017-07-13 10:56:00",
//         "orderCode": "15224005443270210241",
//         "paymentType": 2,
//         "payAtShop": 0,
//         "onlinePrice": 20,
//         "nameUsp": "（咸蛋家711大促无需到店付款） 超微小气泡 超人气清洁神器 首次体验价！",
//         "verificationTime": null,
//         "refundTime": null,
//         "productType": 1,
//         "fixedPrice": 6.39,
//         "verificationCode": "BF5JM4QU317B",
//         "userName": "18516227660",
//         "prepayment": 0,
//         "realPayment": 6.39,
//         "key": 91
//       },
//       {
//         "createTime": "2017-07-13 11:09:39",
//         "orderCode": "15224005807650001055",
//         "paymentType": 2,
//         "payAtShop": 0,
//         "onlinePrice": 20,
//         "nameUsp": "（咸蛋家711大促无需到店付款） 超微小气泡 超人气清洁神器 首次体验价！",
//         "verificationTime": null,
//         "refundTime": null,
//         "productType": 1,
//         "fixedPrice": 6.39,
//         "verificationCode": "MNUTPA55EV88",
//         "userName": "18616285218",
//         "prepayment": 0,
//         "realPayment": 6.39,
//         "key": 92
//       },
//       {
//         "createTime": "2017-07-13 14:13:00",
//         "orderCode": "15224040402780210205",
//         "paymentType": 2,
//         "payAtShop": 0,
//         "onlinePrice": 20,
//         "nameUsp": "（咸蛋家711大促无需到店付款） 超微小气泡 超人气清洁神器 首次体验价！",
//         "verificationTime": null,
//         "refundTime": null,
//         "productType": 1,
//         "fixedPrice": 6.39,
//         "verificationCode": "PSZ924S79SDM",
//         "userName": "13626693656",
//         "prepayment": 0,
//         "realPayment": 6.39,
//         "key": 105
//       },
//       {
//         "createTime": "2017-09-29 08:38:08",
//         "orderCode": "15226344967870001155",
//         "paymentType": 1,
//         "payAtShop": 12.4,
//         "onlinePrice": 20,
//         "nameUsp": " 超微小气泡 超人气清洁神器 首次体验价！",
//         "verificationTime": null,
//         "refundTime": null,
//         "productType": 1,
//         "fixedPrice": 0,
//         "verificationCode": "1MDM91M2NMJF",
//         "userName": "15710085232",
//         "prepayment": 7.6,
//         "realPayment": 7.6,
//         "key": 123
//       }
//     ],
//     "resultDataSize": 8,
//     "pageSize": 5
//   },
//   "message": "获取成功",
//   "status": 200
// }
//# sourceMappingURL=verification_N.js.map