import { Request,Response,NextFunction } from 'express';
import { body,validationResult } from 'express-validator/check';
import { deleteImage_FN } from '../congfig/deleteImage';
import fs from 'fs';

// export let deleteImage_examine = [
//   body()
// ]

interface imgIf{
  status?:number,
  data?:string,
  message?:string
}

export let deleteImage = ( req:Request,res:Response,next:NextFunction ) => {

  deleteImage_FN( req.body.imgUrl || req.body.fileName,res );

}

export let imageSave = ( req:Request,res:Response,next:NextFunction ) => {

  let data:imgIf = {};
  if( req.file.path ){

    data.status = 200;
    data.data = process.env["img_domainName"] + '/' + req.file.path;

  }else{
    data.status = 500;
    data.data = 'some error';
  }
  res.send( data );
  res.end();

}
