function createModifier(lib,commonlib,mylib){
  'use strict';
  function Modifier(el){
    lib.Destroyable.call(this);
    lib.Gettable.call(this);
    this.el = el;
    this.destroyedListener = this.el.attachListener('destroyed',this.destroy.bind(this));
  }
  Modifier.prototype.destroy = lib.Destroyable.prototype.destroy;
  Modifier.prototype.__cleanUp = function(){
    this.destroyedListener.destroy();
    this.destroyedListener = null;
    this.el = null;
    lib.Gettable.prototype.__cleanUp.call(this);
    lib.Destroyable.prototype.__cleanUp.call(this);
  };
  Modifier.prototype.fireEvent = lib.Changeable.prototype.fireEvent;
  Modifier.prototype.get = lib.Gettable.prototype.get;
  /*
  Modifier.prototype.set = function(name,val){
    if(!this.el){return false;}
    lib.Changeable.prototype.set.call(this,name,val);
  };
  */
  Modifier.prototype.set = function(name,val){
    if(!this.el){
      return lib.Changeable.prototype.set.call(this,name,val);
    }
    if('undefined' === typeof this[name] && 'undefined' === typeof this['set_'+name]){
      //return lib.Changeable.prototype.set.call(this.el,name,val);
      return commonlib.set(this.el,name,val);
    }else{
      return lib.Changeable.prototype.set.call(this,name,val);
    }
  };
  Modifier.prototype.attachListener = function(hookname,cborpropname,cb){
    var ret = lib.Listenable.prototype.attachListener.call(this,hookname,cborpropname,cb);
    if(typeof ret === 'undefined' && this.el){
      return this.el.attachListener(hookname,cborpropname,cb);
    }
    return ret;
  };
  Modifier.prototype.show = function(){
    if(this.el){
      this.el.show();
    }
  };
  Modifier.prototype.hide = function(){
    if(this.el){
      this.el.hide();
    }
  };
  Modifier.prototype.get_display = function(){
    return this.el ? this.el.get('display') : 'false';
  };

  Modifier.prototype.set_display = function (val) {
    if (!this.el) return;
    this.el.set('display', val);
  };
  Modifier.prototype.traverseHierarchyConditionally = function(cb){
    if(this.el){
      this.el.traverseHierarchyConditionally(cb);
    }
  };
  function addTo(el,elindex){
    this[elindex] = el;
  }
  Modifier.boilerplate = function(methods){
    var ModifierBoilerplate = function(renderel){
      mylib.Modifier.call(this,renderel);
    };
    lib.inherit(ModifierBoilerplate,mylib.Modifier);
    lib.traverse(methods,addTo.bind(ModifierBoilerplate.prototype));
    return ModifierBoilerplate;
  };
  mylib.Modifier = Modifier;
}

module.exports = createModifier;
