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
      sort: undefined,
      page: 0
    };
  }

  /**
   * Get next photo.
   * @param {String} tags
   * @param {String} text
   * @param {Function} cb
   */
  next(tags, text, sort, cb) {
    if (!this._model) {
      return cb(new Error('PhotoIterator has no model'));
    }
    this._curPage = this.nextPageIndex;
    const query = { tags, text, sort, page: this._curPage };
    if (this._model.isEmpty() ||
      JSON.stringify(query) != JSON.stringify(this._query)) {
      this._query = query;
      this._model.fetch(query, (err) => {
        if (err) return cb(err);
        this._curPhoto = this.nextPhotoIndex;
        cb(null, this._model.get(this._curPhoto));
      });
    } else {
      this._curPhoto = this.nextPhotoIndex;
      cb(null, this._model.get(this._curPhoto));
    }
  }

  /**
   * Get the next page index.
   * @return {Number}
   */
  get nextPageIndex() {
    let nextPage = this._curPage;
    if (this._curPhoto >= this._model.length) {
      nextPage++;
    }
    if (nextPage >= this._model.pages) {
      nextPage = 0;
    }
    return nextPage;
  }

  /**
   * Get the next photo index.
   * @return {Number}
   */
  get nextPhotoIndex() {
    let nextPhoto = this._curPhoto + 1;
    if (nextPhoto >= this._model.length) {
      nextPhoto = 0;
    }
    return nextPhoto;
  }
}

module.exports = PhotoIterator;
