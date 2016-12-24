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
    for (const i in routers) {
      if (routers[i].route(name)) {
        return routers[i].url(name);
      }
    }
    return routers.unauthenticated.url(name);
  }
};

module.exports = (app, pug) => {
  app.context.router = routerMock;
  pug.locals.router = routerMock;

  // Handles error that occurs while processing requests.
  for (const i in routers) {
    routers[i].use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {
        console.log(`ERROR: ${err.stack}`);
        ctx.render('error', { err });
      }
    });
  }

  configRoutes(routers);

  // Defines magic path helper properties.
  for (const i in routers) {
    for (const layer of routers[i].stack) {
      if (layer.name) {
        routerMock[layer.name + 'Path'] = routers[i].url(layer.name);
      }
    }
  }

  const unauthenticatedRoutesInfo =_.map(
    routers.unauthenticated.stack, layer => [layer.regexp, layer.methods]
  );

  app.use(routers.unauthenticated.routes());
  app.use(routers.unauthenticated.allowedMethods());
  app.use( (ctx, next) => {
    let requireAuthentication = false;
    for (const [regexp, methods] of unauthenticatedRoutesInfo) {
      if (regexp.test(ctx.path) && methods.includes(ctx.method)) {
        requireAuthentication = true;
        break;
      }
    }
    if (!requireAuthentication) {
      return next();
    }
  });
  app.use(routers.authenticated.routes());
  app.use(routers.authenticated.allowedMethods());
};
