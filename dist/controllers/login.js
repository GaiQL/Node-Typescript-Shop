"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const check_1 = require("express-validator/check");
const passport_1 = __importDefault(require("passport"));
// export let login = ( req:Request,res:Response,next:NextFunction ) => {
//   console.log( req.body );
//   let data = new model({
//     account:req.body.account,
//     password:req.body.password
//   })
//   data.save(( err )=>{
//     if( err ) return next(err);
//     let data = {
//       message:'注册成功'
//     }
//     res.send( data );
//     res.end();
//   })
// }
exports.loginVerification = [
    check_1.body('account', '最少四位数').isLength({ min: 4 }),
    check_1.body('password', '数字').isLength({ min: 4, max: 20 }).matches(/^\d+$/)
];
exports.login = (req, res, next) => {
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
    console.log(req.body);
    console.log(req.isAuthenticated());
    passport_1.default.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            // req.flash("errors", info.message);
            console.log('errors');
            return res.redirect("/login");
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            console.log('success');
            // req.flash("success", { msg: "Success! You are logged in." });
            // res.redirect("/");
        });
    })(req, res, next);
    // let promise = model.findOne({
    //   account:req.body.account,
    //   password:req.body.password
    // }).exec();
    // promise.then(( data:UserModelIF )=>{
    //   console.log(data);
    //   if( data ){
    //     res.send({ status:200 , data:'登陆成功' });
    //   }else{
    //     res.send({ status:500 , data:'用户名或密码不正确' });
    //   }
    //   res.end();
    // })
    // .catch(( err:Error )=>{
    //   next(err);
    //   console.log(err);
    // })
};
exports.save = (req, res, next) => {
    let newData = new user_1.default({
        account: 'xiaohong123123',
        password: '123456123123'
    });
    newData.save((err) => {
        if (err)
            return next(err);
        console.log('添加成功');
        res.end();
    });
};
//# sourceMappingURL=login.js.map