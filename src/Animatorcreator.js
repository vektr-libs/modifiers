function createAnimator(lib,hierarchymixinslib,commonlib,EasingRegistry,mylib){
  'use strict';
  var _id = 0;

  function AnimatedChanger(parnt,renderel,propname,change,duration,algo, limit, param){
    if (!duration || isNaN(duration) || duration < 0) throw new Error('Invalid animation duration: ',duration);
    this.id = ++_id;
    this.propname = propname;
    this.duration = duration;
    this.change = change;
    this.changedone = 0;
    this.algo = EasingRegistry.get(algo) || EasingRegistry.get('Linear');
    this.param = param;
    mylib.Modifier.call(this,renderel);
    hierarchymixinslib.Child.call(this,parnt);
    this.dirty = false;
    this.renderListener = compositing.aboutToRender.attach(this.onAboutToRender.bind(this));
    this.started = (new Date()).getTime();
    this.limit = limit;
    this.nonchangedcount = 0;
    this.updateControlee();
  }
  lib.inherit(AnimatedChanger,mylib.Modifier);
  AnimatedChanger.prototype.__cleanUp = function(){
    this.param = null;
    this.nonchangedcount = null;
    this.limit = null;
    this.started = null;
    this.renderListener.destroy();
    this.renderListener = null;
    this.dirty = null;
    hierarchymixinslib.Child.prototype.__cleanUp.call(this);
    mylib.Modifier.prototype.__cleanUp.call(this);
    this.algo = null;
    this.changedone = null;
    this.change = null;
    this.duration = null;
    this.propname = null;
  };

  AnimatedChanger.prototype.retryIgnite = function(){
    this.dirty = false;
    this.updateControlee();
  };
  AnimatedChanger.prototype.onAboutToRender = function () {
    this.dirty = false;
    this.updateControlee();
  };
  AnimatedChanger.prototype.updateControlee = function(){
    var now = (new Date()).getTime(), actualduration = now-this.started,change,changetodo;
    if(this.destroyed===null){
      /*
      console.trace();
      console.log('++', this.id);
      */
      return;
    }
    if(this.el.destroyed===null){
      return;
    }

    if(actualduration>=this.duration){
      change = this.change;
    }else{
      change = this.algo(actualduration,0,this.change,this.duration, this.param);
      //console.log('====>', actualduration/this.duration, change/this.change);
    }
    changetodo = change-this.changedone;
    if (actualduration >= this.duration) {
      //console.log(this.el.get('id'), this.id, 'timed out by', actualduration, this.duration, '=>', actualduration-this.duration, 'let me see changetodo', changetodo, 'nonchangedcount', this.nonchangedcount);
      this.el.set('d'+this.propname,changetodo); //I do not care if change was successfull, my time is done ...
      this.destroy();
      //lib.runNext(this.destroy.bind(this));
      return;
    }

    if (this.limit && changetodo > this.change*this.limit){
      changetodo = this.change*this.limit;
    }

    if (this.el.set('d'+this.propname,changetodo)){
      this.dirty = true;
      this.changedone += changetodo;
    }else if (!this.dirty) {
      this.dirty = true;
      this.nonchangedcount++;
      //console.log('changetodo: failed', changetodo);
      lib.runNext(this.retryIgnite.bind(this));
    }
  };

  function Animator(renderel,animdesc){
    var propdesc;
    lib.Destroyable.call(this);
    hierarchymixinslib.Parent.call(this);
    for(var i in animdesc.props){
      propdesc = animdesc.props[i];
      new AnimatedChanger(this,renderel,i,propdesc.amount,animdesc.duration, propdesc.algo, propdesc.limit, propdesc.param);
    }
  }
  lib.inherit(Animator,hierarchymixinslib.Parent);
  Animator.prototype.destroy = lib.Destroyable.prototype.destroy;
  Animator.prototype.removeChild = function(chld){
    hierarchymixinslib.Parent.prototype.removeChild.call(this,chld);
    if(this.__children.length<1){
      this.destroy();
    }
  };
  Animator.prototype.childChanged = lib.dummyFunc;
  Animator.prototype.__cleanUp = function(){
    hierarchymixinslib.Parent.prototype.__cleanUp.call(this);
    lib.Destroyable.prototype.__cleanUp.call(this);
  };

  mylib.AnimatedChanger = AnimatedChanger;
  mylib.Animator = Animator;
}

module.exports = createAnimator;
