// {
//   "bdCode": null,
//   "joinTime": "2017-08-22 15:48:57",
//   "bdAddr": "北京市",
//   "bdPhone": "18800151083",
//   "bdName": "林谟阳",
//   "key": 1
// },
import { NextFunction,Response,Request } from 'express';
import { dbIF,model_db } from '../models/db/db';
import { getNextUserSequenceValue,userKeyIF } from '../models/counter';

export let save = ( req:Request,res:Response,next:NextFunction ) => {

  getNextUserSequenceValue( 'key_db',next )
  .then(( data:userKeyIF )=>{
    let newData = new model_db({
        bdAddr: "北京市",
        bdPhone: "18800151083",
        bdName: "林谟阳",
        key:data.last_key
    })
    newData.save(( err:Error )=>{
      if( err ){ return next( err ) }
      console.log('添加成功');
      res.send('添加成功');
      res.end()
    })
  })

}

export let find = ( req:Request,res:Response,next:NextFunction ) => {

  let promise = model_db.find().exec();
  promise.then(( data:dbIF[] )=>{
    res.send({
      message:'获取DB信息成功',
      status:200,
      data
    })
  })
  .catch(( err:Error )=>{
    if( err ){ return next(err) }
  })

}
