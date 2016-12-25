'use strict';

const passport = require('koa-passport');
const qs = require('querystring');

module.exports = {
  new: (ctx, next) => {
    const loginRedirect = ctx.query.redirectTo;

    if (ctx.isAuthenticated()) {
      ctx.redirect(loginRedirect || ctx.router.rootPath);
    } else {
      if (loginRedirect) {
        ctx.flash('loginRedirect', loginRedirect);
      }
      ctx.render('sessions/new');
    }
    return next();
  },

  create: (ctx, next) => {
    const redirectTo = ctx.flash('loginRedirect')[0];
    return passport.authenticate('local', (err, user, info, status) => {
      if (user === false) {
        ctx.flash('view.error', info.message);
        ctx.redirect(ctx.router.loginPath + '?' + qs.stringify({ redirectTo }));
      } else {
        ctx.redirect(redirectTo || ctx.router.rootPath);
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
