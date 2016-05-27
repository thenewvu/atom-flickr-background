'use strict';

class Notifier {
  constructor(prefix) {
    this._prefix = prefix;
  }

  /**
   * Notify an error message.
   * @param {String} msg - The message.
   */
  error(msg, opts) {
    atom.notifications.addError(`${this._prefix}: ${msg}`, opts);
  }

  /**
   * Notify an information message.
   * @param {String} msg - The message.
   */
  info(msg, opts) {
    atom.notifications.addInfo(`${this._prefix}: ${msg}`, opts);
  }

  /**
   * Notify a warning message.
   * @param {String} msg - The message.
   */
  warning(msg, opts) {
    atom.notifications.addWarning(`${this._prefix}: ${msg}`, opts);
  }
}

module.exports = Notifier;
