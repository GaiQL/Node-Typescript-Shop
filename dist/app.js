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
// var Dotenv = require('dotenv');
// var mongoose = require('mongoose');
// import { Request, Response, NextFunction } from 'express';  // import @types?
//...
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const lusca_1 = __importDefault(require("lusca"));
const path_1 = __importDefault(require("path"));
// var express = require('express');
var router = express_1.default.Router();
var app = express_1.default();
app.listen(2000);
mongoose_1.default.connect('mongodb://localhost/myblog'); //连接上 myblog 数据库
mongoose_1.default.Promise = require('bluebird'); //Promise化
mongoose_1.default.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});
mongoose_1.default.connection.on("open", function () {
    console.log("数据库连接成功");
});
app.use(lusca_1.default.xframe("SAMEORIGIN"));
app.use(lusca_1.default.xssProtection(true));
// app.use(express.static('public'));
app.use(express_1.default.static(path_1.default.join(__dirname, "public"), { maxAge: 31557600000 }));
// 跨域解决方案， cors设置白名单限制；
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
const Fn_Add = __importStar(require("./controllers/add"));
const Fn_Home = __importStar(require("./controllers/index"));
app.get('/', Fn_Home.Home);
app.get('/add', Fn_Add.Add);
app.get('/find', Fn_Add.findAll);
app.get('/findOne', Fn_Add.findOne);
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