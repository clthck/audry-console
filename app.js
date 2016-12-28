'use strict';

require('dotenv').config();

const Koa = require('koa');
const convert = require('koa-convert');
const mount = require('koa-mount');
const Pug = require('koa-pug');
const session = require('koa-session2');
const parseBody = require('koa-body');
const serveSass = require('koa.sass');
const serveStatic = require('koa-static');
const flash = require('koa-connect-flash');
const methodOverride = require('koa-methodoverride');
const passport = require('./config/initializers/passport.js')();
const initRoutes = require('./config/initializers/routes.js');

// Initializes koa.js app.
const app = new Koa();

// Configures pug template engine
const pug = new Pug({
  viewPath: './app/views',
  noCache: app.env === 'development',
  app: app
});

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log(`ERROR: ${err.stack}`);
  }
});

app.use(session({ key: 'AUDRY_SESSION' }));

app.use(convert(flash()));
app.use(async (ctx, next) => {
  const flash = ctx.flash();
  let matches;

  pug.locals.flash = {};
  for (const flashKey in flash) {
    matches = flashKey.match(/^view\.(.+)/);
    if (matches) {
      pug.locals.flash[matches[1]] = flash[flashKey];
    } else {
      ctx.flash(flashKey, flash[flashKey]);
    }
  }
  return next();
});

app.use(parseBody());
app.use(passport.initialize);
app.use(passport.session);
app.use(methodOverride('_method'));

initRoutes(app, pug);

app.use(serveSass({
  mountAt: '/assets',
  src: './app/assets/stylesheets',
  dest: './.tmp/stylesheets'
}));
app.use(mount('/assets', serveStatic('./public/assets/webpack')));
app.use(mount('/assets', serveStatic('./node_modules')));
app.use(mount('/assets', serveStatic('./app/assets/images')));

app.listen(process.env.PORT || 3000);
