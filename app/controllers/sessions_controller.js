'use strict';

const passport = require('koa-passport');

module.exports = {
  new: (ctx, next) => {
    if (ctx.isAuthenticated()) {
      ctx.redirect(ctx.router.rootPath);
    } else {
      ctx.render('sessions/new');
    }
    return next();
  },

  create: (ctx, next) => {
    return passport.authenticate('local', (err, user, info, status) => {
      if (user === false) {
        ctx.flash('error', info.message);
        ctx.redirect(ctx.router.loginPath);
      } else {
        ctx.redirect(ctx.router.rootPath);
        return ctx.login(user);
      }
    })(ctx, next);
  },

  destroy: (ctx, next) => {
    ctx.logout();
    ctx.redirect(ctx.router.loginPath);
    return next();
  }
};
