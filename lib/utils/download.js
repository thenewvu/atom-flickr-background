'use strict';

const request = require('request');

/**
 * Downloads an URL.
 * @param {String} url - The url.
 * @param {Function} cb - The callback.
 */
function download(url, cb) {
  request({ url, encoding: null }, (err, res, data) => {
    if (err) return cb(err);
    if (res && res.statusCode == 200) {
      const ct = res.headers['content-type'];
      cb(null, ct, data);
    } else {
      cb(new Error(`Failed to download "${url}"`));
    }
  });
}

module.exports = download;
