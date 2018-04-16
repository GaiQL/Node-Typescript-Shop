

let config = require('config');
// var Dotenv = require('dotenv');
// var mongoose = require('mongoose');
// import { Request, Response, NextFunction } from 'express';  // import @types?
//...
import express from 'express';
import mongoose from 'mongoose';
import Dotenv from 'dotenv';
import lusca from "lusca";

// var express = require('express');
var router = express.Router();

var app = express();

app.listen(2000);

mongoose.connect('mongodb://localhost/myblog');//连接上 myblog 数据库
mongoose.Promise = require('bluebird');   //Promise化
mongoose.connection.on("error", function ( error:Error ) {
  console.log("数据库连接失败：" + error)
})
mongoose.connection.on("open", function () {
  console.log("数据库连接成功")
})

app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));



import * as Fn_Add from './controllers/add';
import * as Fn_Home from './controllers/index';



app.get('/',Fn_Home.Home);

app.get('/add',Fn_Add.Add);
app.get('/find',Fn_Add.findAll);
app.get('/findOne',Fn_Add.findOne);


// app.get('/list', function(req:any, res:any, next:any) {
//   model.find(function(err:any, data:any){
//     if(err){ return console.log(err) }
//     console.log(data);
//     // res.render('UserList',{
//     //   user: data
//     // })
//     res.end();
//   })
// });
//
// app.get('/edit',( req:any,res:any )=>{
//   let id:string = '5acf15a10f54112fb40a5f76';
//   model.findById( id ,( err:any,data:any )=>{
//     if(err){
//       console.log(err);
//       return
//     }
//     data.username = 'heiheiheiheihei'
//     data.save(( err:any )=>{
//       if( err ){
//         // 返回首页
//         // res.redirect('/users/list');
//         console.log(err);
//         return;
//       }
//       res.send('嘿嘿嘿');
//       res.end();
//     });
//   })
// })
//
// app.get('/findsth',( req:any,res:any )=>{
//   model.findOne( {username:'heiheiheiheihei'},( err:any,data:any )=>{
//       if(err) return console.log( err );
//       console.log( data );
//       data.username = 'hahahaha';
//       data.save(( err:any )=>{
//         if( err ) return console.log( err );
//       })
//       res.end();
//   })
// })
//
// app.get('/last',( req:any,res:any )=>{
//   model.find({ username:'dhahaha' },( err:any,data:any )=>{
//     if( err ) return console.log( err );
//     console.log( data );
//     res.end();
//   })
// })

var dbConfig = config;
// db.connect(dbConfig, ...);
// console.log( dbConfig );
//
// console.log( process.env.NODE_ENV );
// Dotenv.config({ path: ".env.example" });
//
//
// console.log( process.env["MONGODB_URI"] );

// console.log( );



// if (config.has('optionalFeature.detail')) {
//   var detail = config.get('optionalFeature.detail');
//   //...
// }'
