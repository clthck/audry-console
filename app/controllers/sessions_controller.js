'use strict';

const passport = require('koa-passport');
const qs = require('querystring');
const jwt = require('jsonwebtoken');

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
        const payload = { id: user.id };
        const rememberMeToken = jwt.sign(payload, process.env.JWT_SHARED_SECRET, { expiresIn: '1 hour' });
        ctx.cookies.set('remember_me', rememberMeToken, { maxAge: 1 * 60 * 60 * 1000 });
        ctx.redirect(redirectTo || ctx.router.rootPath);
        return ctx.login(user);
      }
    })(ctx, next);
  },

  destroy: (ctx, next) => {
    ctx.cookies.set('remember_me', null, { expires: new Date(1) });
    ctx.logout();
    ctx.redirect(ctx.router.loginPath);
    return next();
  }
};
