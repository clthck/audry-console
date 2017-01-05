'use strict';

const { Room } = require('audry-common').models;

module.exports = {
  create: async (ctx, next) => {
    const { wardId } = ctx.params;
    const data = Object.assign({}, ctx.request.body, { wardId });
    const room = await Room.create(data);
    ctx.body = room;
    return next();
  },

  index: async (ctx, next) => {
    const { wardId } = ctx.params;
    if (isNaN(parseInt(wardId, 10))) {
      ctx.body = [];
    } else {
      const rooms = await Room.findAll({
        where: { wardId },
        order: [ ['name', 'ASC'] ]
      });
      ctx.body = rooms;
    }
    return next();
  },

  show: async (ctx, next) => {
    const { wardId, id } = ctx.params;
    const room = await Room.findById(id, { where: { wardId } });
    ctx.body = room;
    return next();
  }
};
