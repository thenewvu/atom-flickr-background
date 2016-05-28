'use strict';

const toCSSDataUri = require('../utils/to-css-data-uri');

/**
 * A view draws a background image.
 */
class BackgroundView {

  /**
   * Construct a view.
   * @param {[type]} serializedState [description]
   */
  constructor(serializedState) {
    // create root element
    this._element = document.createElement('div');
    this._element.classList.add('flickr-background');
  }

  /**
   * Get root element.
   * @return {Element}
   */
  get element() {
    return this._element;
  }

  /**
   * Returns an object that can be retrieved when package is activated.
   * @return {Object} The state object.
   */
  serialize() {}

  /**
   * Tear down any state and detach
   */
  destroy() {
    this._element.remove();
  }

  /**
   * Toggle this view.
   */
  toggle() {
    this._element.classList.toggle('flickr-background-hided');
  }

  /**
   * Set image data to background.
   * @param {Buffer|String} data
   */
  setImageData(ct, data) {
    this._element.style.backgroundImage = toCSSDataUri(ct, data);
  }
}

module.exports = BackgroundView;
