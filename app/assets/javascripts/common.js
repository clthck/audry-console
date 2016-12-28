'use strict';

import $ from 'jquery';

export default domRoot => {
  $('header').on('click', '#nav_item_save a', e => {
    $(e.target).data('target-form').submit();
  });
}
