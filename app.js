'use strict';

const nodeEnv = process.env.NODE_ENV || 'dev';
let pry = nodeEnv === 'dev' ? require('pryjs') : null;

require('dotenv').config();

const fs = require('fs');
const path = require('path');
const koa = require('koa');
const Pug = require('koa-pug');
const session = require('koa-session');
const parseBody = require('koa-body');
const flash = require('koa-connect-flash');
const passport = require('./config/initializers/passport.js')();
const initRoutes = require('./config/routes.js');

// Initializes koa.js app.
const app = koa();

// Configures pug template engine
const pug = new Pug({
  viewPath: './app/views',
  locals: {},
  app: app
});

app.keys = ['AUDRY WEB CONSOLE: WARNING!!! CLASSIFIED'];
app.use(session({}, app));

app.use(flash());
app.use(function *(next) {
  pug.locals.flash = this.flash();
  yield next;
});

app.use(parseBody());

app.use(passport.initialize);
app.use(passport.session);

initRoutes(app, pug);

app.listen(3000);
