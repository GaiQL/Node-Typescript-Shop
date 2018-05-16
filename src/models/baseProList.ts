import mongoose from 'mongoose';

export interface baseProListIF extends mongoose.Document {
  restoreCycle: string;
  treatmentMethos: number;
  resultHold: string;
  appShowState: number;
  treatmentTimes: string;
  bigPrice: number;
  proSort: number;
  smallPrice: number;
  typeName: string;
  proName: string;
  productNum: number;
  STId: number;
  proBaike: string;
  FTId: number;
  proUseState: number;
  readonly key: number;
  proIntroduction: string;
}

let baseProListS = new mongoose.Schema({
  restoreCycle: String,
  treatmentMethos: Number,
  resultHold: String,
  appShowState: Number,
  treatmentTimes: String,
  bigPrice: Number,
  proSort: Number,
  smallPrice: Number,
  typeName: String,
  proName: String,
  productNum: Number,
  STId: Number,
  proBaike: String,
  FTId: Number,
  proUseState: Number,
  key: Number,
  proIntroduction: String,
  brandList:Array,
  normList:Array
})

export let model_baseProList = mongoose.model( 'baseProList',baseProListS );
