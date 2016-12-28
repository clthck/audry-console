'use strict';

const path = require('path');
const Router = require('koa-router');
const _ = require('underscore');
const passport = require('koa-passport');
const configRoutes = require('../routes.js');
const controllers = require('../../app/controllers');

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
  let controllerName;
  let actionFunc = null;

  const getController = (obj, actionFunc) => {
    let objKeys;
    let controllerName = '';

    for (const key in obj) {
      objKeys = Object.keys(obj[key]);
      if (objKeys.length > 0 && typeof obj[key][objKeys[0]] === 'function') {
        if (Object.values(obj[key]).includes(actionFunc)) {
          controllerName = key;
          break;
        }
      } else {
        controllerName = getController(obj[key], actionFunc);
        if (controllerName !== '') {
          controllerName = path.join(key, controllerName);
          break;
        }
      }
    }
    return controllerName;
  };

  for (const i in routers) {
    for (const { methods, regexp, stack } of routers[i].stack) {
      if (methods.includes(ctx.method) && regexp.test(ctx.path)) {
        actionFunc = _.last(stack);
        break;
      }
    }

    if (actionFunc) {
      controllerName = getController(controllers, actionFunc);
      if (controllerName !== '')  {
        return { name: controllerName, actionName: actionFunc.name };
      }
    }
  }
}

module.exports = (app, pug) => {
  // Handles error that occurs while processing requests,
  // defines `controller` helper method,
  // and use "remember-me" passport strategy.
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
    }, passport.authenticate('remember-me'));
  }

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
