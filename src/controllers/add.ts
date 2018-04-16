import model from '../models/user';
import { Request,Response,NextFunction } from 'express';
import { UserModelIF } from "../models/User";


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


export let findAll = ( req:Request,res:Response ) => {
  model.find(( err:Error,data:UserModelIF )=>{
    if( err ) return console.log( err );
    console.log( data );
    res.end();
  })
}

export let findOne = ( req:Request,res:Response ) => {
  // model.findById('5ad0752b42a4eb0c5c1851c6',( err:Error,data:UserModelIF )=>{
  //   if( err ) return console.log( err );
  //   data.username = '啧啧啧啧啧啧';
  //   data.save(( err:Error )=>{
  //     if( err ) return console.log( err );
  //     console.log('修改成功')
  //   })
  //   console.log( data );
  //   res.end();
  // })

  // promise处理：
  
  let promise = model.findById('5ad0752b42a4eb0c5c1851c6').exec();
  promise.then(( data:UserModelIF )=>{
    data.username = '啧啧啧啧啧啧';
    console.log( data.save() );
    return data.save(); // returns a promise
  })
  .then(( data:UserModelIF )=>{
    console.log('修改成功');
  })
  .catch(( err:Error )=>{
    console.log( err );
  })

}

// export let getApi = (req: Request, res: Response) => {
//   res.render("api/index", {
//     title: "API Examples"
//   });
// };
