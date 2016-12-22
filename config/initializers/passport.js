'use strict';

const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const models = require('audry-common').models;
const User = models.User;

module.exports = () => {
  passport.use(new LocalStrategy( (username, password, done) => {
    User
      .findOne({ where: { username } })
      .then(user => {
        if (user == null) {
          return done(null, false, { message: "User doesn't exist." });
        }

        if (user.authenticate(password)) {
          return done(null, user);
        }

        return done(null, false, { message: 'Incorrect password.' });
      })
      .catch(err => done(err) );
  }));

  passport.serializeUser( (user, done) => done(null, user.id) );
  passport.deserializeUser( (id, done) => {
    User
      .findById(id)
      .then(user => {
        if (user == null) {
          done(new Error('Invalid user id.'));
        } else {
          done(null, user);
        }
      })
      .catch(err => done(err, null));
  });

  return {
    initialize: passport.initialize(),
    session: passport.session()
  }
};
