function createSuffixedValue(lib,commonlib,mylib){
  'use strict';
  function SuffixedValue(el, sufix) {
    mylib.Modifier.call(this, el);
    this.sufix = sufix;
  }
  lib.inherit(SuffixedValue, mylib.Modifier);
  SuffixedValue.prototype.__cleanUp = function () {
    this.sufix = null;
    mylib.Modifier.prototype.__cleanUp.call(this);
  };

  SuffixedValue.prototype.set_text = function (val) {
    if (null === val || 'undefined' === typeof(val)) {
      this.el.set('text', '');
      return;
    }
    this.el.set('text', val+''+this.sufix);
  };

  function PercentageValue (el) {
    SuffixedValue.call(this, el, '%');
  }
  lib.inherit(PercentageValue, SuffixedValue);

  mylib.PercentageValue = PercentageValue;
  mylib.SuffixedValue= SuffixedValue;

}

module.exports = createSuffixedValue;
