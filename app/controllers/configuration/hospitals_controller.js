'use strict';

const asyncBusboy = require('async-busboy');
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

  new: (ctx, next) => {
    ctx.render('hospitals/new', { title: 'Hospital Configuration' });
    return next();
  },

  create: async (ctx, next) => {
    const { files, fields } = await asyncBusboy(ctx.req);
    const fileUrls = await CloudinaryService.upload(files);

    Object.assign(fields, {
      logoLightFileName: fileUrls.logoLightFile,
      logoDarkFileName: fileUrls.logoDarkFile
    });
    await Hospital.create(fields);
    ctx.redirect(ctx.router.rootPath);
  }
};
