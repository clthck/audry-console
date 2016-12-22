'use strict';

const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('audry-common').models;

module.exports = () => {
  passport.use(new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ where: { username } });
      if (user === null) {
        return done(null, false, { message: "User doesn't exist." });
      } else if (user.authenticate(password)) {
        return done(null, user);
      }
      return done(null, false, { message: 'Incorrect password.' });
    }
    catch (err) {
      return done(err);
    }
  }));

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      if (user == null) {
        done(new Error('Invalid user id.'));
      } else {
        done(null, user);
      }
    }
    catch (err) {
      return done(err, null);
    }
  });

  return {
    initialize: passport.initialize(),
    session: passport.session()
  }
};
