'use strict';

const CompositeDisposable = require('atom').CompositeDisposable;
const BackgroundView = require('./views/background');
const PhotoModel = require('./models/photo');
const PhotoIterator = require('./controllers/photo-iterator');
const Notifier = require('./utils/notifier');
const bestQualityUrl = require('./utils/best-quality-url');
const download = require('./utils/download');

/**
 * Package name.
 * @type {String}
 */
const PACKAGE_NAME = 'FlickrBackground';

/**
 * FlickrBackground package.
 */
class Package {

  /**
   * Construct a package.
   */
  constructor() {
    this._view = null;
    this._model = null;
    this._iterator = null;
    this._subscriptions = null;
    this._notify = new Notifier(PACKAGE_NAME);
    this.refresh = this.refresh.bind(this);
  }

  /**
   * Get config schema of this package.
   * @return {Object}
   */
  get config() {
    return {
      tags: {
        type: 'string',
        title: 'Tags',
        description: 'Find any photo has these tags. Tags are delimited by' +
          ' commas.',
        default: ''
      },
      text: {
        type: 'string',
        title: 'Keyword',
        description: 'Find any photo that has the text in its ' +
          ' description or title',
        default: ''
      },
      interval: {
        type: 'integer',
        title: 'Interval',
        description: 'In seconds. After each this amount of time, the' +
          ' background will change to a new photo',
        default: 120,
        minimum: 30
      },
      sort: {
        type: 'string',
        description: 'Order of showing photos',
        enum: [
          'date-posted-asc', 'date-posted-desc', 'date-taken-asc',
          'date-taken-desc', 'interestingness-desc', 'interestingness-asc',
          'relevance'
        ],
        default: 'interestingness-desc'
      },
      opacity: {
        type: 'number',
        description: 'Background opacity',
        default: 0.5,
        minimum: 0,
        maximum: 1
      }
    };
  }

  /**
   * Activate this package.
   * @param {Object} state
   */
  activate(state) {
    console.log('Activating...');

    // create background view and add it to document body
    this._view = new BackgroundView(state.viewState);
    document.body.appendChild(this._view.element);

    // create photo model
    this._model = new PhotoModel();

    // create photo iterator
    this._iterator = new PhotoIterator(this._model);

    // create refresher
    const interval = atom.config.get('flickr-background.interval') * 1000;
    this._interval = interval;
    this._refresher = setInterval(this.refresh, interval);
    this.refresh();

    // events subscribed to in atom's system can be easily cleaned up with a
    // CompositeDisposable
    this._subscriptions = new CompositeDisposable();

    // register commands
    this._subscriptions.add(atom.commands.add('atom-workspace', {
      'flickr-background:toggle': () => this.toggle()
    }));
    this._subscriptions.add(atom.commands.add('atom-workspace', {
      'flickr-background:next-photo': () => this.refresh()
    }));
    this._subscriptions.add(atom.commands.add('atom-workspace', {
      'flickr-background:show-photo-info': () => this.showPhotoInfo()
    }));
    this._subscriptions.add(atom.commands.add('atom-workspace', {
      'flickr-background:increse-opacity': () => this._view.increseOpacity()
    }));
    this._subscriptions.add(atom.commands.add('atom-workspace', {
      'flickr-background:decrese-opacity': () => this._view.decreseOpacity()
    }));
  }

  /**
   * Refresh by a new photo.
   */
  refresh() {
    console.log('Refreshing...');
    const interval = atom.config.get('flickr-background.interval') * 1000;
    if (interval != this._interval) {
      this._interval = interval;
      clearInterval(this._refresher);
      this._refresher = setInterval(this.refresh, interval);
    }
    const tags = atom.config.get('flickr-background.tags');
    const text = atom.config.get('flickr-background.text');
    const sort = atom.config.get('flickr-background.sort');
    this._iterator.next(tags, text, sort, (err, photo) => {
      if (err) return this._notify.error(err);
      const url = bestQualityUrl(photo);
      if (!url) {
        console.warn('Not found best quality url of ', photo);
        return;
      }
      console.log(url);
      download(url, (err, ct, data) => {
        if (err) return this._notify.error(err);
        this.showPhotoInfo(photo);
        this._view.setImageData(ct, data);
      });
    });
  }

  /**
   * Show the current photo meta.
   * @param {Object} photo
   */
  showPhotoInfo(photo) {
    photo && (this._curPhoto = photo);
    if (!this._curPhoto) return;
    const info = `"${this._curPhoto.title}" by "${this._curPhoto.ownername}"`;
    const infoUrl = `https://www.flickr.com/photos/${this._curPhoto.owner}/${this._curPhoto.id}`;
    this._notify.info(info, {
      detail: infoUrl
    });
  }

  /**
   * Deactivate this package.
   */
  deactivate() {
    console.log('Deactivating...');
    this._subscriptions.dispose();
    this._view.destroy();
  }

  /**
   * Return the current state of this package.
   * @return {Object}.
   */
  serialize() {
    return {
      viewState: this._view.serialize()
    };
  }

  /**
   * Toggle this package.
   */
  toggle() {
    console.log('Toggling...');
    this._view.toggle();
  }
}

const pkg = new Package();
module.exports = pkg;
