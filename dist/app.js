"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
let config = require('config');
var Dotenv = require('dotenv');
var mongoose = require('mongoose');
//...
const express_1 = __importDefault(require("express"));
// var express = require('express');
var router = express_1.default.Router();
var app = express_1.default();
app.listen(2000);
mongoose.connect('mongodb://localhost/myblog'); //连接上 myblog 数据库
mongoose.Promise = require('bluebird'); //Promise化
mongoose.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});
mongoose.connection.on("open", function () {
    console.log("数据库连接成功");
});
const Fn_Add = __importStar(require("./controllers/add"));
const Fn_Home = __importStar(require("./controllers/index"));
app.get('/', Fn_Home.Home);
app.get('/add', Fn_Add.Add);
app.get('/find', Fn_Add.findAll);
app.get('/findOne', Fn_Add.findOne);
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
//# sourceMappingURL=app.js.map