'use strict';

import $ from 'jquery';

export default domRoot => {
  $('header').on('click', '#nav_item_save a', e => {
    e.preventDefault();

    const $this = $(e.target);
    const $form = $this.data('target-form');
    if ($form[0].checkValidity()) {
      $this.addClass('disabled').text('Saving...');
      $('#nav_item_back a').addClass('disabled');
    }
    $form.submit();
  });
}
