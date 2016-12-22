'use strict';

const Router = require('koa-router');
const _ = require('underscore');
const configRoutes = require('../routes.js');

const routers = {
  unauthenticated: new Router(),
  authenticated: new Router(),
};

const routerMock = {
  url: name => {
    for (let routerType in routers) {
      if (routers[routerType].route(name)) {
        return routers[routerType].url(name);
      }
    }
    return routers.unauthenticated.url(name);
  }
};

module.exports = (app, pug) => {
  app.context.router = routerMock;
  pug.locals.router = routerMock;

  configRoutes(routers);

  app.use(routers.unauthenticated.routes());
  app.use(routers.unauthenticated.allowedMethods());

  const unauthenticatedRoutePaths = _.pluck(routers.unauthenticated.stack, 'path');
  app.use(function *(next) {
    if (unauthenticatedRoutePaths.includes(this.url) !== true) {
      yield next;
    }
  });

  app.use(routers.authenticated.routes());
  app.use(routers.authenticated.allowedMethods());
};
