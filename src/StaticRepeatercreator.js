function createStaticRepeater(lib, mixins, renderinglib, commonlib, mylib) {
  'use strict';
  var Tearable = mixins.Tearable,
    Modifier = mylib.Modifier;


  //should go to mixins ...

  function match (regexp, id) {
    return id.match(regexp);
  }

  function StaticRepeater (el, autoshow, onDone, traverser, index_extract_regexp, ignorevalues) {
    /// TODO: now el must be a Group with uses only in it ...
    Modifier.call(this, el);
    Tearable.call(this);
    var els = el.getIndexedChildren(index_extract_regexp);
    if (!els.length) throw new Error('No items in StaticRepeater to be created ...');
    this.items = new Array(els.length);
    this._sr_values = null;
    this._instantiate (el, autoshow, onDone, traverser, els, index_extract_regexp, ignorevalues);
  }
  lib.inherit(StaticRepeater, Modifier);
  Tearable.addMethods(StaticRepeater);

  StaticRepeater.prototype.__cleanUp = function () {
    lib.arryNullAll(this._sr_values);
    this._sr_values = null;
    lib.arryDestroyAll(this.items);
    this.items = null;
    Tearable.prototype.__cleanUp.call(this);
    Modifier.prototype.__cleanUp.call(this);
  };

  StaticRepeater.prototype._instantiate = function (el, autoshow, onDone, traverser, els, index_extract_regexp, ignorevalues) {
    this.tear(el, els, this._onInstantiated.bind(this, autoshow, onDone, traverser, els, index_extract_regexp, ignorevalues));
  };

  StaticRepeater.prototype._onInstantiated = function (autoshow, onDone, traverser, els, regexp, ignorevalues, results) {
    this.traverseResults(results, autoshow);
    els.forEach (_analyze.bind(null, this._sr_values, this.el, traverser, regexp, this.items, ignorevalues));
    if (lib.isFunction (onDone)) onDone();
  };

  function _analyze (values, el, traverser, regexp, items, ignorevalues, element, index) {
    if (!lib.isFunction(traverser)) return;
    var obj = element;
    var is_use = (obj instanceof renderinglib.Use);

    items[index] = traverser(is_use ? obj.get('usedObj') : obj, index, obj.get('id'));
    if (items[index] && !ignorevalues) items[index].set('value', values && lib.defined(values[index]) ? values[index] : null);
  }

  StaticRepeater.prototype.set_values = function (values) {
    this._sr_values = values;
    if (!values) {
      this.items.forEach(lib.doMethod.bind(null, 'set', ['value', null]));
      return;
    }
    this.items.forEach(_setValue.bind(null, values));
  };

  StaticRepeater.prototype.get_values = function () {
    return this._sr_values;
  };

  function _setValue (values, item, index){
    if (!item) return;
    item.set('value', values[index]);
  }

  StaticRepeater.addMethods = function (chld) {
    Tearable.addMethods(chld);
    lib.inheritMethods (chld, StaticRepeater, 'set_values', '_instantiate', '_onInstantiated');
  };

  StaticRepeater.prototype.getItemOnIndex = function (index) {
    return this.items[index];
  };

  StaticRepeater.prototype.doItemMethod = function (method, args) {
    return this.items.map (lib.doMethod.bind(null, method, args || null));
  };

  StaticRepeater.prototype.get_repeater_length = function () {
    return this.items.length;
  };

  function GroupStaticRepeater (el, autoshow, onDone, traverser, index_extract_regexp, ignorevalues) {
    StaticRepeater.call(this, el, autoshow, onDone, traverser, index_extract_regexp, ignorevalues);
  }
  lib.inherit(GroupStaticRepeater, StaticRepeater);
  GroupStaticRepeater.prototype.__cleanUp = function () {
    StaticRepeater.prototype.__cleanUp.call(this);
  };

  GroupStaticRepeater.prototype._instantiate = function (el, autoshow, onDone, traverser,els, index_extract_regexp, ignorevalues){
    this._onInstantiated(autoshow, onDone, traverser, els, index_extract_regexp, ignorevalues);
  };

  mylib.StaticRepeater = StaticRepeater;
  mylib.GroupStaticRepeater = GroupStaticRepeater;
}

module.exports = createStaticRepeater;
