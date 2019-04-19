function createContentSwitcher(lib, mixins, mylib) {
  'use strict';

  var CContentSwitcher = mixins.ContentSwitcher,
    Modifier = mylib.Modifier;

  function ContentSwitcher (el, index_regexp) {
    Modifier.call(this, el);
    CContentSwitcher.call(this, el, index_regexp);
  }
  lib.inherit (ContentSwitcher, Modifier);
  CContentSwitcher.addMethods (ContentSwitcher);

  ContentSwitcher.prototype.__cleanUp = function () {
    CContentSwitcher.prototype.__cleanUp.call(this);
    Modifier.prototype.__cleanUp.call(this);
  };

  mylib.ContentSwitcher = ContentSwitcher;

}

module.exports = createContentSwitcher;
