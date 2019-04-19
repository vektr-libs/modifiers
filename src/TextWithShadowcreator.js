function createTextWithShadow(lib,mylib){
  'use strict';
  function TextWithShadow(renderel){
    mylib.CompositeTextGroup.call(this, renderel, ['text', 'shadow', 'blur']);
  }
  lib.inherit(TextWithShadow,mylib.CompositeTextGroup);
  mylib.TextWithShadow = TextWithShadow;
}

module.exports = createTextWithShadow;
