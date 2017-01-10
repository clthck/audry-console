'use strict';

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import ServiceConfig from 'components/ServiceConfig';

export default domRoot => {
  const { router, serviceCategories } = SHARED_DATA;

  $('#nav_item_back a').attr('href', router.rootPath);

  ReactDOM.render(
    <ServiceConfig categories={serviceCategories} />,
    document.getElementById('services_config')
  );
};
