import { Request,Response,NextFunction } from 'express';
import { SthModel } from '../models/sth';


export let Home = ( req:Request,res:Response ) => {
  let newHome = new SthModel({
    age:'123'
  })
  newHome.save((err:Error)=>{
    if(err) return console.log(err);
    console.log('添加成功');
    // newHome.find(( err:Error,data: )=>{
    //
    // })
  })
  res.send( 'come on!' );
  res.end();
}
