"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const check_1 = require("express-validator/check");
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
exports.login = (req, res, next) => {
    console.log(req.body);
    check_1.body('account', '最少四位数').isLength({ min: 5 });
    check_1.body('password', '数字').matches(/\d/).isLength({ min: 5 });
    const errors = check_1.validationResult(req);
    console.log(errors.isEmpty());
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }
    let promise = user_1.default.findOne({
        account: req.body.account,
        password: req.body.password
    }).exec();
    promise.then((data) => {
        console.log(data);
        if (data) {
            res.send({
                status: 200,
                data: '登陆成功'
            });
        }
        else {
            res.send({
                status: 500,
                data: '用户名或密码不正确'
            });
        }
        res.end();
    })
        .catch((err) => {
        next(err);
        console.log(err);
    });
};
//# sourceMappingURL=login.js.map