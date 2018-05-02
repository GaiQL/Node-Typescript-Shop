import model from '../models/user';
import { Request,Response,NextFunction } from 'express';
import { UserModelIF } from "../models/User";
import { verification_YIF,model_verification_Y } from "../models/order/verification_Y";



export let time_add = ( req:Request,res:Response ) => {
  let time = new Date();
  let newData = new model_verification_Y({
    time
  })
  newData.save(( err:Error )=>{
    if (err) return console.log( err );
    console.log( '保存成功' );
    res.send('ok');
    res.end();
  })
}






export let Add = ( req:Request,res:Response ) => {
  let newData = new model({
    username:'嘿嘿',
    email:'1852332222212123adf333@163.com',
    password:'321',
    boolean:'safd',
    arr:true
  })
  newData.save(( err:Error )=>{
    if( err ){
      console.log( '添加失败' + err );
      return;
    }
    console.log('添加成功');
    res.end();
  })
}


export let findAll = ( req:Request,res:Response,next:NextFunction ) => {
  model.find(( err:Error,data:UserModelIF )=>{
    // err = new Error('something is broken');
    if( err ) return next( err );

    console.log( req );
    // res.status(500);  //  浏览器产生的状态码;
    let expressionData = {
      status:200,
      data:data,
      message:'哈哈哈'
    }
    res.send( expressionData );
    res.end();
  })
}

export let findOne = ( req:Request,res:Response ) => {
  model.findById('5ad95040ae419c2908248e4e',( err:Error,data:UserModelIF )=>{
    if( err ) return console.log( err );
    console.log( 'what' );
    console.log( data );
    res.end();
  })

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

}

// export let getApi = (req: Request, res: Response) => {
//   res.render("api/index", {
//     title: "API Examples"
//   });
// };
