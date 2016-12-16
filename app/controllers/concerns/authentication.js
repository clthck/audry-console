'use strict';

module.exports = {
  do: function *(next) {
    if (this.isAuthenticated()) {
      yield next;
    } else {
      this.redirect(this.router.url('login'));
    }
  }
};
