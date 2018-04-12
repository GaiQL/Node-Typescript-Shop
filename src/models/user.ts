
import mongoose from "mongoose";
import mongodb from "mongodb";


var userSchema = new mongoose.Schema({
    username: String,
    email: String
});

userSchema.pre('save',( next )=>{
  console.log( 'i save you' );
  next();
})


userSchema.methods.speak = ( sth:string ) => {
  console.log( `look ${ sth }` )
}


var model = mongoose.model('user', userSchema);

export default model;
