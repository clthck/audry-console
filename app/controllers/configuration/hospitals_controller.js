'use strict';

const { Hospital } = require('audry-common').models;
const CloudinaryService = require('../../services/cloudinary_service.js');

module.exports = {
  ensureHospitalInfoExists: async (ctx, next) => {
    if ( (ctx.controller.name === 'configuration/hospitals'
      && ['new', 'create'].includes(ctx.controller.actionName))
      || await Hospital.count() > 0 ) {
      return next();
    } else {
      ctx.redirect(ctx.router.newHospitalPath);
    }
  },

  new: async (ctx, next) => {
    const hospital = await Hospital.findOne();
    if (hospital) {
      ctx.redirect(ctx.router.editHospitalPath(hospital.id));
    } else {
      ctx.render('configuration/hospitals/new', { title: 'Hospital Configuration' });
      return next();
    }
  },

  create: async (ctx, next) => {
    const { files, fields } = await ctx.req.getAsyncBusboyBody();
    const fileUrls = await CloudinaryService.upload(files);
    Hospital.create(Object.assign({}, fields, fileUrls));
    ctx.redirect(ctx.router.rootPath);
  },

  edit: async (ctx, next) => {
    const hospital = await Hospital.findById(ctx.params.id);
    ctx.render('configuration/hospitals/edit', { hospital });
    return next();
  },

  update: async (ctx, next) => {
    const hospital = await Hospital.findById(ctx.params.id);
    const { files, fields } = await ctx.req.getAsyncBusboyBody();
    const fileUrls = await CloudinaryService.upload(files, hospital);

    hospital.update(Object.assign({}, fields, fileUrls));
    ctx.redirect(ctx.router.editHospitalPath(hospital.id));
  }
};
