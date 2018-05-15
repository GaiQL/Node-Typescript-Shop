import mongoose from "mongoose";

interface areaIF{
    parentId: number;
    appShowState: number;
    areaName: string;
    isHotcity: number;
    orderNum: number;
    code: string;
    readonly key: number;
}

interface  cityIF{
    parentId: number;
    appShowState: number;
    areaName: string;
    children: areaIF[];
    isHotcity: number;
    orderNum: number;
    code: string;
    readonly key: number
}

export interface provinceIF extends mongoose.Document{
  readonly key:number;
  appShowState: number;
  areaName: string;
  children : cityIF[];
  isHotcity: number;
  orderNum: number;
  code: string;
}

let areaS = new mongoose.Schema({
  key:Number,
  appShowState: Number,
  areaName: String,
  children : [{
    parentId: Number,
    appShowState: Number,
    areaName: String,
    children: [{
      parentId: Number,
      appShowState: Number,
      areaName: String,
      isHotcity: Number,
      orderNum: Number,
      code: String,
      key: Number,
    }],
    isHotcity: Number,
    orderNum: Number,
    code: String,
    key: Number
  }],
  isHotcity: Number,
  orderNum: Number,
  code: String,
})

export let model_area = mongoose.model( 'area' , areaS );
