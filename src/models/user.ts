
import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";

//    Mongoose 中的 Schema 和 Model  ; 查找时返回的 data 的接口，属性和方法；
export interface UserModelIF extends mongoose.Document{
  account: string,
  password: string,
  key:number,
  comparePassword:ComparePassword,

  checkStatusValue: String,
  accountTypeValue: String,
  checkStatus: Number,
  hospitalLogo: String,
  hospitalName: String,

  ziZhi: any[],
  hospStyle: number;
  authFileUrl: string;
  hospAddress: string;
  openTimeStart: string;
  openTimeOver: string;
  goodatProject: string;

  hospName: string;
  hospType: string;
  provinceId: number;
  provinceName: string;
  cityId: number;
  cityName:string;
  areaId: number;
  areaName: string;
  lat: string;
  lon: string;
  bdName: string;
  typeName: string;
  hospInfo: string;
  hospLogo: string;
  hospPhotos: string;
  contactTelephone: string;
  contactMobile: string;
  contactName: string;
  contactQQ: string;
  contactEmail: string;
  accountType: number;
  bankAccount: string;
  bankName: string;
  bankInfo: string;
  accountHolder: string;
  promiseList: [{
    promiseId:number;
    promiseTitle:string;
  }];
  [hei:string] :any;
  // speak 方法；
}

// unique: true  唯一 value;
// 拿到数据后会用定义的类型去存储，但是有些不能转换，boolean
// ---------只有在 Schema 中定义过的字段才可以被存储。
var userSchema = new mongoose.Schema({
    // email: { type: String, unique: true },
    account: String,
    password: String,
    key: Number,
    checkStatusValue: String,
    accountTypeValue: String,
    checkStatus: Number,
    hospitalLogo: String,
    hospitalName: String,

    ziZhi: Array,
    hospStyle: Number,
    authFileUrl: String,
    hospAddress: String,
    openTimeStart: String,
    openTimeOver: String,
    goodatProject: String,

    hospName: String,
    hospType: String,
    provinceId: Number,
    provinceName: String,
    cityId: Number,
    cityName:String,
    areaId: Number,
    areaName: String,
    lat: String,
    lon: String,
    bdName: String,
    typeName: String,
    hospInfo: String,
    hospLogo: String,
    hospPhotos: String,
    contactTelephone: String,
    contactMobile: String,
    contactName: String,
    contactQQ: String,
    contactEmail: String,
    accountType: Number,
    bankAccount: String,
    bankName: String,
    bankInfo: String,
    accountHolder: String,
    promiseList:[{
      promiseId:Number,
      promiseTitle:String
    }]

}, { timestamps: true })

userSchema.pre('save',function( next:any ){

  const user:any = this;

  //   ???????????  握草，就想不明白为什么this.account会报错！！！！！！  他说this类型是 mongoose.Document?????  // console.log( this.account )
  //  this的类型不应该是 UserModelIF 么；
  if( !this.isModified("password") )return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });

})

type ComparePassword = ( candidatePassword: string, cb: (err: any, isMatch: any ) => any ) => void;
let ComparePassword:ComparePassword = function ( candidatePassword, callback ){
  bcrypt.compare(candidatePassword,this.password,( err: mongoose.Error, isMatch: boolean )=>{
    callback( err,isMatch );
  });
}

// 返回的数据对象的方法；
userSchema.methods.comparePassword = ComparePassword;

var model = mongoose.model('user', userSchema);

export default model;
