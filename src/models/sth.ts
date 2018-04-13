
import mongoose from 'mongoose';


let Sth = new mongoose.Schema({
  age:Number
})

export let SthModel = mongoose.model('sth', Sth);
