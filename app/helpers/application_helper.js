'use strict';

const path = require('path');
const cloudinary = require('cloudinary');
const _ = require('underscore');
const madison = require('madison');

module.exports = {
  customImage: (src, width, height) => cloudinary.url(path.parse(src).base, { width, height, secure: true, cdn_subdomain: true }),

  options_for_select: (dataSource, selectedValue) => {
    return dataSource.reduce((s, v) => s.concat(`<option ${v == selectedValue ? 'selected' : ''}>${v}</option>`), '');
  },

  stateNames: () => _.pluck(madison.states, 'abbr')
};
