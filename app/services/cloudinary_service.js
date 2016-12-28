'use strict';

const cloudinary = require('cloudinary');

module.exports = class CloudinaryService {
  static async upload(files) {
    const urls = {};
    let result;

    for (const file of files) {
      result = await cloudinary.uploader.upload(file.path);
      urls[file.fieldname] = result.secure_url;
    }

    return urls;
  }
};
