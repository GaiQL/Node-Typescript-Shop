import { Request,Response,NextFunction } from 'express';
import { provinceIF,model_area } from '../models/area';

export let find = ( req:Request,res:Response,next:NextFunction ) => {

  let promise = model_area.find().exec();
  promise.then(( data:provinceIF[] )=>{
    res.send({ status:200,message:'获取成功',data });
    res.end();
  })
  .catch(( err )=>{
    next( err );
  })

}

export let save = ( req:Request,res:Response,next:NextFunction ) => {

  let newDate = new model_area({
    appShowState:0
  })
  newDate.save(( err )=>{
    if( err ) next( err );
    res.send('ok');
    res.end();
  })

}
