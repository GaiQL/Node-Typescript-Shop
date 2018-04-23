import { Request,Response,NextFunction } from 'express';
import { SthModel } from '../models/sth';
import { default as model,UserModelIF } from '../models/user';
// import ejs from 'ejs';

export let account:string = '';

export let Index = ( req:Request,res:Response ) => {

  res.type('html');
  res.render('trunk');

}

export let Home = ( req:Request,res:Response,next:NextFunction ) => {

  const account = process.env["ACCOUNT"];
  model.findOne({ account },{_id:0,password:0},( err:Error,data:UserModelIF )=>{
    if( err ){ return next(err) };
    console.log(data);
    res.send({
      status:200,
      data,
      message:'获取成功！'
    })
    res.end();
  });

}
