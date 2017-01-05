'use strict';

import $ from 'jquery';

export default domRoot => {
  const $dropdownConfigButton = $('#dropdown_config_button');

  $dropdownConfigButton
    .next('.dropdown-menu')
    .find('a')
    .each((i, e) => $(e).toggleClass('active', $(e).text() === $dropdownConfigButton.text()));

  // Event handlers for nav items on configuration scope
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
