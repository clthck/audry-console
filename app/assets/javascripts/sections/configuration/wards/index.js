'use strict';

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import WardConfig from 'components/WardConfig.js';

export default domRoot => {
  const { wards } = SHARED_DATA;

  $('#nav_item_save, #nav_item_back').hide();

  ReactDOM.render(
    <WardConfig wards={wards} />,
    document.getElementById('wards_config')
  );
};
