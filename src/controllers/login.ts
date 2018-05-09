import model from '../models/user';
import { getNextUserSequenceValue,userKeyIF } from '../models/counter';
import { Request,Response,NextFunction } from 'express';
import { UserModelIF } from "../models/User";
import { body,validationResult,check  } from 'express-validator/check';
import passport from 'passport';
import { IVerifyOptions } from 'passport-local';


export let loginVerification = [
  body('account','最少四位字符').isLength({ min: 4 }),
  body('password','密码为4-20个数字字符').isLength({ min: 4, max:20 }).matches(/^\d+$/)
]

export let login = ( req:Request,res:Response,next:NextFunction ) => {

  //有了 passport ，在登录中验证可以放弃 express-validator 了
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.send({
      status:422,
      data:'您输入的信息有误',
      message:errors.mapped()
    })
    res.end();
    // return res.status(422).json({ errors: errors.mapped() });
  }

  passport.authenticate("local", (err: Error, user: UserModelIF, info: IVerifyOptions) => {
    if (err) { return next(err); }
    if (!user) {
      res.send({ status:500,message:info.message })
      res.end();
      return;
    }
    req.logIn(user, (err) => {
      console.log(123);
      if (err) { return next(err); }
      process.env["ACCOUNT"] = req.body.account;
      res.send({ status:200,message:info.message })
      res.end();
    });
  })(req, res, next);

}

export let loginGet = (req:Request,res:Response,next:NextFunction) => {

  res.type('html');
  res.render('login');

}

export let save = ( req:Request,res:Response,next:NextFunction ) => {

  // 5ad9a85917dbc324205b6481 LastKey_users
  getNextUserSequenceValue( "key_user",next )
  .then(( data:userKeyIF )=>{

    let newData = new model({
        account:'xiaoming',
        password:'123456',
        key:data.last_key,  //递增字段

        checkStatusValue: "已审核",   //审核状态
        checkStatus: 1,              //审核状态码
        hospitalLogo: "http://image-product-web.oss-cn-beijing.aliyuncs.com/ym_hospital/shhm_yyZc_yylogo_0.jpg",  //用户头像
        accountTypeValue: "医美机构", //用户类型
        hospitalName: "上海华美医疗美容医院",//用户名称
        accountType: 2,              //用户类型状态码
    })
    return newData.save();

  })
  .then(()=>{
    res.end();
  })
  .catch(( err:Error )=>{ return next(err) });

}
