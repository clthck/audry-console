'use strict';

const { models } = require('audry-common');
const { Hospital, ServiceCategory, Service, NurseStation, WardServiceCategory, WardService } = models;
const sequelize = Hospital.sequelize;

module.exports = {
  index: async (ctx, next) => {
    const hospital = await Hospital.findOne();
    const nurseStations = await NurseStation.findAll({
      where: { hospitalId: hospital.id },
      include: [NurseStation.associations.ward]
    });
    const wards = nurseStations.map(e => e.ward).sort((x, y) => x.name.localeCompare(y.name));
    const currentWard = wards.find(e => e.id == ctx.query.wardId) || wards[0];
    const serviceCategories = await ServiceCategory.findAll({
      include: [{
        model: Service, as: 'services',
        include: [{
          model: WardService, as: 'serviceWards', required: false,
          where: { wardId: currentWard.id }
        }]
      }, {
        model: WardServiceCategory, as: 'serviceCategoryWards', required: false,
        where: { wardId: currentWard.id }
      }],
      where: {
        hospitalId: hospital.id,
      }
    });

    ctx.render('configuration/wards_service_categories/index', {
      wards, currentWard, serviceCategories,
      configOptionTitle: 'Service Levels',
      showWardDropdown: true
    });
    return next();
  },

  bulkUpdate: async (ctx, next) => {
    const { wardId } = ctx.query;
    const { fields } = await ctx.req.getAsyncBusboyBody();
    const categories = JSON.parse(fields.categories);

    categories.forEach(category => {
      WardServiceCategory.upsert(Object.assign({}, category.serviceCategoryWards[0], {
        wardId, serviceCategoryId: category.id
      }), {
        fields: ['id', 'serviceCategoryId', 'wardId', 'level1', 'level2', 'level3']
      });

      category.services.forEach(service => {
        WardService.upsert(Object.assign({}, {
          wardId, serviceId: service.id, visible: false
        }, service.serviceWards[0]), {
          fields: ['id', 'wardId', 'serviceId', 'level1', 'level2', 'level3', 'visible']
        });
      });
    });

    ctx.body = 'success';
    return next();
  }
};
