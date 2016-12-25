'use strict';

module.exports = {
  new: (ctx, next) => {
    ctx.render('hospitals/new', { title: 'Hospital Configuration' });
    return next();
  }
};
