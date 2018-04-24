
import mongoose from "mongoose";
import { NextFunction } from 'express';

interface userKeyIF extends mongoose.Document{
  userLastKey:number
}

var userKey = new mongoose.Schema({
  userLastKey:Number
})

var userKeyMD = mongoose.model('counter', userKey);

//userkey自增
export let getNextUserSequenceValue = ( id:string,next:NextFunction ) => {

  //在这里放弃了promise,需要做一个返回值，但是primise貌似做不到...
  /*
      promise 不能返回值
      只能返回promise，因为它是异步的，外部要用就得 fn1().then(value => console.log(value)) 的方式拿到值
  */
  let lastId:number;
  userKeyMD.findById(id,( err:mongoose.Error,data:userKeyIF )=>{
    if( err ) return next(err);
    console.log();
    lastId = data.userLastKey;
  })

  return ++lastId;

}
