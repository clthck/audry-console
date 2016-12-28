'use strict';

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import ImageUpload from 'components/ImageUpload.js';

export default domRoot => {
  $('#nav_item_save a').data('target-form', $('main form'));

  ReactDOM.render(
    <div>
      <ImageUpload
        title="Dark Background"
        placeholderImage="/assets/logo-placeholder-dark-bg.png"
        name="logoDarkFile"
        className="mb-1"
      />
      <ImageUpload
        title="Light Background"
        placeholderImage="/assets/logo-placeholder-light-bg.png"
        name="logoLightFile"
      />
    </div>,
    document.getElementById('logo-upload-container')
  );
};
