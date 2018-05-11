import mongoose from 'mongoose';
import { NextFunction } from 'express';
import { goodItemIF,model_goodItem } from '../goodItem/goodItem';

export interface doctorIf extends mongoose.Document{
  readonly key:number;
  doctorName: string;
  doctorSex: number;
  doctorCountry: string;
  doctorJob: string;
  doctorZizhi:string;
  jobStartTime: Date;
  doctorEducation: string;
  bdId: number;
  doctorGoodat: string;
  doctorInfo: string;
  hospitalId: number;
  doctorPhoto: JSON;
  doctorZizhiList: JSON;
  actionTime: Date;
  doctorUpshelf: number;
  topTime: Date;
  doctorCheckState: number;
  goodat: string[];
}

let doctorS = new mongoose.Schema({

  key:Number,
  doctorName:String,
  doctorSex:Number,
  doctorCountry:String,
  doctorJob:String,
  doctorZizhi:String,
  jobStartTime:Date,
  doctorEducation:String,
  bdId:Number,
  doctorGoodat:String,
  doctorInfo:String,
  hospitalId:Number,
  doctorPhoto:JSON,
  doctorZizhiList:JSON,

  actionTime: { type:Date,default:Date.now()　},
  doctorUpshelf: { type:Number,default:1 },
  isTop: { type:Number,default:0 },
  topTime: Date,
  doctorCheckState: { type:Number,default:0 },
  goodat: String

},{ timestamps:true })

doctorS.pre('save',function( next:NextFunction ){

  let data:any = this;
  const findArr : any[] = [];
  data.doctorGoodat.split(',').forEach(( e:string,i:number )=>{
    findArr.push( { key:e } )
  })

  let goodatArr : string[] = [];
  let promise = model_goodItem.find({ $or:findArr }).exec();
  promise.then(( typedata:goodItemIF[] ) => {
    typedata.forEach(( e,i )=>{
      goodatArr.push( e.typeName );
    })
    data.goodat = goodatArr.join(',');
    console.log( data );
    next();
  })

})

export let modle_doctor = mongoose.model( 'doctor',doctorS );
