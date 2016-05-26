'use strict';

const request = require('request');

/**
 * Download a photo then convert its data to css base64 format.
 * @param {String} url - The photo url.
 * @param {Function} cb - The callback.
 */
function downloadPhotoBase64(url, cb) {
  request({ url, encoding: null }, (err, res, body) => {
    if (!res || res.statusCode != 200) {
      return cb(new Error(`Failed to download "${url}"`));
    }
    const ct = res.headers['content-type'];
    const data = new Buffer(body).toString('base64');
    const base64 = `url("data:${ct};base64,${data}")`;
    cb(null, base64);
  });
}

module.exports = downloadPhotoBase64;
