function createTextWithOutline(lib, mylib) {
  'use strict';
  function TextWithOutline (renderel) {
    mylib.CompositeTextGroup.call(this, renderel, ['text', 'outline']);
  }
  lib.inherit(TextWithOutline, mylib.CompositeTextGroup);
  mylib.TextWithOutline = TextWithOutline;
}

module.exports = createTextWithOutline;
