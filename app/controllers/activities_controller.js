'use strict';

const { Role } = require('audry-common').models;

module.exports = {
  index: async (ctx, next) => {
    const userRoles = await ctx.state.user.getRoles({ include: [Role.associations.apps] });
    let apps = [];
    userRoles.map(role => apps = apps.concat(role.apps));
    ctx.render('activities/index', { apps });
    return next();
  }
};
