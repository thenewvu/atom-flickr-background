'use strict';

const url = require('url');
const request = require('request');
const DescUrlQualities = require('../const/desc-url-qualities');

const API_PROTOCOL = 'https';
const API_HOST = 'api.flickr.com';
const API_PATH = 'services/rest/';
const METHOD_TOP = 'flickr.interestingness.getList';
const METHOD_SEARCH = 'flickr.photos.search';
const EXTRAS = DescUrlQualities.join(',') + ',owner_name';

/**
 * Provides methods to access Flickr.photos API.
 */
class FlickrPhotos {

  /**
   * Construct with options.
   * @param {Object} opts
   */
  constructor(opts) {
    this._opts = opts;
    this.search = this.search.bind(this);
    this.top = this.top.bind(this);
  }

  /**
   * Search photos.
   * @param {Object} query
   * @param {Function} cb
   */
  search(query, cb) {
    const req = url.format({
      protocol: API_PROTOCOL,
      hostname: API_HOST,
      pathname: API_PATH,
      query: Object.assign({}, query, {
        method: METHOD_SEARCH,
        api_key: this._opts.key,
        format: 'json',
        nojsoncallback: 1,
        extras: EXTRAS
      })
    });
    console.log(req);
    request(req, (err, res, body) => {
      if (err) return cb(err);
      if (res.statusCode != 200) {
        return cb(new Error(`HTTP Error (${res.statusCode})`));
      }
      body = JSON.parse(body);
      cb(null, body);
    });
  }

  /**
   * Get top photos.
   * @param {Function} cb
   */
  top(query, cb) {
    const req = url.format({
      protocol: API_PROTOCOL,
      hostname: API_HOST,
      pathname: API_PATH,
      query: Object.assign({}, query, {
        method: METHOD_TOP,
        api_key: this._opts.key,
        format: 'json',
        nojsoncallback: 1,
        extras: EXTRAS
      })
    });
    console.log(req);
    request(req, (err, res, body) => {
      if (err) return cb(err);
      if (res.statusCode != 200) {
        return cb(new Error(`HTTP Error (${res.statusCode})`));
      }
      body = JSON.parse(body);
      cb(null, body);
    });
  }
}

module.exports = FlickrPhotos;
