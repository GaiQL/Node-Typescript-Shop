import mongoose from "mongoose";

export interface verification_YIF extends mongoose.Document{

  time:Date | string

}
let verification_Y = new mongoose.Schema({

  time:{ type:Date }

},{
  read:'nearest'
});

export let model_verification_Y = mongoose.model('verification_Y',verification_Y);


/*



*/
