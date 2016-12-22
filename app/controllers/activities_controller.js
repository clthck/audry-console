'use strict';

module.exports = {
  index: (ctx, next) => {
    ctx.render('activities/index');
    return next();
  }
};
