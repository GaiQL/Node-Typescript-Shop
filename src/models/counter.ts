
import mongoose from "mongoose";
import { NextFunction } from 'express';

export interface userKeyIF extends mongoose.Document{
  last_key:number,
  type:string
}

var userKey = new mongoose.Schema({
  last_key:Number,
  type:{ type: String, unique: true }
})

var userKeyMD = mongoose.model('counter', userKey);

//userkey自增
export let getNextUserSequenceValue = ( type:string,next:NextFunction,callback?:( key:number )=>void ) => {

  //在这里放弃了promise,需要做一个返回值，但是promise貌似做不到...
  /*
      promise 不能返回值
      只能返回promise，因为它是异步的，外部要用就得 fn1().then(value => console.log(value)) 的方式拿到值
  */

  // 5ad9a85917dbc324205b6481  userlastKey
  let primise = userKeyMD.findOne({ type }).exec();
  primise
  .then(( data:userKeyIF )=>{
    let lastId:number = ++ data.last_key;
    data.last_key = lastId;
    return data.save();
   })
  .catch(( err:Error )=>{ if(err) return next(err) });

  return primise;

}
