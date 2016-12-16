'use strict';

const Router = require('koa-router');
const mount = require('koa-mount');
const sessions = require('../app/controllers/sessions_controller.js');
const authentication = require('../app/controllers/concerns/authentication.js');
const activities = require('../app/controllers/activities_controller.js');

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

function configRoutes() {
  // Router for unauthenticated URLs.
  routers.unauthenticated
    .get('login', '/login', sessions.new)
    .post('/login', sessions.create());

  // Router for authenticated URLs.
  routers.authenticated
    .use(authentication.do)
    .get('/', activities.index)
    .get('logout', '/logout', sessions.destroy);
}

module.exports = (app, pug) => {
  app.context.router = routerMock;
  pug.locals.router = routerMock;

  configRoutes();

  app.use(routers.unauthenticated.routes());
  app.use(routers.unauthenticated.allowedMethods());
  app.use(mount('/', routers.authenticated.routes(), routers.authenticated.allowedMethods()));
};
