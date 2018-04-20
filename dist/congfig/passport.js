"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const user_1 = __importDefault(require("../models/user"));
const LocalStrategy = passport_local_1.default.Strategy;
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => {
    user_1.default.findById(id, (err, user) => {
        done(err, user);
    });
});
exports.LocalStrategyMethod = () => {
    return new LocalStrategy({
        usernameField: 'account',
        passwordField: 'password',
        session: false
    }, function (username, password, done) {
        user_1.default.findOne({ account: username }, function (err, user) {
            if (err) {
                console.log('err');
                return done(err);
            }
            if (!user) {
                console.log('!user');
                return done(null, false, { message: "没有此用户哦！" });
            }
            user.comparePassword(password, (err, isMatch) => {
                // 字段没有用bcrypt-nodejs加密时，进行对比会抛处err；
                if (err) {
                    console.log('hi');
                    return done(err);
                }
                if (isMatch) {
                    return done(undefined, user, { message: "登录成功！" });
                }
                return done(undefined, false, { message: "您输入的密码有误！" });
            });
            // return done(null, user);
        });
    });
};
exports.isAuthenticated = (req, res, next) => {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
        return next();
    }
    res.send('<script>alert("123")</script>');
};
//# sourceMappingURL=passport.js.map