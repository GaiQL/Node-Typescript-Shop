import { Request,Response,NextFunction } from 'express';
import { doctorIf,modle_doctor } from '../models/doctor/doctor'
import multiparty from 'multiparty';

export let save = ( req:Request,res:Response,next:NextFunction ) => {

}

export let save_Img = ( req:Request,res:Response,next:NextFunction ) => {
  let form = new multiparty.Form();
  form.uploadDir = 'Img';
}
