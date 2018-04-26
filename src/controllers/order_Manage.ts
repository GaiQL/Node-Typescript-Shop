import { verification_NIF,model_verification_N } from '../models/order/verification_N';
import { Request,Response,NextFunction } from 'express';
import { body,validationResult } from 'express-validator/check';

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

export let Verification_omH_List = [
  body('verificationState','最少四位字符').isLength({ min: 1 }),
  body('settlementState','密码为4-20个数字字符').isLength({ min: 4, max:20 }).matches(/^\d+$/),
  body('currentPage','密码为4-20个数字字符').isLength({ min: 4, max:20 }).matches(/^\d+$/),
  body('orderCode','密码为4-20个数字字符').isLength({ min: 4, max:20 }).matches(/^\d+$/),
  body('verificationCode','密码为4-20个数字字符').isLength({ min: 4, max:20 }).matches(/^\d+$/),
  body('startTime','密码为4-20个数字字符').isLength({ min: 4, max:20 }).matches(/^\d+$/),
  body('endTime','密码为4-20个数字字符').isLength({ min: 4, max:20 }).matches(/^\d+$/)
]

export let omH_List = ( req:Request,res:Response,next:NextFunction ) => {

  console.log( req.body );
  const errors = validationResult( req );
  console.log(errors);
  if (!errors.isEmpty()) {
    res.send({
      status:422,
      data:'您输入的信息有误',
      message:errors.mapped()
    })
    res.end();
    console.log('error');
  }else{
    console.log('successs');
  }
  // settlementState,verificationState 决定了使用哪个Model，
  // currentPage 当前页，
  // orderCode 订单编号，verificationCode核销券号
  // startTime，endTime
  let medel_Promise:any;

  // if( verificationState == 0 ){
  //   medel_Promise =
  // }else if(  verificationState == 1 ){
  //
  // }else if(  verificationState == 4 ){
  //
  // }else if(  settlementState == 1 ){
  //
  // }

  let promise = model_verification_N.find().exec();
  promise
  .then(( data:verification_NIF[] )=>{
    console.log( data );
  })
  .catch(( err:Error )=>{
    return next(err);
  })

}
