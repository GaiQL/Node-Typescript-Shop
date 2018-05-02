"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const verification_Y_1 = require("../models/order/verification_Y");
exports.time_add = (req, res) => {
    let time = new Date();
    let newData = new verification_Y_1.model_verification_Y({
        time
    });
    newData.save((err) => {
        if (err)
            return console.log(err);
        console.log('保存成功');
        res.send('ok');
        res.end();
    });
};
exports.Add = (req, res) => {
    let newData = new user_1.default({
        username: '嘿嘿',
        email: '1852332222212123adf333@163.com',
        password: '321',
        boolean: 'safd',
        arr: true
    });
    newData.save((err) => {
        if (err) {
            console.log('添加失败' + err);
            return;
        }
        console.log('添加成功');
        res.end();
    });
};
exports.findAll = (req, res, next) => {
    user_1.default.find((err, data) => {
        // err = new Error('something is broken');
        if (err)
            return next(err);
        console.log(req);
        // res.status(500);  //  浏览器产生的状态码;
        let expressionData = {
            status: 200,
            data: data,
            message: '哈哈哈'
        };
        res.send(expressionData);
        res.end();
    });
};
exports.findOne = (req, res) => {
    user_1.default.findById('5ad95040ae419c2908248e4e', (err, data) => {
        if (err)
            return console.log(err);
        console.log('what');
        console.log(data);
        res.end();
    });
    // promise处理：
    // let promise = model.findById('5ad85286da304821284ff22b').exec();
    // promise.then(( data:UserModelIF )=>{
    //   data.account = 'xiaomingming123123';
    //   data.password = '123456';
    //   console.log( data.save() );
    //   return data.save(); // returns a promise
    // })
    // .then(( data:UserModelIF )=>{
    //   console.log('修改成功');
    // })
    // .catch(( err:Error )=>{
    //   console.log( err );
    // })
};
// export let getApi = (req: Request, res: Response) => {
//   res.render("api/index", {
//     title: "API Examples"
//   });
// };
//# sourceMappingURL=add.js.map