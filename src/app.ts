

let config = require('config');
// var Dotenv = require('dotenv');
// var mongoose = require('mongoose');
// import { Request, Response, NextFunction } from 'express';  // import @types?
//...
import express from 'express';
import mongoose from 'mongoose';
import Dotenv from 'dotenv';
import lusca from "lusca";
import path from "path";

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

// app.use(express.static('public'));

app.use(
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

// 跨域解决方案， cors设置白名单限制；
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



app.get('/',Fn_Home.Home);

app.get('/add',Fn_Add.Add);
app.get('/find',Fn_Add.findAll);
app.get('/findOne',Fn_Add.findOne);
app.get('/homepage.do',)


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
