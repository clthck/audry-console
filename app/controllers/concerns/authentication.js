'use strict';

const qs = require('querystring');

module.exports = {
  do: (ctx, next) => {
    if (ctx.isAuthenticated()) {
      return next();
    } else {
      ctx.redirect(ctx.router.loginPath + '?' + qs.stringify({ redirectTo: ctx.path }));
    }
  }
};
