

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
import ejs from 'ejs';
import session from "express-session";
import cookieParser from 'cookie-parser';
import mongo from "connect-mongo";

// http://ju.outofmemory.cn/entry/99459  passport好文；
import passport from "passport";
import passportLocal from "passport-local";
// import ueditor from 'ueditor';
let ueditor = require( 'ueditor' );
import { Request,Response,NextFunction } from 'express';

// var express = require('express');
// var router = express.Router();

import * as passportConfig from "./congfig/passport";
import * as Fn_Add from './controllers/add';
import * as Fn_Home from './controllers/index';
import * as Fn_Login from './controllers/login';
import { default as model,UserModelIF } from './models/user';
import fs from 'fs';

var app = express();

let listener = app.listen(2000);

Dotenv.config({ path: ".env.example" });

let MongoStore = mongo(session);

mongoose.connect('mongodb://localhost/myblog');//连接上 myblog 数据库
mongoose.Promise = require('bluebird');   //Promise化
mongoose.connection.on("error", function( error:Error ){
  console.log("数据库连接失败：" + error)
})
mongoose.connection.on("open", function(){
  console.log("数据库连接成功")
})






app.use( cookieParser( 'secret' ) );

app.use(compression());

// app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

app.engine('html', ejs.renderFile)  ;
app.set('views',__dirname +'/public')
app.set('view engine', 'html');

passport.use(passportConfig.LocalStrategyMethod());

// app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:true}))  //解析UTF-8的编码的数据。  会使用querystring库解析URL编码的数据
app.use(bodyParser.json())   //解析json数据



app.use(express.static(path.join(__dirname, "public"), { maxAge: 31557600000 }));
app.use('/img', express.static('img'));

// 潦草的跨域解决方案， cors设置白名单限制；
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", 'http://localhost:9098');
  res.header("Access-Control-Allow-Headers", "X_Requested_With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  res.setHeader('Access-Control-Allow-Credentials', 'true');  //设置为true，可以跨域带上cookie申请端
  next();
});

app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function(req:any, res:any, next:NextFunction) {
  // ueditor 客户发起上传图片请求
  console.log( req.query );
  if(req.query.action === 'uploadimage'){
    var foo = req.ueditor;
    var date = new Date();
    console.log( req.ueditor.filename )
    var imgname = req.ueditor.filename;

    var img_url = '/images/ueditor/';
    // res.setHeader('Content-Type', 'MIME');
    res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    res.setHeader('Content-Type', 'text/html');
  }
  //  客户端发起图片列表请求
  else if (req.query.action === 'listimage'){
    var dir_url = '/images/ueditor/';
    res.ue_list(dir_url);  // 客户端会列出 dir_url 目录下的所有图片
  }
  // 客户端发起其它请求
  else {

    // res.setHeader('Content-Type', 'application/json');
    fs.readFile('./dist/public/ueditor/ueditor.config.json',( err,data )=>{
      if( err ){ next(err) }
      res.jsonp( JSON.parse(data.toString()) )
    })
    // res.jsonp({"imageActionName": "uploadimage"});
    // res.end();
    // res.jsonp('/ueditor/ueditor.config.json');

}}));






app.use(session({
  secret: 'Random',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false,maxAge:5000000 },
  rolling:true,
  store:new MongoStore({
    url: 'mongodb://127.0.0.1:27017/session',
    touchAfter: 24 * 3600
  })
}));


app.use(passport.initialize());
app.use(passport.session());


app.get('/save',Fn_Login.save);

app.get('/login',Fn_Login.loginGet);
app.post('/login.do',Fn_Login.login);
// app.use( passportConfig.isAuthenticated );

app.get('/',Fn_Home.Index);
app.get('/homepage.do',Fn_Home.Home);
app.get('/add',Fn_Add.Add);
app.get('/find',Fn_Add.findAll);
app.get('/findOne',Fn_Add.findOne);
app.get('/findTime',Fn_Add.findTime);

app.use( '/order',require('./router/order') );
app.use( '/bd',require('./router/db') );
app.use( '/doctor',require('./router/doctor') );
app.use( '/image',require('./router/image') );
app.use( '/hospital',require('./router/hospital') );
app.use( '/area',require('./router/area') );
app.use( '/product',require('./router/product') );



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

//
//
// console.log( process.env["MONGODB_URI"] );

// console.log( );

// console.log( listener.address() )

// if (config.has('optionalFeature.detail')) {
//   var detail = config.get('optionalFeature.detail');
//   //...
// }'

export default app;
