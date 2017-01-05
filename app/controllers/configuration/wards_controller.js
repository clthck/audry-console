'use strict';

const { Ward, NurseStation, Hospital } = require('audry-common').models;

module.exports = {
  index: async (ctx, next) => {
    const wards = await Ward.findAll({
      order: [ ['name', 'ASC'] ]
    });
    ctx.render('configuration/wards/index', { wards, configOptionTitle: 'Wards' });
    return next();
  },

  create: async (ctx, next) => {
    const hospital = await Hospital.findOne();
    const values = Object.assign({}, ctx.request.body, {
      nurseStation: {
        hospitalId: hospital.id
      }
    });
    const ward = await Ward.create(values, {
      include: [Ward.associations.nurseStation]
    });
    ctx.body = ward;
    return next();
  },

  show: async (ctx, next) => {
    const { id } = ctx.params;
    const ward = await Ward.findById(id);
    ctx.body = ward;
    return next();
  }
};
