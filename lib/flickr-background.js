'use babel';

import FlickrBackgroundView from './flickr-background-view';
import FlickrBackgroundModel from './flickr-background-model';
import { CompositeDisposable } from 'atom';

export default {

  _view: null,
  _model: null,
  _subscriptions: null,

  /**
   * Enable this package.
   * @param {Object} state - The previous state.
   */
  activate(state) {
    // create view and add it to document body
    this._view = new FlickrBackgroundView(state.viewState);
    document.body.appendChild(this._view.getElement());

    // create model and setup it
    this._model = new FlickrBackgroundModel();

    const interval = atom.config.get('flickr-background.interval');
    setInterval(this.nextPhoto, interval);

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this._subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this._subscriptions.add(atom.commands.add('atom-workspace', {
      'flickr-background:toggle': () => this.toggle()
    }));
  },

  /**
   * Goto next photo.
   */
  nextPhoto() {
    const tags = atom.config.get('flickr-background.tags');
    const text = atom.config.get('flickr-background.text');
    this._model.next(tags, text, (err, photo) => {
      if (err) return atom.notifications.addError(err);
      photo.download((err, data) => {
        if (err) return atom.notifications.addError(err);
        this._view.changePhoto(data);
      })
    });
  }

  /**
   * Disable this package.
   */
  deactivate() {
    this._subscriptions.dispose();
    this._view.destroy();
    this._model.destroy();
  },

  /**
   * Return the current state of this object.
   * @return {Object} The state object.
   */
  serialize() {
    return { viewState: this._view.serialize() };
  },

  /**
   * Toggle this package.
   */
  toggle() {
    console.log('FlickrBackground was toggled!');
    this._view.toggle();
  }

};
