import passport from "passport";
import passportLocal from "passport-local";
import {default as model,UserModelIF} from '../models/user';
import mongoose from 'mongoose';
import { Strategy } from 'passport-local';
import { Request,Response,NextFunction } from 'express';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  model.findById(id, (err, user:UserModelIF) => {
    done(err, user);
  });
});

export let LocalStrategyMethod = ():Strategy => {
  return new LocalStrategy({
      usernameField: 'account',
      passwordField: 'password',
      session: false
    },
    function(username, password, done) {
      model.findOne({ account: username }, function (err:mongoose.Error, user:UserModelIF) {

        if (err) { console.log('err');return done(err); }
        if (!user) { console.log('!user');return done( null,false ,{ message: "没有此用户哦！" } ); }

        user.comparePassword(password, (err: mongoose.Error, isMatch: boolean) => {
          // 字段没有用bcrypt-nodejs加密时，进行对比会抛处err；
          if (err) { console.log('hi');return done(err); }
          if (isMatch) {
            return done( undefined,user,{ message: "登录成功！" } );
          }
          return done( undefined,false,{ message: "您输入的密码有误！" } );
        });
        // return done(null, user);
      });
    }
  )
}

export let isAuthenticated = ( req:Request,res:Response,next:NextFunction ) => {
  console.log( req.isAuthenticated() );
  if( req.isAuthenticated() ){
    return next();
  }
  res.send('<script>alert("123")</script>');
}
