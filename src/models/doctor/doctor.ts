import mongoose from 'mongoose';

export interface doctorIf extends mongoose.Document{

}

let doctorS = new mongoose.Schema({

})

export let modle_doctor = mongoose.model( 'doctor',doctorS );
