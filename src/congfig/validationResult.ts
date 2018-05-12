import { body,validationResult } from 'express-validator/check';
import { Request,Response } from 'express';

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

}
