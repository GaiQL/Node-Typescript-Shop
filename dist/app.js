let config = require('config');
var Dotenv = require('dotenv');
var mongoose = require('mongoose');
//...
var express = require('express');
var router = express.Router();
var app = new express;
app.listen(2000);
mongoose.connect('mongodb://localhost/myblog'); //连接上 myblog 数据库
//    Mongoose 中的 Schema 和 Model  ;
//   Schema类型：
// String
// Number
// Date
// Buffer
// Boolean
// Mixed
// ObjectId
// Array
var userSchema = new mongoose.Schema({
    username: String,
    email: String
});
var model = mongoose.model('user', userSchema);
app.get('/', function (req, res) {
    res.send('come on!');
    res.end();
});
app.get('/add', function (req, res) {
    var newUser = new model({
        username: 'dhahaha'
    });
    newUser.save((err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(data);
        res.end();
    });
});
app.get('/list', function (req, res, next) {
    model.find(function (err, data) {
        if (err) {
            return console.log(err);
        }
        console.log(data);
        // res.render('UserList',{
        //   user: data
        // })
        res.end();
    });
});
app.get('/edit', (req, res) => {
    let id = '5acf15a10f54112fb40a5f76';
    model.findById(id, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        data.username = 'heiheiheiheihei';
        data.save((err) => {
            if (err) {
                // 返回首页
                // res.redirect('/users/list');
                console.log(err);
                return;
            }
            res.send('嘿嘿嘿');
            res.end();
        });
    });
});
app.get('/findsth', (req, res) => {
    model.findOne({ username: 'heiheiheiheihei' }, (err, data) => {
        if (err)
            return console.log(err);
        console.log(data);
        data.username = 'hahahaha';
        data.save((err) => {
            if (err)
                return console.log(err);
        });
        res.end();
    });
});
app.get('/last', (req, res) => {
    model.find({ username: 'dhahaha' }, (err, data) => {
        if (err)
            return console.log(err);
        console.log(data);
        res.end();
    });
});
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