'use strict';

import $ from 'jquery';
import commonModule from './common.js';

// Runs corresponding module per current controller#action route.
function runModule() {
  const path = $('body').data('route');
  try {
    require(`./sections/${path}`).default($(document.body));
  } catch (err) {
    // Just ignores error for now.
    console.error(err);
  }
}

$(document).ready(e => {
  commonModule($(document.body));
  runModule();
});
