import model from '../models/user';
import { Request,Response,NextFunction } from 'express';
import { UserModelIF } from "../models/User";
import { verification_YIF,model_verification_Y } from "../models/order/verification_Y";
import moment from 'moment';


export let time_add = ( req:Request,res:Response ) => {
  let time = new Date().toLocaleString();
  let mo_time = moment();
  let newData = new model_verification_Y({
    time:mo_time
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

//时间  从Mongo中直接取出的也是格林尼治时间( GMT )   标志Z。UTC 协调世界时间。  北京时间与格林尼治时间或UTC时间相差8个时区
// new Date 后还是格林尼治时间....,
// .toLocaleString() 格林尼治时间转本地时间。
// 在Mongo中就储存为格林尼治时间，试下时间日期的查询是否方便，接下来就是前台与后台的时间通信.

export let findAll = ( req:Request,res:Response,next:NextFunction ) => {
  model_verification_Y.find(( err:Error,data:verification_YIF[] )=>{
    // err = new Error('something is broken');
    if( err ) return next( err );

    console.log( data );
    console.log( data[1].time.toLocaleString() );
    console.log( new Date().getTimezoneOffset() );   // -480  分钟为单位，格林尼治时间比当前时间少八个小时。
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

// "$gt" 、"$gte"、 "$lt"、 "$lte"(分别对应">"、 ">=" 、"<" 、"<=")；
// "$ne"  来进行  "不相等"
// new Date( 2018,5,3 )  //  2018-06-02T16:00:00.000Z   参数月份比实际月份小1
// new Date( '2018/5/3' )  //  2018-05-02T16:00:00.000Z
// moment( new Date() ) 就可以变成Moment对象了...
// new Date( moment() ) ts中不接受一个对象，但是js中可以转换；

// 在mongoose中定义类型就定义为 Date 了，所以可能咋存都是mongo默认的格林尼治时间了...
export let findTime = ( req:Request,res:Response,next:NextFunction ) => {
  let time = new Date().toLocaleString();  //本地时间字符串，( 2018-5-3 09:51:57 )
  let mo_time = new Date( );
  console.log( mo_time );
  model_verification_Y.find({ time:{ $gte:new Date( '2018/5/3' ) } },( err:Error,data:verification_YIF[] )=>{
    if( err ) return console.log( err );
    // console.log( data );
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
