import { Request,Response,NextFunction } from 'express';
import { doctorIf,modle_doctor } from '../models/doctor/doctor'

export let save = ( req:Request,res:Response,next:NextFunction ) => {

}

interface imgIf{
  status?:number,
  data?:string
}

export let save_Img = ( req:Request,res:Response,next:NextFunction ) => {
  // console.log( req.file );
  let data:imgIf = {};
  if( req.file.path ){
    data.status = 200;
    data.data = req.file.path;
  }else{
    data.status = 500;
    data.data = 'some error';
  }
  res.send( data );
  res.end();
}
