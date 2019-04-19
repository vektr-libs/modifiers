function createTextArry(lib,mylib){
  'use strict';
  var Modifier = mylib.Modifier;

  function findels (ctor, el, id_or_idgroup) {
    var tel = null, replacer, parent_replacer = {'#PARENT': el.get('id')};
    if (lib.isArray(id_or_idgroup)) {
      replacer = lib.extend ({}, id_or_idgroup[1], parent_replacer);
      tel = el.childAtPath(id_or_idgroup[0], replacer);
    }else if (lib.isString(id_or_idgroup)){
      tel = el.childAtPath(id_or_idgroup, parent_replacer);
    }else {
      tel = id_or_idgroup;
    }

    return ctor ? ctor(tel) : tel;
  }

  function TextArry (el, regexp_or_idlist, ctor) {
    Modifier.call(this, el);

    if (!regexp_or_idlist) {
      regexp_or_idlist = new RegExp(el.get('id')+'_(\\d+)');
    }

    if (lib.isArray(regexp_or_idlist)) {
      this._ta_els = regexp_or_idlist.map(findels.bind(null, ctor, el));
    }else{
      this._ta_els = ctor ? el.getIndexedChildren(regexp_or_idlist).map(ctor) : el.getIndexedChildren(regexp_or_idlist);
    }
  }
  lib.inherit(TextArry, Modifier);
  TextArry.prototype.__cleanUp = function () {
    lib.arryNullAll(this._ta_els);
    this._ta_els = null;
    Modifier.prototype.__cleanUp.call(this);
  };

  TextArry.prototype.set_texts = function (vals) {
    if (!vals) {
      this._ta_els.forEach(lib.doMethod.bind(lib, 'set', ['text', null]));
    }else{
      this._ta_els.forEach(_doSetValue.bind(null, vals));
    }
  };

  TextArry.prototype.getOnIndex = function (index) {
    return this._ta_els[index];
  };

  function _doSetValue (vals, el, index) {
    el.set('text', vals ? vals[index] : null);
  }
  mylib.TextArry = TextArry;
}

module.exports = createTextArry;
