'use strict';

const Router = require('koa-router');
const _ = require('underscore');
const configRoutes = require('../routes.js');
const controllers = require('../../app/controllers');
const authentication = require('../../app/controllers/concerns/authentication.js');

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

function defineControllerMethod(ctx) {
  let actionFunc = null;

  for (const i in routers) {
    for (const { methods, regexp, stack } of routers[i].stack) {
      if (methods.includes(ctx.method) && regexp.test(ctx.path)) {
        actionFunc = _.last(stack);
        break;
      }
    }

    if (actionFunc) {
      for (const controllerName in controllers) {
        if (controllers[controllerName][actionFunc.name] && controllers[controllerName][actionFunc.name] === actionFunc) {
          return () => ({ name: controllerName, actionName: actionFunc.name });
        }
      }
    }
  }
}

module.exports = (app, pug) => {
  // Handles error that occurs while processing requests and
  // defines `controller` helper method.
  for (const i in routers) {
    routers[i].use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {
        console.log(`ERROR: ${err.stack}`);
        ctx.render('error', { err });
      }
    }, (ctx, next) => {
      app.context.controller = pug.locals.controller = defineControllerMethod(ctx);
      return next();
    });
  }

  routers.authenticated.use(authentication.do);

  configRoutes(routers);

  for (const i in routers) {
    // Defines magic path helper properties.
    for (const layer of routers[i].stack) {
      if (layer.name) {
        routerMock[layer.name + 'Path'] = routers[i].url(layer.name);
      }
    }
  }

  app.context.router = pug.locals.router = routerMock;

  const unauthenticatedRoutesInfo = _.map(
    routers.unauthenticated.stack, layer => [layer.regexp, layer.methods]
  );

  app.use(routers.unauthenticated.routes());
  app.use(routers.unauthenticated.allowedMethods());
  app.use( (ctx, next) => {
    let requireAuthentication = false;
    for (const [regexp, methods] of unauthenticatedRoutesInfo) {
      if (methods.includes(ctx.method) && regexp.test(ctx.path)) {
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
