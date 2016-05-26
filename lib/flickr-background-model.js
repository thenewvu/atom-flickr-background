'use strict';

const Flickr = require('flickrapi');

/**
 * Model class profiles methods to fetches, iterate photos from Flickr API
 * service.
 */
class FlickrBackgroundModel {
  constructor() {
    this._api = new Flickr({ api_key: '51cd26c4e3436a0181b17f1cd29ff340' });
    this._active = true;
    this._pages = 0;
    this._page = -1;
    this._photo = -1;
    this._extras = ['url_sq', 'url_t', 'url_s', 'url_q', 'url_m', 'url_n',
      'url_z', 'url_c', 'url_l', 'url_o'].join(',');
  }

  /**
   * Fetch photos from Flickr API service.
   * @param {String} tags
   * @param {String} text
   */
  fetch(tags, text, page) {
    const search = (tags == true || text == true);
    const endpoint = search ?
      this._api.photos.search : this._api.interestingness.getList;
    const extras = this._extras;
    const query = search ? { tags, text, extras, page } : { extras, page };
    endpoint(query, (err, res) => {

    });
  }

  /**
   * Toggle this model
   */
  toggle() {
    this._active = !this._active;
  }
}

module.exports = FlickrBackgroundModel;
