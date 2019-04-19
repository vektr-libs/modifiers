function createPasswordView(lib,renderinglib,commonlib,mylib){
  'use strict';

  function PasswordView(el) {
    mylib.Modifier.call(this, el);
    this._text = el.childAtPath(el.get('id')+'_value');
    this.value = '';
    this._text.set('text','');
  }
  lib.inherit(PasswordView, mylib.Modifier);
  lib.inheritMethods(PasswordView, lib.Gettable, 'get');
  PasswordView.prototype.__cleanUp = function () {
    this._text = null;
    this.value = null;
    mylib.Modifier.prototype.__cleanUp.call(this);
  };

  PasswordView.prototype.set_value = function (val) {
    if (!val) {
      this._text.set('text', '');
      this.value = '';
      return;
    }
    this.value = val;
    var t = '', len = (val+'').length;
    for (var i = 0; i < len; i++) t+='*';
    this._text.set('text', t);
  };
  PasswordView.prototype.append = function (val) {
    this.set('value', this.get('value')+''+val);
  };
  PasswordView.prototype.pop = function () {
    var old = this.get('value')+'';
    if (!old.length) return;
    this.set('value', old.substr(0, old.length-1));
  };

  mylib.PasswordView = PasswordView;
}

module.exports = createPasswordView;
