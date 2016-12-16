'use strict';

module.exports = {
  index: function *(next) {
    this.render('activities/index');
    yield next;
  }
};
