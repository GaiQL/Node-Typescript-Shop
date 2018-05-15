import { Request,Response,NextFunction } from 'express';
import { UserModelIF, default as model }　from '../models/user';
import { body,validationResult } from 'express-validator/check';
import { validationResult_FN } from '../congfig/validationResult';
import { deleteImage_FN } from '../congfig/deleteImage';

export let info_find = ( req:Request,res:Response,next:NextFunction ) => {

  let promise = model.findOne( {key:req.signedCookies.key},{account:0,password:0} ).exec();
  promise.then(( data:UserModelIF )=>{

    res.send({ status:200,message:'获取信息成功',data })
    res.end();

  })

}

export let editDoctorIsTop_examine = [
  body( 'hospLogo' ).isLength( { min:1,max:200 } )
]

let oneParamsChange = ( req:Request,res:Response,next:NextFunction,str:string,message:string ) => {
  let promise = model.findOne( {key:req.signedCookies.key} ).exec();
  promise.then(( data:UserModelIF )=>{

    data[str] = req.body[str];
    data.save(( err )=>{
      if( err ) next(err);
      res.send({ status:200,message })
      res.end();
    })

  })
}

export let info_edit = ( req:Request,res:Response,next:NextFunction ) => {

  if( validationResult_FN( req,res ) ) return;

  oneParamsChange( req,res,next,'hospLogo','修改Logo成功' );

}

export let delete_Img = ( req:Request,res:Response,next:NextFunction ) => {
  deleteImage_FN( req.body.fileName,res );
}
