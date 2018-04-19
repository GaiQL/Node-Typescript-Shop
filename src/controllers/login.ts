import model from '../models/user';
import { Request,Response,NextFunction } from 'express';
import { UserModelIF } from "../models/User";
import { body,validationResult,check  } from 'express-validator/check';
import passport from 'passport';
import { IVerifyOptions } from 'passport-local';

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
export let loginVerification = [
  body('account','最少四位数').isLength({ min: 4 }),
  body('password','数字').isLength({ min: 4, max:20 }).matches(/^\d+$/)
]

export let login = ( req:Request,res:Response,next:NextFunction ) => {

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

  console.log( req.body );
  console.log( req.isAuthenticated() );

  passport.authenticate("local", (err: Error, user: UserModelIF, info: IVerifyOptions) => {
    if (err) { return next(err); }
    if (!user) {
      // req.flash("errors", info.message);
      console.log('errors');
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
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

}

export let save = ( req:Request,res:Response,next:NextFunction ) => {

  let newData = new model({
      account:'xiaohong123123',
      password:'123456123123'
  })

  newData.save(( err:Error )=>{
    if(err) return next(err);
    console.log('添加成功');
    res.end();
  })


}
