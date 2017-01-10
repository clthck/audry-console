'use strict';

const { models, CloudinaryService } = require('audry-common');
const { Hospital, ServiceCategory, Service } = models;

module.exports = {
  index: async (ctx, next) => {
    const hospital = await Hospital.findOne();
    const serviceCategories = await ServiceCategory.findAll({
      where: { hospitalId: hospital.id },
      include: [ServiceCategory.associations.services]
    });
    ctx.render('configuration/service_categories/index', {
      serviceCategories,
      configOptionTitle: 'Services'
    });
    return next();
  },

  bulkCreate: async (ctx, next) => {
    const { files, fields } = await ctx.req.getAsyncBusboyBody();
    const { id: categoryIds, name: categoryNames, service: services } = fields;

    // Deletes all categories that don't exist in the form data.
    const existingCategoryIds = categoryIds.filter(e => e);
    ServiceCategory.destroy({
      where: existingCategoryIds.length > 0 ? { id: { $not: existingCategoryIds } } : {}
    });

    const hospital = await Hospital.findOne();
    const fileUrls = await CloudinaryService.upload(files);
    let newServices, serviceIds, existingServiceIds, servicesToDestroy;
    
    for (let i = 0, n = categoryIds.length; i < n; i ++) {
      let id = categoryIds[i];
      serviceIds = (services && services.id[i]) || [];

      if (id) {
        // Updates existing service category data.
        ServiceCategory.update({ name: categoryNames[i] }, { where: { id } });

        existingServiceIds = serviceIds.filter(e => e);
        servicesToDestroy = await Service.findAll({
          where: Object.assign({
            categoryId: id
          }, existingServiceIds.length > 0 ? { id: { $not: existingServiceIds } } : {})
        });
        servicesToDestroy.forEach(s => CloudinaryService.destroy(s.icon));
        Service.destroy({ where: { id: servicesToDestroy.map(s => s.id) } });

        newServices = [];
        serviceIds.forEach((serviceId, j) => {
          if (serviceId) {
            Service.update({
              categoryId: id,
              name: services.name[i][j],
              icon: fileUrls[`service[icon][${i}][${j}]`] || services.icon[i][j],
              description: services.description[i][j],
              notificationMessage: services.notificationMessage[i][j],
              launchAppUrl: services.launchAppUrl[i][j]
            }, {
              where: { id: serviceId }
            });
          } else {
            newServices.push({
              categoryId: id,
              name: services.name[i][j],
              icon: fileUrls[`service[icon][${i}][${j}]`],
              description: services.description[i][j],
              notificationMessage: services.notificationMessage[i][j],
              launchAppUrl: services.launchAppUrl[i][j]
            });
          }
        });
        Service.bulkCreate(newServices);
      }
      else {
        // Creates a new service category with services data.
        newServices = [];
        serviceIds.forEach((serviceId, j) => {
          newServices.push({
            name: services.name[i][j],
            icon: fileUrls[`service[icon][${i}][${j}]`],
            description: services.description[i][j],
            notificationMessage: services.notificationMessage[i][j],
            launchAppUrl: services.launchAppUrl[i][j]
          });
        });
        ServiceCategory.create({
          name: categoryNames[i],
          hospitalId: hospital.id,
          services: newServices
        }, {
          include: [ServiceCategory.associations.services]
        });
      }
    }

    ctx.body = 'success';
    return next();
  }
};
