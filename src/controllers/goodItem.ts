import { Request,Response,NextFunction } from 'express';
import { getNextUserSequenceValue,userKeyIF } from '../models/counter';
import { goodItemIF,model_goodItem } from '../models/goodItem/goodItem'

export let save = ( req:Request,res:Response,next:NextFunction ) => {

  getNextUserSequenceValue( 'key_goodItem',next )
  .then(( data:userKeyIF )=>{
    let newData = new model_goodItem({
        typeName:'眼部',
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

  let promise = model_goodItem.find().exec();
  promise.then(( data:goodItemIF[] )=>{
    res.send({
      message:'获取医美类型列表成功',
      status:200,
      data
    })
  })
  .catch(( err:Error )=>{
    if( err ){ return next(err) }
  })

}
