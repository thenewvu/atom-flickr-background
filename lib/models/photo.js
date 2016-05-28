'use strict';

const _ = require('lodash');
const FlickrPhotos = require('../utils/flickr-photos');
const ApiConfig = require('../const/api');

/**
 * A model fetchs photos from Flickr service to a pool and profiles methods to
 * get photos from the pool.
 */
class PhotoModel {

  /**
   * Construct a model.
   */
  constructor() {
    this._photos = [];
    this._pages = [];
    this._flickr = new FlickrPhotos(ApiConfig);
  }

  /**
   * Get number of pages.
   * @return {Number}
   */
  get pages() {
    return this._pages;
  }

  /**
   * Return whether the model is empty.
   * @return {Boolean}
   */
  isEmpty() {
    return this._photos.length == 0;
  }

  /**
   * Get number of photos.
   * @return {Number}
   */
  get length() {
    return this._photos.length;
  }

  /**
   * Get a photo by its index.
   * @param {Number} index
   * @return {Object} The photo metadata.
   */
  get(index) {
    return this._photos[index];
  }

  /**
   * Fetch photos.
   * @param {Object} query
   * @param {Function} cb
   */
  fetch(query, cb) {
    const top = (query.tags == false && query.text == false);
    const endpoint = top ? this._flickr.top : this._flickr.search;
    endpoint(query, (err, res) => {
      if (err) cb(err);
      if (res.stat != 'ok') cb(res.message);
      console.log(res);
      this._photos = _.get(res, 'photos.photo', []);
      this._pages = _.get(res, 'photos.pages', 0);
      cb(null);
    });
  }
}

module.exports = PhotoModel;
