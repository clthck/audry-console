'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import ImageUpload from 'components/ImageUpload.js';

export default domRoot => {
  ReactDOM.render(
    <div>
      <ImageUpload title="Dark Background" placeholderImage="/assets/logo-placeholder-dark-bg.png" className="mb-1" />
      <ImageUpload title="Light Background" placeholderImage="/assets/logo-placeholder-light-bg.png" />
    </div>,
    document.getElementById('logo-upload-container')
  );
};
