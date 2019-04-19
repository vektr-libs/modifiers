function createStaticMatrix(lib,mixins,mylib) {
  'use strict';

  var StaticRepeater = mylib.StaticRepeater;

  function StaticMatrixRow (el, autoshow, onDone, creator, el_index_extract_regexp, row_index, row_used_obj_id) {
    StaticRepeater.call(this, el, autoshow, onDone, this._createEl.bind(this, creator, row_index, row_used_obj_id), el_index_extract_regexp);
  }
  lib.inherit(StaticMatrixRow, StaticRepeater);
  StaticMatrixRow.prototype.__cleanUp = function () {
    StaticRepeater.prototype.__cleanUp.call(this);
  };

  StaticMatrixRow.prototype.set_value = function (val) {
    this.set('values', val);
  };

  StaticMatrixRow.prototype._createEl = function (creator, row_index, row_used_obj_id,  el, el_index, used_obj_id){
    var base = this.items.length;
    return creator(el, el_index, used_obj_id, row_index, row_used_obj_id, this.get('el').id, row_index*base+el_index);
  };

  function StaticMatrix (el, autoshow, onDone, createEl, row_index_extract_regexp, el_index_extract_regexp) {
    StaticRepeater.call(this, el, autoshow, this._onRowsDone.bind(this, onDone), this._createRow.bind(this, autoshow, createEl, el_index_extract_regexp), row_index_extract_regexp);
    this.defers = new Array(this.items.length);
  }
  lib.inherit(StaticMatrix, StaticRepeater);
  StaticMatrix.prototype.__cleanUp = function () {
    StaticRepeater.prototype.__cleanUp.call(this);
  };

  StaticMatrix.prototype._createRow = function (autoshow, createEl, el_index_extract_regexp, row_el, index, used_obj_id) {
    var d = lib.q.defer();
    this.defers[index] = d.promise;
    return new StaticMatrixRow(row_el, autoshow, d.resolve.bind(d), createEl, el_index_extract_regexp, index, used_obj_id);
  };

  StaticMatrix.prototype._onRowsDone = function (onDone) {
    var self = this;
    lib.q.allSettled(this.defers).done(_fireDone.bind(null, onDone));
  };

  function _fireDone (onDone) {
    if (lib.isFunction(onDone)) onDone();
  }

  StaticMatrix.prototype.getOnIndex = function (index) {
    if (isNaN(index)) throw new Error('Invalid index');
    index = parseInt(index, 10);
    var rem = index;
    for (var i = 0; i < this.items.length; i++) { //rows
      if (!this.items[i]) return null;
      if (!this.items[i].items) return null;
      if (this.items[i].items.length <= rem) {
        rem -= this.items[i].items.length;
        continue;
      }
      return this.items[i].items[rem];
    }
    return null;
  };

  mylib.StaticMatrix = StaticMatrix;
}

module.exports = createStaticMatrix;
