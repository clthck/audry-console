'use strict';

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import ServiceLevelConfig from 'components/ServiceLevelConfig';

export default domRoot => {
  const { router, serviceCategories } = SHARED_DATA;

  $('#nav_item_back a').attr('href', router.rootPath);

  ReactDOM.render(
    <ServiceLevelConfig categories={serviceCategories} />,
    document.getElementById('service_levels_config')
  );
};
