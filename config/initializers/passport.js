'use strict';

const jwt = require('jsonwebtoken');
const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const RememberMeStrategy = require('passport-remember-me').Strategy;
const { User } = require('audry-common').models;

module.exports = () => {
  // LocalStrategy for basic form-based authentication
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
        return done(new Error('Invalid user id.'));
      } else {
        return done(null, user);
      }
    }
    catch (err) {
      return done(err, null);
    }
  });

  // RememberMeStrategy for "Remember me" cookie-based authentication
  passport.use(new RememberMeStrategy(async (token, done) => {
    try {
      const { id: userId } = jwt.verify(token, process.env.JWT_SHARED_SECRET);
      const user = await User.findById(userId);
      if (user === null) {
        return done(null, false);
      }
      return done(null, user);
    }
    catch (err) {
      console.log(`PASSPORT ERROR: ${err.stack}`);
      return done(null, false);
    }
  }, (user, done) => {
    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SHARED_SECRET, { expiresIn: '1 hour' });
    return done(null, token);
  }));

  return {
    initialize: passport.initialize(),
    session: passport.session()
  }
};
