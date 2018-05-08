import { verification_NIF,model_verification_N } from '../models/order/verification_N';
import { Request,Response,NextFunction } from 'express';
import { body,validationResult } from 'express-validator/check';
import moment from 'moment';
import { verification_YIF,model_verification_Y } from "../models/order/verification_Y";
import { stringTime } from '../congfig/stringTime';

// 本想着给req.body，天真了...
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
// .matches  正则验证
//  is 判断然后返回结果  to 使成为；
// .custom   验证函数；
// .customSanitizer  666666
// 有了这两个函数，这天下岂不是就属于我的了！！！！！！！66666666

// .optional() checkFalsy:true 如果当前值为"", 0, false, null,undefined,当前链上的所有不产生效果   is通不通过都会执行to
export let Verification_omH_List = [

  body('currentPage','页数，必填数字').isLength({ min:1,max:5 }).isNumeric().toInt(),

  body('verificationState','数字').optional({ checkFalsy:true }).isLength({ min:0,max:1 }).isNumeric().toInt(),
  body('settlementState','数字').optional({ checkFalsy:true }).isLength({ min:0,max:1 }).isNumeric().toInt(),
  body('orderCode','订单编号，数字').optional({ checkFalsy:true }).isLength({ min:0,max:30 }).isNumeric(),
  body('verificationCode','核销券号').optional({ checkFalsy:true }).isLength({ min:0,max:5 }),
  body('startTime','时间对象').optional({ checkFalsy:true }).isLength({ min:7,max:100 }).custom((value)=>{
    // 前台js传过来的时间对象，现在应该是一个字符串；  Thu May 03 2018 10:44:12 GMT+0800 (中国标准时间)
    // console.log( value );
    // let time = new Date( value );    //node中new Date(字符串)可变为同等的格林尼治时间；应该可以直接将这个字符串进行存储，Mongoose Date进行转换；
    // let time = moment( new Date(value) );  //moment中不能直接进行转换，要new Date下.....  他报错，不是报错，抛处一个警告，value值不符合标准，moment好像隐式转换成了js date对象。
    let timeT = new Date('1980 1 1');  //  1970-01-01T00:00:00.123Z
    // console.log( value instanceof Date );
    // console.log( timeT )
    return true;
  }),
  body('endTime','时间对象').optional({ checkFalsy:true }).isLength({ min:7,max:100 })

]

    //从req.body中取出来的所有都是字符串？？   啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！  要静，要安静，要宁静，要心经，要克制，世界如此美好，如此美好，美好，好，好尼玛

export let omH_List = ( req:Request,res:Response,next:NextFunction ) => {
  const errors = validationResult( req );
  if (!errors.isEmpty()) {
    res.send({
      status:422,
      data:'您输入的信息有误',
      message:errors.mapped()
      // time:moment().format('YYYY-MM-DD HH-mm-ss')   //  使用Moment对象转换为各种格式，方便又灵活，漂酿！！
    })
    res.end();
  //   model_verification_Y.find(( err,data:verification_YIF[] )=>{
  //   // 从mogoose中取出来的时间可以直接传给前端，为格林尼治时间；string.
  //   //  new Date() 与 moment() 传递到前面都   为格林尼治时间；string.
  //   res.send( {
  //     data:moment(data[0].time).format('YYYY-MM-DD HH-mm-ss')
  //   } );
  //   res.end();
  // })
  //   return;
  }
  // settlementState,verificationState 决定了使用哪个Model，
  // currentPage 当前页，
  // orderCode 订单编号，verificationCode核销券号
  // startTime，endTime
  // console.log( req.body );
  let medel_Promise:any;

  //   model_verification_Y.find(( err,data:verification_YIF[] )=>{
  //   // 从mogoose中取出来的时间可以直接传给前端，为格林尼治时间；string.
  //   //  new Date() 与 moment() 传递到前面都   为格林尼治时间；string.
  //   data[0].time = moment(data[0].time).format('YYYY-MM-DD HH-mm-ss')
  //   console.log( data[0] );
  //   res.send( {
  //     data
  //   } );
  //   res.end();
  // }).lean()
  //   return;

  // if( verificationState == 0 ){
  //   medel_Promise =
  // }else if(  verificationState == 1 ){
  //
  // }else if(  verificationState == 4 ){
  //
  // }else if(  settlementState == 1 ){
  //
  // }
  let page = 0;
  let pageSize = 5;
  model_verification_N.count({},(err:Error,count:number)=>{

    if( err ) return next(err);
    // .lean()  查询出来的是一个js对象，不再是mongoose.document,没有save等方法，使用后可以对返回的date随意操作。
    let promise = model_verification_N.find().lean()
    .skip(page * 5)
    .limit( pageSize )
    .exec()
    .then(( data:any )=>{

      stringTime( data,['createTime','verificationTime'] );

      console.log( data );

      res.send({
        status:200,
        data:{
          resultData:data,
          resultDataSize:count,
          pageSize:pageSize
        },
        message:'获取成功'
      })
    })
    .catch(( err:Error )=>{
      return next(err);
    })
  })

}



export let omH_ListSabe = ( req:Request,res:Response,next:NextFunction ) => {

  // 第一次在表中生成数据的时候，不给verificationTime，默认为undefined,当核销的时候添加verificationTime字段
  let newDate = new model_verification_N({
    "createTime": new Date(),
    "orderCode": "15224001798350210228",
    "paymentType": 1,
    "payAtShop": 12.4,
    "onlinePrice": 20,
    "nameUsp": "超微小气泡 超人气清洁神器 首次体验价！",
    "verificationTime":undefined,
    "refundTime":  new Date(),
    "productType": 1,
    "fixedPrice": 0,
    "verificationCode": "6R7AA13UFRTU",
    "userName": "18504345533",
    "prepayment": 7.6,
    "realPayment": 7.6,
    "key": 85
  });

  newDate.save(( err:Error )=>{
    if( err ) return next( err );
    res.send('成功喽');
    res.end();
  })

}
