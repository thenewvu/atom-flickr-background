'use strict';

/**
 * Iterator over photos in a model.
 */
class PhotoIterator {

  /**
   * Construct an iterator.
   */
  constructor(model) {
    this._model = model;
    this._curPhoto = -1;
    this._curPage = 0;
    this._query = {
      tags: undefined,
      text: undefined,
      page: 0
    };
  }

  /**
   * Get next photo.
   * @param {String} tags
   * @param {String} text
   * @param {Function} cb
   */
  next(tags, text, cb) {
    if (!this._model) {
      return cb(new Error('PhotoIterator has no model'));
    }
    const query = { tags, text, page: this.nextPage };
    if (this._model.isEmpty() ||
      JSON.stringify(query) != JSON.stringify(this._query)) {
      this._query = query;
      this._model.fetch(query, (err) => {
        if (err) return cb(err);
        cb(null, this._model.get(++this._curPhoto));
      });
    } else {
      cb(null, this._model.get(++this._curPhoto));
    }
  }

  /**
   * Get the next page index.
   * @return {Number}
   */
  get nextPage() {
    return this._curPage >= this._model.pages ? 0 : this._curPage;
  }
}

module.exports = PhotoIterator;