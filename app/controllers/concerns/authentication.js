'use strict';

module.exports = {
  do: (ctx, next) => {
    if (ctx.isAuthenticated()) {
      return next();
    } else {
      ctx.redirect(ctx.router.url('login'));
    }
  }
};
