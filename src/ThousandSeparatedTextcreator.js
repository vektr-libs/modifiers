function createThousandSeparatedText(lib,commonlib,mylib){
  'use strict';
  function ThousandSeparatedText (el, separator) {
    mylib.Modifier.call(this, el);
    this.separator = separator || ' ';
  }

  lib.inherit(ThousandSeparatedText, mylib.Modifier);
  ThousandSeparatedText.prototype.__cleanUp = function () {
    mylib.Modifier.prototype.__cleanUp.call(this);
  };

  ThousandSeparatedText.prototype.set_text = function (text) {
    this.el.set('text', lib.thousandSeparate(text, this.separator));
  };

  mylib.ThousandSeparatedText = ThousandSeparatedText;
}

module.exports = createThousandSeparatedText;
