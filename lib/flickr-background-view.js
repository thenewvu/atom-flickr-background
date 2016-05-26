'use babel';

export default class FlickrBackgroundView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('flickr-background');
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
    this.element.remove();
  }

  /**
   * Get root element of this view.
   * @return {Element} The root element.
   */
  getElement() {
    return this.element;
  }

  /**
   * Toggle this view.
   */
  toggle() {
    this.element.classList.toggle('flickr-background-hided');
  }

}
