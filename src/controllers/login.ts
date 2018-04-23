import model from '../models/user';
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

  let newData = new model({
      account:'xiaoming',
      password:'123456'
  })

  newData.save(( err:Error )=>{
    if(err) return next(err);
    console.log('添加成功');
    res.end();
  })

}
