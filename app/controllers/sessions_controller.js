'use strict';

const passport = require('koa-passport');

module.exports = {
  new: (ctx, next) => {
    if (ctx.isAuthenticated()) {
      ctx.redirect('/');
    } else {
      ctx.render('sessions/new');
    }
    return next();
  },

  create: (ctx, next) => {
    return passport.authenticate('local', (err, user, info, status) => {
      if (user === false) {
        ctx.flash('error', info.message);
        ctx.redirect(ctx.router.url('login'));
      } else {
        ctx.redirect('/');
        return ctx.login(user);
      }
    })(ctx, next);
  },

  destroy: (ctx, next) => {
    ctx.logout();
    ctx.redirect(ctx.router.url('login'));
    return next();
  }
};
