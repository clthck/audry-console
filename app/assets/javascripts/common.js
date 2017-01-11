'use strict';

import $ from 'jquery';

function highlightCurrentListItemInDropdown() {
  this
    .next('.dropdown-menu')
    .find('a')
    .each((i, e) => $(e).toggleClass('active', $(e).text() === this.text()));
};

export default domRoot => {
  $('#dropdown_config_button')::highlightCurrentListItemInDropdown();
  $('#dropdown_ward_select_button')::highlightCurrentListItemInDropdown();

  // Event handlers for nav items on configuration scope
  $('header').on('click', '#nav_item_save a', e => {
    e.preventDefault();

    const $this = $(e.target);
    const $form = $this.data('target-form');

    if ($form) {
      if ($form[0].checkValidity()) {
        $this.addClass('disabled').text('Saving...');
        $('#nav_item_back a').addClass('disabled');
      }
      $form.submit();
    }
    else {
      const func = $this.data('handler-func');
      if (func) {
        func(e);
      }
    }
  });
}
