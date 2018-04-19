import passport from "passport";
import passportLocal from "passport-local";
import {default as model,UserModelIF} from '../models/user';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  model.findById(id, (err, user:UserModelIF) => {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    model.findOne({ account: username }, function (err, user:UserModelIF) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      user.comparePassword(password, (err: Error, isMatch: boolean) => {
        if (err) { return done(err); }
        if (isMatch) {
          return done(undefined, user);
        }
        return done(undefined, false, { message: "Invalid email or password." });
      });
      return done(null, user);
    });
  }
));

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
