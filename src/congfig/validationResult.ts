import { body,validationResult } from 'express-validator/check';
import { Request,Response,NextFunction } from 'express';

export let validationResult_FN = ( req:Request,res:Response ) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.send({
      status:422,
      data:'参数有误',
      message:errors.mapped()
    })
    res.end();
  }
  return !errors.isEmpty()

}

export let validationResult_middleware = ( req:Request,res:Response,next:NextFunction ) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.send({
      status:422,
      data:'参数有误',
      message:errors.mapped()
    })
    res.end();
  }else{
    next();
  }

}
