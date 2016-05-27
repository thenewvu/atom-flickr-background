'use strict';

const DescUrlQualities = require('../const/desc-url-qualities');

/**
 * Find the best quality url from photo meta that responds from Flickr API.
 * @param {Object} - The photo meta.
 * @return {String} - The best quality url.
 */
function bestQualityUrl(photo) {
  if (!photo) return null;
  for (const quality of DescUrlQualities) {
    const url = photo[quality];
    if (url) return url;
  }
}

module.exports = bestQualityUrl;
