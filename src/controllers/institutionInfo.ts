import { Request,Response,NextFunction } from 'express';
import { UserModelIF, default as model }　from '../models/user';
import { body,validationResult } from 'express-validator/check';
import { validationResult_FN,validationResult_middleware } from '../congfig/validationResult';
import { deleteImage_FN } from '../congfig/deleteImage';


export let info_find = ( req:Request,res:Response,next:NextFunction ) => {

  let promise = model.findOne( {key:req.signedCookies.key},{account:0,password:0} ).exec();
  promise.then(( data:UserModelIF )=>{

    res.send({ status:200,message:'获取信息成功',data })
    res.end();

  })

}

export let editDoctorIsTop_examine = [
  body( 'hospLogo' ).isLength( { min:1,max:200 } ),
  validationResult_middleware
];

export let editHospInfo_examine = [
  body( 'hospInfo' ).isLength( { min:1,max:200 } ),
  validationResult_middleware
];

export let editHospContact_examine = [
  body( 'contactName' ).isLength( { min:1,max:20 } ),
  body( 'contactMobile' ).isLength( { min:11,max:11 } ).isNumeric(),
  body( 'contactEmail' ).optional({ checkFalsy:true }).isLength( { min:1,max:100 } ).isEmail(),
  body( 'contactTelephone' ).optional({ checkFalsy:true }).isLength( { min:1,max:20 } ).isNumeric(),
  body( 'contactQQ' ).optional({ checkFalsy:true }).isLength( { min:1,max:20 } ).isNumeric(),
  validationResult_middleware
];

// 多张图片逗号隔开字符串，设计到设置主图传对象index，存储为JSON对象
export let editHospPhotos_examine = [
  body( 'hospPhotos' ).optional({ checkFalsy:true }).isLength({ min:1,max:1000 }),
]

export let info_edit = ( req:Request,res:Response,next:NextFunction ) => {

  let promise = model.findOne( {key:req.signedCookies.key} ).exec();
  promise.then(( data:UserModelIF )=>{

    for( let key in req.body ){
      data[key] = req.body[key];
    }
    data.save(( err )=>{
      if( err ) next(err);
      res.send({ status:200,message:'修改成功' })
      res.end();
    })

  })

}

export let delete_Img = ( req:Request,res:Response,next:NextFunction ) => {
  deleteImage_FN( req.body.fileName,res );
}
