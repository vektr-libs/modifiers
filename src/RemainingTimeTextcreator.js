function createRemainingTimeText(lib, mylib) {
  'use strict';
  var Modifier = mylib.Modifier,
  PrependString = mylib.PrependString;

  function RemainingTimeText (el) {
    Modifier.call(this, el);
    this._tsetter = el.set.bind(el, 'text');
    this._interval = null;
    this._ct = null;
    this._tsetter('');
  }
  lib.inherit(RemainingTimeText, Modifier);
  RemainingTimeText.prototype.__cleanUp = function () {
    this._ct = null;
    if (this._interval) clearInterval(this._interval);
    this._interval = null;
    Modifier.prototype.__cleanUp.call(this);
  };

  RemainingTimeText.prototype.set_text = function (time) {
    this._ct = time;
    if (!time || (!isNaN(time) && time < 0)) {
      this.stop();
      this._tsetter('');
      return;
    }

    var mins = Math.floor(time/60);
    var secs = time - mins*60;
    this._tsetter(mins ? mins+':'+PrependString.DoPrepend(secs, 2, '0') : PrependString.DoPrepend(secs, 2, '0'));
  };

  RemainingTimeText.prototype.start = function (time) {
    this.stop();
    this.set('text', time);
    this._interval = setInterval(this._dec.bind(this), 1000);
  };

  RemainingTimeText.prototype._dec = function () {
    this.set('text', this._ct-1);
  };

  RemainingTimeText.prototype.stop = function () {
    if (this._interval) clearInterval(this._interval);
    this._interval = null;
  };

  RemainingTimeText.prototype.resume = function () {
    this.start(this._ct);
  };

  mylib.RemainingTimeText = RemainingTimeText;
}

module.exports = createRemainingTimeText;
