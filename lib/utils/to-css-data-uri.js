'use strict';

/**
 * Convert a buffer to CSS data uri format.
 * @param {String} ct - The content type.
 * @param {Buffer|String} data - The data.
 * @return {String} - The data uri.
 */
function toCSSDataUri(ct, data) {
  const base64 = new Buffer(data).toString('base64');
  return `url("data:${ct};base64,${base64}")`;
}

module.exports = toCSSDataUri;
