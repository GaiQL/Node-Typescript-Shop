import model from '../models/user';
import { Request,Response,NextFunction } from 'express';
import { UserModelIF } from "../models/User";
import { body,validationResult  } from 'express-validator/check';

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

export let login = ( req:Request,res:Response,next:NextFunction ) => {

  console.log( req.body );
  body('account','最少四位数').isLength({ min: 5 });
  body('password','数字').matches(/\d/).isLength({ min: 5 });

  const errors = validationResult(req);
  console.log(errors.isEmpty());
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }


  let promise = model.findOne({
    account:req.body.account,
    password:req.body.password
  }).exec();
  promise.then(( data:UserModelIF )=>{
    console.log(data);
    if( data ){
      res.send({
        status:200,
        data:'登陆成功'
      });
    }else{
      res.send({
        status:500,
        data:'用户名或密码不正确'
      });
    }
    res.end();
  })
  .catch(( err:Error )=>{
    next(err);
    console.log(err);
  })

}
