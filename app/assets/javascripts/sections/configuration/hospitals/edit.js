'use strict';

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import ImageUpload from 'components/ImageUpload.js';

export default domRoot => {
  const { hospital, navItemBackHref } = SHARED_DATA;

  $('#nav_item_save a').data('target-form', $('#hospital_form'));
  $('#nav_item_back a').attr('href', navItemBackHref);

  ReactDOM.render(
    <div>
      <ImageUpload
        title="Dark Background"
        placeholderImage={hospital.logoDarkFileName}
        name="logoDarkFileName"
        className="mb-1"
        previewDivClassName="bg-inverse"
      />
      <ImageUpload
        title="Light Background"
        placeholderImage={hospital.logoLightFileName}
        name="logoLightFileName"
      />
    </div>,
    document.getElementById('logo-upload-container')
  );
};
