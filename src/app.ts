

let config = require('config');
var Dotenv = require('dotenv');
var mongoose = require('mongoose');
//...

var express = require('express');
var router = express.Router();

var app = new express;

app.listen(2000);

mongoose.connect('mongodb://localhost/myblog');//连接上 myblog 数据库

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
})

var model = mongoose.model('user', userSchema);





app.get('/', function(req:any, res:any) {
    res.send('come on!');
    res.end();
});

app.get('/add',function( req:any, res:any ){
  var newUser = new model({
    username:'dhahaha'
  })
  newUser.save(( err:any,data:any )=>{
    if( err ){
      console.log(err);
      return;
    }
    console.log(data);
    res.end();
  })
})

app.get('/list', function(req:any, res:any, next:any) {
  model.find(function(err:any, data:any){
    if(err){ return console.log(err) }
    console.log(data);
    // res.render('UserList',{
    //   user: data
    // })
    res.end();
  })
});

app.get('/edit',( req:any,res:any )=>{
  let id:string = '5acf15a10f54112fb40a5f76';
  model.findById( id ,( err:any,data:any )=>{
    if(err){
      console.log(err);
      return
    }
    data.username = 'heiheiheiheihei'
    data.save(( err:any )=>{
      if( err ){
        // 返回首页
        // res.redirect('/users/list');
        console.log(err);
        return;
      }
      res.send('嘿嘿嘿');
      res.end();
    });
  })
})

app.get('/findsth',( req:any,res:any )=>{
  model.findOne( {username:'heiheiheiheihei'},( err:any,data:any )=>{
      if(err) return console.log( err );
      console.log( data );
      data.username = 'hahahaha';
      data.save(( err:any )=>{
        if( err ) return console.log( err );
      })
      res.end();
  })
})

app.get('/last',( req:any,res:any )=>{
  model.find({ username:'dhahaha' },( err:any,data:any )=>{
    if( err ) return console.log( err );
    console.log( data );
    res.end();
  })
})

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
