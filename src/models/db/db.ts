import mongoose from "mongoose";
import { NextFunction } from 'express';
import moment from 'moment';

export interface dbIF extends mongoose.Document{
  readonly key:number;
  joinTime: Date;
  bdAddr: string;
  bdPhone: string;
  bdName: string;
}

let dbS = new mongoose.Schema({
  key:Number,
  joinTime: Date,
  bdAddr: String,
  bdPhone: String,
  bdName: String
})

dbS.pre('save',function( next:NextFunction ){
  let data:any
  data = this;
  console.log( this );
  data.joinTime = new Date();
  next();

})

export let model_db = mongoose.model( 'db' , dbS );
