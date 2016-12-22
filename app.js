'use strict';

require('dotenv').config();

const Koa = require('koa');
const convert = require('koa-convert');
const Pug = require('koa-pug');
const session = require('koa-session');
const parseBody = require('koa-body');
const flash = require('koa-connect-flash');
const passport = require('./config/initializers/passport.js')();
const initRoutes = require('./config/initializers/routes.js');

// Initializes koa.js app.
const app = new Koa();

// Configures pug template engine
const pug = new Pug({
  viewPath: './app/views',
  locals: {},
  app: app
});

app.keys = ['AUDRY WEB CONSOLE: WARNING!!! CLASSIFIED'];
app.use(convert(session(app)));

app.use(flash());
app.use(async (ctx, next) => {
  pug.locals.flash = ctx.flash();
  return next();
});

app.use(parseBody());
app.use(passport.initialize);
app.use(passport.session);

initRoutes(app, pug);

app.listen(3000);
