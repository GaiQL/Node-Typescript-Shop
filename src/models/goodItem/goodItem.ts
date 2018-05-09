// {
//   "typeName": "眼部",
//   "parentId": 0,
//   "typeSort": 1,
//   "isLeaf": 0,
//   "typeLevel": 1,
//   "key": 1
// },

import mongoose from "mongoose";
import { NextFunction } from 'express';
import moment from 'moment';

export interface goodItemIF extends mongoose.Document{
  readonly key:number;
  typeName: string;
}

let goodItemS = new mongoose.Schema({
  key: Number,
  typeName: String
})

export let model_goodItem = mongoose.model( 'goodItem' , goodItemS );
