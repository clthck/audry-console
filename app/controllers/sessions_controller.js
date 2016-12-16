'use strict';

const passport = require('koa-passport');

module.exports = {
  new: function *(next) {
    if (this.isAuthenticated()) {
      this.redirect('/');
    } else {
      this.render('sessions/new');
    }
  },

  create: () => {
    return passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    })
  },

  destroy: function *(next) {
    this.session = null;
    this.redirect(this.router.url('login'));
    yield next;
  }
};
