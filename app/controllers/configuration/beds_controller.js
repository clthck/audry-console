'use strict';

const { Bed } = require('audry-common').models;

module.exports = {
  create: async (ctx, next) => {
    const { roomId } = ctx.params;
    const data = Object.assign({}, ctx.request.body, { roomId });
    const bed = await Bed.create(data);
    ctx.body = bed;
    return next();
  },

  index: async (ctx, next) => {
    const { roomId } = ctx.params;
    if (isNaN(parseInt(roomId, 10))) {
      ctx.body = [];
    } else {
      const beds = await Bed.findAll({
        where: { roomId },
        order: [ ['name', 'ASC'] ]
      });
      ctx.body = beds;
    }
    return next();
  },

  show: async (ctx, next) => {
    const { roomId, id } = ctx.params;
    const bed = await Bed.findById(id, { where: { roomId } });
    ctx.body = bed;
    return next();
  }
};
