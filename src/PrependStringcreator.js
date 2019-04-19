function createPrependString(lib,commonlib,mylib){
  'use strict';
  function PrependString (el, minlen, prefix) {
    mylib.Modifier.call(this, el);
    this.minlen = minlen;
    this.prefix = prefix;
  }
  lib.inherit(PrependString, mylib.Modifier);
  PrependString.prototype.__cleanUp = function () {
    this.minlen = null;
    this.prefix = null;
    mylib.Modifier.prototype.__cleanUp.call(this);
  };

  PrependString.prototype.set_text = function (val) {
    if(null === val || 'undefined' === typeof(val)){
      this.el.hide();
      return;
    }
    this.el.set('text',PrependString.DoPrepend(val+'', this.minlen, this.prefix));
    this.el.show();
  };
  PrependString.DoPrepend = function (val, minlen, prefix) {
    var sv = val+'';
    while(sv.length < minlen) {
      sv = prefix+sv;
    }
    return sv;
  };

  mylib.PrependString = PrependString;
}

module.exports = createPrependString;
