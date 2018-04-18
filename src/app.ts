

let config = require('config');
// var Dotenv = require('dotenv');
// var mongoose = require('mongoose');
// import { Request, Response, NextFunction } from 'express';  // import @types?
//...
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import Dotenv from 'dotenv';
import lusca from "lusca";
import path from "path";
import compression from "compression";
import { Request,Response,NextFunction } from 'express';

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

app.use(compression());

app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));


// app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:false}))  //解析UTF-8的编码的数据。  会使用querystring库解析URL编码的数据
app.use(bodyParser.json())   //解析json数据

app.use(
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

// 潦草的跨域解决方案， cors设置白名单限制；
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});


import * as Fn_Add from './controllers/add';
import * as Fn_Home from './controllers/index';
import * as Fn_Login from './controllers/login';



app.get('/',Fn_Home.Home);

app.get('/add',Fn_Add.Add);
app.get('/find',Fn_Add.findAll);
app.get('/findOne',Fn_Add.findOne);
app.post('/login.do',Fn_Login.login);


// 错误处理
function logErrors( err:Error, req:Request, res:Response, next:NextFunction ) {
  console.error(err.stack);
  next(err);
}
function clientErrorHandler( err:Error, req:Request, res:Response, next:NextFunction ) {
  if (req.xhr) {
    //是ajax请求返回这个  500信息  不是的话交给下一个 500信息处理
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}
function errorHandler( err:Error, req:Request, res:Response, next:NextFunction ) {
  // res.status(500);
  res.send({
    status:500,
    message:err,
    data:null
  });
  res.end();
}
app.use( logErrors );
app.use( clientErrorHandler );
app.use( errorHandler );




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
