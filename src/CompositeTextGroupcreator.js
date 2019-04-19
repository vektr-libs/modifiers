function createCompositeTextGroup(lib, mylib) {
  'use strict';
  function CompositeTextGroup (renderel, props) {
    mylib.Modifier.call(this, renderel);
    this._ctg_props = props;
  }
  lib.inherit(CompositeTextGroup, mylib.Modifier);
  CompositeTextGroup.prototype.__cleanUp = function () {
    this._ctg_props = null;
    mylib.Modifier.prototype.__cleanUp.call(this);
  };
  CompositeTextGroup.prototype.safe_set = function(text, suffix){
    var el = this.el.childById(this.el.id+'_'+suffix);
    if(!el){
      return;
    }
    el.set('text',text);
  };

  CompositeTextGroup.prototype.set_text = function (text) {
    this._ctg_props.forEach(this.safe_set.bind(this, text));
  };
  mylib.CompositeTextGroup = CompositeTextGroup;

}

module.exports = createCompositeTextGroup;
