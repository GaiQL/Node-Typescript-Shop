import { Request,Response,NextFunction } from 'express';
import { doctorIf,modle_doctor } from '../models/doctor/doctor'
import { body,validationResult } from 'express-validator/check';
import { getNextUserSequenceValue,userKeyIF } from '../models/counter';
import { stringTime } from '../congfig/stringTime';
import { validationResult_FN } from '../congfig/validationResult';
import fs from 'fs';

interface imgIf{
  status?:number,
  data?:string,
  message?:string
}

export let save_examine = [
  body( 'doctorName' ).isLength({ min:1,max:100 }),
  body( 'doctorCountry' ).isLength({ min:1,max:100 }),
  body( 'doctorSex' ).isLength({ min:1,max:1 }).isNumeric().toInt(),
  body( 'doctorJob' ).isLength({ min:1,max:100 }),
  body( 'doctorZizhi' ).isLength({ min:1,max:10 }),
  body( 'jobStartTime' ).isLength({ min:7,max:100 }),
  body( 'doctorEducation' ).isLength({ min:1,max:10 }),
  body( 'bdId' ).isLength({ min:1,max:10 }).isNumeric().toInt(),
  body( 'doctorGoodat' ).isLength({ min:1,max:100 }),
  body( 'doctorInfo' ).isLength({ min:1,max:200 }),
  body( 'doctorZizhiList' ).isLength({ min:1,max:1000 }),
]


export let save = ( req:Request,res:Response,next:NextFunction ) => {

  getNextUserSequenceValue( 'key_doctors',next ).then(( key:userKeyIF )=>{

    req.body.key = key.last_key;
    let newData = new modle_doctor( req.body );
    newData.save(( err )=>{
      if(err) return next( err );
      res.send({
        status:200,
        message:'添加医生成功'
      })
    })

  })
  .catch(( err:Error )=>{
    next( err );
  })

}

export let find_examine = [
  body( 'currentPage' ).isLength({ min:1,max:1000 }).isNumeric().customSanitizer( (value)=>{ return value?value:1 } ),
  body( 'type' ).isLength({ min:1,max:100 }).isNumeric().customSanitizer( (value)=>{ return value?value:0 } ),
  body( 'doctorName' ).isLength({ min:0,max:100 }),
  body( 'doctorKey' ).optional({ checkFalsy:true }).isLength({ min:0,max:100 }).isNumeric()
]

export let find = ( req:Request,res:Response,next:NextFunction ) => {

  validationResult_FN( req,res );

  interface find_condition_IF{
    doctorCheckState?:number;
    doctorUpshelf?:number;
    isTop?:number;
    doctorName?:{
       $regex:string;
       $options?:string;
    };
    key?:string
  }

  //  全部  审核中  驳回  已置顶  上架中  已下架
  let { type,doctorName,doctorKey } = req.body;
  let find_condition:find_condition_IF = {};

  console.log( doctorName,doctorKey,type );  //type默认是 0.....

  if( type == 1 ){
    find_condition = { doctorCheckState:0 };
  }else if( type == 2 ){
    find_condition = { doctorCheckState:2 };
  }else if( type == 3 ){
    find_condition = { doctorCheckState:1,doctorUpshelf:1,isTop:1 };
  }else if( type == 4 ){
    find_condition = { doctorCheckState:1,doctorUpshelf:1,isTop:0 };
  }else if( type == 5 ){
    find_condition = { doctorCheckState:1,doctorUpshelf:0 };
  }

  if( doctorKey ){ find_condition.key = doctorKey; }
  if( doctorName ){
    find_condition.doctorName = { $regex: '^' + (<string>doctorName),$options:'m'  };
  }

  modle_doctor.count( find_condition ,( err:Error,count:number )=>{
    let promise = modle_doctor.find( find_condition ).lean().exec();
    promise.then(( data:doctorIf[] )=>{

      stringTime( data,'actionTime' );
      res.send({
        status:200,
        message:'获取医生列表成功！',
        data:{
          doctorSum:count,
          doctorList:data || []
        }
      })

    })
    .catch(( err:Error )=>{ next( err ) })
  })

}

export let editDoctorIsTop_examine = [
  body( 'key' ).isNumeric().isLength( { min:1,max:10 } ),
  body( 'isTop' ).isNumeric().isLength( { min:1,max:1 } )
]

export let editDoctorIsTop = ( req:Request,res:Response,next:NextFunction ) => {
  // key
  // isTop
  validationResult_FN( req,res );

  let promise = modle_doctor.findOne( { key:req.body.key } ).exec();
  promise.then(( data:doctorIf )=>{
    console.log( data );
    data.isTop = req.body.isTop;
    if( data.isTop ){
      data.topTime = new Date();
    }else{
      data.topTime = undefined;
    }
    data.save(( err )=>{
      if( err )return next(err);
      res.send({
        status:200,
        message:data.isTop?'置顶成功':'取消置顶成功'
      })
    })
  })

}

export let findOne_examine = [
  body( 'key' ).isNumeric().isLength( { min:1,max:10 } )
]

export let findOne = ( req:Request,res:Response,next:NextFunction ) => {

  validationResult_FN( req,res );

  let promise = modle_doctor.findOne( { key:req.body.key } ).exec();
  promise.then(( data:doctorIf )=>{

    let arr:any[] = [];
    data.doctorGoodat.split(',').forEach(( e,i )=>{
      arr.push( { typeId:e } )
    })

    res.send({
      status:200,
      message:'获取医生信息成功',
      data:{
        ymDoctor:data,
        zizhiList:JSON.parse(data.doctorZizhiList),
        typeList:arr
      }
    })

  })
}

export let editDoctor = ( req:Request,res:Response,next:NextFunction ) => {

  let promise = modle_doctor.findOne( { key:req.body.key } ).exec();
  promise.then(( data:doctorIf )=>{
    console.log( data );
    for( let key in req.body ){
      data[key] = req.body[key]
    }
    data.save(( err:Error )=>{
      if( err )return next( err );
      res.send({
        status:200,
        message:'编辑医生成功'
      })
      res.end();
    })
  })

}

export let save_Img = ( req:Request,res:Response,next:NextFunction ) => {
  // console.log( req.file );
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

export let delete_Img_examine = [
  body( 'fileName' ).isLength({ min:5,max:100 })
]

export let delete_Img = ( req:Request,res:Response,next:NextFunction ) => {

  let data:imgIf = {};
  fs.unlink(req.body.fileName,( err:Error )=>{
    if( err ) return console.log( err );
    res.send({
      status:200,
      message:'删除图片成功'
    });
    res.end();
  })

}
