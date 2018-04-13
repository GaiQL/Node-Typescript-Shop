
import mongoose from "mongoose";
//    Mongoose 中的 Schema 和 Model  ;

//   Schema类型：
// String
// Number
// Date
// Buffer
// Boolean
// Mixed
// ObjectId
// Array
// new mongoose.Schema

export interface UserModelIF extends mongoose.Document{
  email: string
  username: string,
  password: string,
  boolean: boolean
  // speak 方法；
}

// unique: true  唯一 value;
// 拿到数据后会用定义的类型去存储，但是有些不能转换，boolean
var userSchema = new mongoose.Schema({
    // email: { type: String, unique: true },
    email: String,
    username: String,
    password: Number,
    arr:Array,
    boolean:Boolean
})

userSchema.pre('save',( next:any )=>{
  console.log( 'i save you' );
  next();
})


userSchema.methods.speak = ( sth:string ) => {
  console.log( `look ${ sth }` )
}


var model = mongoose.model('user', userSchema);

export default model;
