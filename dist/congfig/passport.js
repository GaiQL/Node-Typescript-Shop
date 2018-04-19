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
passport_1.default.use(new LocalStrategy(function (username, password, done) {
    user_1.default.findOne({ account: username }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        user.comparePassword(password, (err, isMatch) => {
            if (err) {
                return done(err);
            }
            if (isMatch) {
                return done(undefined, user);
            }
            return done(undefined, false, { message: "Invalid email or password." });
        });
        return done(null, user);
    });
}));
// passport.use(new LocalStrategy({
//     usernameField: "account"
//   },
//   (account, password, done) => {
//     model.findOne({ account:account }, (err, user:UserModelIF) => {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(undefined, false, { message: `Account ${account} not found.` });
//       }
//       console.log( user.password );
//       user.comparePassword(password, (err: Error, isMatch: boolean) => {
//         if (err) { return done(err); }
//         if (isMatch) {
//           return done(undefined, user);
//         }
//         return done(undefined, false, { message: "Invalid email or password." });
//       });
//     });
//   }
// ));
//# sourceMappingURL=passport.js.map