(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var lr = ALLEX.execSuite.libRegistry;
lr.register('vektr_modifierslib',
  require('./index')(
    ALLEX,
    lr.get('allex_hierarchymixinslib'),
    lr.get('vektr_commonlib'),
    lr.get('vektr_renderinglib')
  )
);

},{"./index":2}],2:[function(require,module,exports){
function createLib (execlib, hierarchymixinslib, commonlib, renderinglib) {
  'use strict';

  var lib = execlib.lib;
  var ret = {
    EasingRegistry : require('allex_easinglowlevellib')(lib.inherit, lib.isFunction, lib.Map).EasingRegistry,
    helpers : {}
  };

  require('./src/Modifiercreator')(lib,commonlib,ret);
  require('./src/CompositeTextGroupcreator')(lib,ret);
  require('./src/TextWithShadowcreator')(lib,ret);
  require('./src/TextWithOutlinecreator')(lib,ret);
  require('./src/Animatorcreator')(lib,hierarchymixinslib,commonlib,ret.EasingRegistry,ret);
  require('./src/Animatablecreator')(lib,ret);
  require('./src/PrependStringcreator')(lib,commonlib,ret);
  require('./src/Zoomercreator')(lib,ret);
  require('./src/PathWalkercreator')(lib,ret);
  require('./src/SuffixedValuecreator')(lib,commonlib,ret);
  require('./src/PasswordViewcreator')(lib,renderinglib,commonlib,ret);
  require('./src/RemainingTimeTextcreator')(lib,ret);
  require('./src/StaticRepeatercreator')(lib,renderinglib.mixins,renderinglib,commonlib,ret);
  require('./src/StaticMatrixcreator')(lib,renderinglib.mixins,ret);
  require('./src/TextArrycreator')(lib,ret);
  require('./src/ThousandSeparatedTextcreator')(lib,commonlib,ret);
  require('./src/ContentSwitchercreator')(lib,renderinglib.mixins,ret);
  require('./src/helperscreator')(lib,ret);

  return ret;
}

module.exports = createLib;

},{"./src/Animatablecreator":5,"./src/Animatorcreator":6,"./src/CompositeTextGroupcreator":7,"./src/ContentSwitchercreator":8,"./src/Modifiercreator":9,"./src/PasswordViewcreator":10,"./src/PathWalkercreator":11,"./src/PrependStringcreator":12,"./src/RemainingTimeTextcreator":13,"./src/StaticMatrixcreator":14,"./src/StaticRepeatercreator":15,"./src/SuffixedValuecreator":16,"./src/TextArrycreator":17,"./src/TextWithOutlinecreator":18,"./src/TextWithShadowcreator":19,"./src/ThousandSeparatedTextcreator":20,"./src/Zoomercreator":21,"./src/helperscreator":22,"allex_easinglowlevellib":4}],3:[function(require,module,exports){
function createBaseEasings (EasingRegistry) {
  'use strict';

  function OutBounce(t, b, c, d) {
    if ((t/=d) < (1/2.75)) {
      return c*(7.5625*t*t) + b;
    } else if (t < (2/2.75)) {
      return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
    } else if (t < (2.5/2.75)) {
      return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
    } else {
      return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
    }
  }

  function InBounce (t, b, c, d) {
    return c - OutBounce (d-t, 0, c, d) + b;
  }

  function AstableFast(t, b, c, d) {
    var cs = 10;
    var segment = d/cs;
    var ct = cs*t/d;

    var ret;


    var ts = Math.floor(ct);
    if (ts === 0) {
      ret = -c/10 * Math.sin(2*ct * (Math.PI/2));
    }else{
      ret = myOutElastic(t-d/cs,b,c,0.9*d);
    }
    return ret;
  }

  function myOutElastic (t,b,c,d) {
    var s=1.70158, p=0, a=c, coeff = t/d;
    if (t<=0) return b;
    if (coeff>=1) return b+c;
    if (!p) p=d*0.308;
    if (a < Math.abs(c)) { 
      a=c; s=p/4; 
    } else {
      s = p/(2*Math.PI) * Math.asin (c/a);
    }
    return a*Math.pow(1.42,-10*coeff) * Math.sin( (t-s)*(2*Math.PI)/p ) + c + b;
  }



  EasingRegistry.add('InBounce', InBounce);
  EasingRegistry.add('OutBounce',OutBounce);
  EasingRegistry.add('AstableFast', AstableFast);

  EasingRegistry.add('Linear', function(t, b, c, d) {
    return b+t/d*c;
  });
  EasingRegistry.add('InQuad', function(t, b, c, d) {
    return c*(t/=d)*t + b;
  });
  EasingRegistry.add('OutQuad', function(t, b, c, d) {
    return -c *(t/=d)*(t-2) + b;
  });
  EasingRegistry.add('InOutQuad', function(t, b, c, d) {
    t /= (d/2);
    if (t < 1) return c/2*t*t + b;
    return -c/2 * ((--t)*(t-2) - 1) + b;
  });
  EasingRegistry.add('InCubic', function(t, b, c, d) {
    return c*(t/=d)*t*t + b;
  });
  EasingRegistry.add('OutCubic', function(t, b, c, d) {
    return c*((t=t/d-1)*t*t + 1) + b;
  });
  EasingRegistry.add('InOutCubic', function(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t*t + b;
    return c/2*((t-=2)*t*t + 2) + b;
  });
  EasingRegistry.add('InQuart', function(t, b, c, d) {
    return c*(t/=d)*t*t*t + b;
  });
  EasingRegistry.add('OutQuart', function(t, b, c, d) {
    return -c * ((t=t/d-1)*t*t*t - 1) + b;
  });
  EasingRegistry.add('InOutQuart', function(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t*t*t + b;
    return -c/2 * ((t-=2)*t*t*t - 2) + b;
  });
  EasingRegistry.add('InQuint', function(t, b, c, d) {
    return c*(t/=d)*t*t*t*t + b;
  });
  EasingRegistry.add('OutQuint', function(t, b, c, d) {
    return c*((t=t/d-1)*t*t*t*t + 1) + b;
  });
  EasingRegistry.add('InOutQuint', function(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t*t*t*t + b;
    return c/2*((t-=2)*t*t*t*t + 2) + b;
  });
  EasingRegistry.add('InSine', function(t, b, c, d) {
    return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
  });
  EasingRegistry.add('OutSine ', function(t, b, c, d) {
    return c * Math.sin(t/d * (Math.PI/2)) + b;
  });
  EasingRegistry.add('InOutSine ', function(t, b, c, d) {
    return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
  });
  EasingRegistry.add('InExpo', function(t, b, c, d) {
    return (t===0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
  });
  EasingRegistry.add('OutExpo', function(t, b, c, d) {
    return (t===d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
  });
  EasingRegistry.add('InOutExpo', function(t, b, c, d) {
    if (t===0) return b;
    if (t===d) return b+c;
    t /= d/2;
    if (t < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
    return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
  });
  EasingRegistry.add('InCirc', function(t, b, c, d) {
    return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
  });
  EasingRegistry.add('OutCirc', function(t, b, c, d) {
    return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
  });
  EasingRegistry.add('InOutCirc', function(t, b, c, d) {
    t /= d/2;
    if (t < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
    return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
  });
  EasingRegistry.add('InElastic', function(t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t===0) return b;
    t /= d;
    if (t===1) return b+c;
    if (!p) p=d*0.3;
    if (a < Math.abs(c)) { a=c; s=p/4; }
    else s = p/(2*Math.PI) * Math.asin (c/a);
    return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
  });
  EasingRegistry.add('OutElastic', function(t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t===0) return b;
    t /= d;
    if (t===1) return b+c;
    if (!p) p=d*0.3;
    if (a < Math.abs(c)) { a=c; s=p/4; }
    else s = p/(2*Math.PI) * Math.asin (c/a);
    return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
  });
  EasingRegistry.add('InOutElastic', function(t, b, c, d) {
    var s=1.70158;var p=0;var a=c;
    if (t===0) return b;
    t /= d/2;
    if (t===2) return b+c;
    if (!p) p=d*(0.3*1.5);
    if (a < Math.abs(c)) { a=c; s=p/4; }
    else s = p/(2*Math.PI) * Math.asin (c/a);
    if (t < 1) return -0.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
  });
  EasingRegistry.add('InBack', function(t, b, c, d, s) {
    if (s === undefined) s = 1.70158;
    return c*(t/=d)*t*((s+1)*t - s) + b;
  });
  EasingRegistry.add('OutBack', function(t, b, c, d, s) {
    if (s === undefined) s = 1.70158;
    return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
  });
  EasingRegistry.add('InOutBack', function(t, b, c, d, s) {
    if (s === undefined) s = 1.70158;
    t /= d/2;
    if (t < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
    return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
  });
  EasingRegistry.add('InOutBounce', function(t, b, c, d) {
    if (t < d/2) return InBounce (t*2, 0, c, d) * 0.5 + b;
    return OutBounce (t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
  });
  EasingRegistry.add( 'AstableSlow', function(t, b, c, d) {
    return AstableFast(t, b, c, d);
  });

  EasingRegistry.add('PiecewiseLinear', function(t, b, c, d, s) {
    var mp = {b:b, d:d, c:c, t:t}, _mp = mp,
      acc = {b:0, d:d, c:0, t:t, time:0, duration:0}, _acc = acc;
    if (HERS.isArray(s)) {
      s.some(function (p) {
        _acc.time += p.duration*d;
        //console.log(t, '<', _acc.time, '?');
        _mp.d = p.duration*d;
        _mp.c = p.amount*c;
        if (t < _acc.time) {
          _mp.b = _acc.b;
          _mp.t = _acc.t;
          return true;
        } else {
          _acc.b += p.amount*c;
          _acc.duration += _mp.d;
          _acc.d -= p.duration*d;
          _acc.t = t-_acc.duration;
          _acc.c += p.amount*c;
        }
      });
    }
    if (t>=acc.time && acc.d>0) {
      mp.b = acc.b;
      mp.c = c-acc.c;
      mp.d = acc.d;
      mp.t = acc.t;
    }
    //console.log('original b', b, 'c', c, 'd', d, 't', t);
    //console.log('actual b', mp.b, 'c', mp.c, 'd', mp.d, 't', mp.t);
    _mp = null;
    _acc = null;
    t = null;
    d = null;
    c = null;
    //console.log('finally', mp.b+mp.t/mp.d*mp.c);
    return mp.b+mp.t/mp.d*mp.c;
  });
}

module.exports = createBaseEasings;

},{}],4:[function(require,module,exports){
function createEasing (inherit, isFunction, Map) {
  'use strict';

  function EasingRegistry () {
    Map.call(this);
  }
  inherit (EasingRegistry, Map);

  EasingRegistry.prototype.add = function (name, value) {
    if (!isFunction(value)) throw new Error('Registered obj must be a function');
    Map.prototype.add.call(this, name, value);
  };

  EasingRegistry.prototype.replace = function (name, value) {
    if (!isFunction(value)) throw new Error('Registered obj must be a function');
    Map.prototype.replace.call(this, name, value);
  };

  var instance = new EasingRegistry();
  require('./easings')(instance);

  return {
    EasingRegistry : instance
  };
}

module.exports = createEasing;

},{"./easings":3}],5:[function(require,module,exports){
function createAnimatable(lib,mylib){
  'use strict';
  function Animatable(renderel,effectspothorizontal,effectspotvertical){
    mylib.Modifier.call(this,renderel);
    this.changed = this.el.changed;
    this.hSpot = effectspothorizontal || 'center';
    this.vSpot = effectspotvertical || 'middle';
  }
  lib.inherit(Animatable,mylib.Modifier);
  Animatable.prototype.__cleanUp = function(){
    this.vSpot = null;
    this.hSpot = null;
    this.changed = null;
    mylib.Modifier.prototype.__cleanUp.call(this);
  };
  Animatable.prototype.effectSpot = function(){
    var bb,hs,ret = [0,0];
    if('function' === typeof this.el.boundingBox){
      bb = this.el.boundingBox();
    }else{
      hs = this.el.childById(this.el.id+'_hotspot');
      if(hs && hs.content){
        bb = hs.content.boundingBox();
      }
    }
    if(!bb){throw 'No bounding box on '+this.el.id;}
    /*
    switch(this.hSpot){
      case 'left':
        ret[0] = bb[0];
        break;
      case 'center':
        ret[0] = bb[0] + bb[2]/2;
        break;
      case 'right':
        ret[0] = bb[0] + bb[2];
        break;
    }
    switch(this.vSpot){
      case 'top':
        ret[1] = bb[1];
        break;
      case 'middle':
        ret[1] = bb[1] + bb[3]/2;
        break;
      case 'bottom':
        ret[1] = bb[1] + bb[3];
        break;
    }
    return [bb,ret];
    */
    return [bb, [recognizeHorizontalLocation(this.hSpot, bb), recognizeVerticalLocation(this.vSpot, bb)]];
  };


  function recognizeHorizontalLocation (locstring, bb) {
    if (!(lib.isString(locstring) && locstring.length)) {
      return bb[0];
    }
    if (locstring.indexOf('left') === 0) {
      return correctLocation(bb[0], locstring, 'left');
    }
    if (locstring.indexOf('center') === 0) {
      return correctLocation(bb[0] + bb[2]/2, locstring, 'center');
    }
    if (locstring.indexOf('right') === 0) {
      return correctLocation(bb[0] + bb[2], locstring, 'right');
    }
  }

  function recognizeVerticalLocation (locstring, bb) {
    if (!(lib.isString(locstring) && locstring.length)) {
      return bb[1];
    }
    if (locstring.indexOf('top') === 0) {
      return correctLocation(bb[1], locstring, 'top');
    }
    if (locstring.indexOf('middle') === 0) {
      return correctLocation(bb[1] + bb[3]/2, locstring, 'middle');
    }
    if (locstring.indexOf('bottom') === 0) {
      return correctLocation(bb[1] + bb[3], locstring, 'bottom');
    }
  }

  function correctLocation (val, locstring, basiclocstring) {
    var blsl = basiclocstring.length, sign, amount;
    if (blsl >= locstring.length) {
      return val;
    }
    sign = locstring[blsl];
    if (sign === '-') {
      sign = -1;
    } else if (sign === '+') {
      sign = 1;
    } else {
      return val;
    }
    amount = parseFloat(locstring.substring(blsl+1));
    if (lib.isNumber(amount) && amount) {
      val += (sign*amount);
    }
    return val;
  }

  mylib.Animatable = Animatable;
}

module.exports = createAnimatable;

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
function createPathWalker(lib,mylib){
  'use strict';
  function PathWalker(renderel,path) {
    if (!(path && lib.isFunction(path.pointAtLength))) {
      throw new Error('path provided to the constructor must be IsA Path');
    }
    mylib.Modifier.call(this, renderel);
    this.walkPath = path;
    this.pathPercentage = 0;
  }
  lib.inherit(PathWalker, mylib.Modifier);
  PathWalker.prototype.__cleanUp = function () {
    this.pathPercentage = null;
    this.walkPath = null;
    mylib.Modifier.prototype.__cleanUp.call(this);
  };
  PathWalker.prototype.set_dpathpercentage = function (val) {
    var point;
    if (!(lib.isNumber(val) && val)) {
      return false;
    }
    if (!this.walkPath) {
      return false;
    }
    if (!lib.isNumber(this.pathPercentage)) {
      return false;
    }
    this.pathPercentage += val;
    while (this.pathPercentage>100) {
      this.pathPercentage-=100;
    }
    while (this.pathPercentage<0) {
      this.pathPercentage+=100;
    }
    point = this.walkPath.pointAtLength(this.pathPercentage/100);
    this.el.moveTo(point[0], point[1]);
  };
  PathWalker.prototype.get_pathpercentage = function () {
    return this.pathPercentage;
  };
  PathWalker.prototype.set_pathpercentage = function (val) {
    var point;
    if (!lib.isNumber(val)) {
      return false;
    }
    if (!this.walkPath) {
      return false;
    }
    if (!lib.isNumber(this.pathPercentage)) {
      return false;
    }
    this.pathPercentage = val;
    while (this.pathPercentage>100) {
      this.pathPercentage-=100;
    }
    while (this.pathPercentage<0) {
      this.pathPercentage+=100;
    }
    point = this.walkPath.pointAtLength(this.pathPercentage/100);
    this.el.moveTo(point[0], point[1]);
  };
  mylib.PathWalker = PathWalker;
}

module.exports = createPathWalker;

},{}],12:[function(require,module,exports){
function createPrependString(lib,commonlib,mylib){
  'use strict';
  function PrependString (el, minlen, prefix) {
    mylib.Modifier.call(this, el);
    this.minlen = minlen;
    this.prefix = prefix;
  }
  lib.inherit(PrependString, mylib.Modifier);
  PrependString.prototype.__cleanUp = function () {
    this.minlen = null;
    this.prefix = null;
    mylib.Modifier.prototype.__cleanUp.call(this);
  };

  PrependString.prototype.set_text = function (val) {
    if(null === val || 'undefined' === typeof(val)){
      this.el.hide();
      return;
    }
    this.el.set('text',PrependString.DoPrepend(val+'', this.minlen, this.prefix));
    this.el.show();
  };
  PrependString.DoPrepend = function (val, minlen, prefix) {
    var sv = val+'';
    while(sv.length < minlen) {
      sv = prefix+sv;
    }
    return sv;
  };

  mylib.PrependString = PrependString;
}

module.exports = createPrependString;

},{}],13:[function(require,module,exports){
function createRemainingTimeText(lib, mylib) {
  'use strict';
  var Modifier = mylib.Modifier,
  PrependString = mylib.PrependString;

  function RemainingTimeText (el) {
    Modifier.call(this, el);
    this._tsetter = el.set.bind(el, 'text');
    this._interval = null;
    this._ct = null;
    this._tsetter('');
  }
  lib.inherit(RemainingTimeText, Modifier);
  RemainingTimeText.prototype.__cleanUp = function () {
    this._ct = null;
    if (this._interval) clearInterval(this._interval);
    this._interval = null;
    Modifier.prototype.__cleanUp.call(this);
  };

  RemainingTimeText.prototype.set_text = function (time) {
    this._ct = time;
    if (!time || (!isNaN(time) && time < 0)) {
      this.stop();
      this._tsetter('');
      return;
    }

    var mins = Math.floor(time/60);
    var secs = time - mins*60;
    this._tsetter(mins ? mins+':'+PrependString.DoPrepend(secs, 2, '0') : PrependString.DoPrepend(secs, 2, '0'));
  };

  RemainingTimeText.prototype.start = function (time) {
    this.stop();
    this.set('text', time);
    this._interval = setInterval(this._dec.bind(this), 1000);
  };

  RemainingTimeText.prototype._dec = function () {
    this.set('text', this._ct-1);
  };

  RemainingTimeText.prototype.stop = function () {
    if (this._interval) clearInterval(this._interval);
    this._interval = null;
  };

  RemainingTimeText.prototype.resume = function () {
    this.start(this._ct);
  };

  mylib.RemainingTimeText = RemainingTimeText;
}

module.exports = createRemainingTimeText;

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
function createSuffixedValue(lib,commonlib,mylib){
  'use strict';
  function SuffixedValue(el, sufix) {
    mylib.Modifier.call(this, el);
    this.sufix = sufix;
  }
  lib.inherit(SuffixedValue, mylib.Modifier);
  SuffixedValue.prototype.__cleanUp = function () {
    this.sufix = null;
    mylib.Modifier.prototype.__cleanUp.call(this);
  };

  SuffixedValue.prototype.set_text = function (val) {
    if (null === val || 'undefined' === typeof(val)) {
      this.el.set('text', '');
      return;
    }
    this.el.set('text', val+''+this.sufix);
  };

  function PercentageValue (el) {
    SuffixedValue.call(this, el, '%');
  }
  lib.inherit(PercentageValue, SuffixedValue);

  mylib.PercentageValue = PercentageValue;
  mylib.SuffixedValue= SuffixedValue;

}

module.exports = createSuffixedValue;

},{}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
function createTextWithOutline(lib, mylib) {
  'use strict';
  function TextWithOutline (renderel) {
    mylib.CompositeTextGroup.call(this, renderel, ['text', 'outline']);
  }
  lib.inherit(TextWithOutline, mylib.CompositeTextGroup);
  mylib.TextWithOutline = TextWithOutline;
}

module.exports = createTextWithOutline;

},{}],19:[function(require,module,exports){
function createTextWithShadow(lib,mylib){
  'use strict';
  function TextWithShadow(renderel){
    mylib.CompositeTextGroup.call(this, renderel, ['text', 'shadow', 'blur']);
  }
  lib.inherit(TextWithShadow,mylib.CompositeTextGroup);
  mylib.TextWithShadow = TextWithShadow;
}

module.exports = createTextWithShadow;

},{}],20:[function(require,module,exports){
function createThousandSeparatedText(lib,commonlib,mylib){
  'use strict';
  function ThousandSeparatedText (el, separator) {
    mylib.Modifier.call(this, el);
    this.separator = separator || ' ';
  }

  lib.inherit(ThousandSeparatedText, mylib.Modifier);
  ThousandSeparatedText.prototype.__cleanUp = function () {
    mylib.Modifier.prototype.__cleanUp.call(this);
  };

  ThousandSeparatedText.prototype.set_text = function (text) {
    this.el.set('text', lib.thousandSeparate(text, this.separator));
  };

  mylib.ThousandSeparatedText = ThousandSeparatedText;
}

module.exports = createThousandSeparatedText;

},{}],21:[function(require,module,exports){
function createZoomer(lib,mylib){
  'use strict';
  function Zoomer(renderel,effectspothorizontal,effectspotvertical){
    mylib.Animatable.call(this,renderel,effectspothorizontal,effectspotvertical);
    this.zoom = 1;
    this.transformMatrix = this.el.get('transformMatrix').slice();
    this.eSpot = this.effectSpot();
  }
  lib.inherit(Zoomer,mylib.Animatable);
  Zoomer.prototype.__cleanUp = function(){
    this.transformMatrix = null;
    this.zoom = null;
    mylib.Animatable.prototype.__cleanUp.call(this);
  };
  Zoomer.prototype.set_zoom = function(z){
    this.zoom = z;
    var tm = this.transformMatrix.slice(), es = this.eSpot,dx=es[1][0]-es[0][0],dy=es[1][1]-es[0][1];
    tm[0]*=this.zoom;
    tm[3]*=this.zoom;
    tm[4]+=(es[0][0]+dx)*(1-this.zoom);
    tm[5]+=(es[0][1]+dy)*(1-this.zoom);
    this.el.set('transformMatrix',tm);
  };
  Zoomer.prototype.set_dzoom = function(dz){
    this.set('zoom',this.zoom+dz);
  };
  mylib.Zoomer = Zoomer;
}

module.exports = createZoomer;

},{}],22:[function(require,module,exports){
function createHelpers(lib, mylib) {
  'use strict';
  var cnt = 0;

  var Animator = mylib.Animator,
    q = lib.q,
    qlib = lib.qlib;

  function _cleanUpListener (listener) {
    listener.destroy();
    listener = null;
  }

  function AnimatorPromise (object, animation_props, defer) {
    this.animation = new Animator (object, animation_props);
    this.defer = defer || lib.q.defer();
    this._listener = null;

    if (!this.animation.destroyed){
      this.defer.resolve(true);
      lib.runNext (this.destroy.bind(this));
    }else{
      this._listener = this.animation.destroyed.attach(this.defer.resolve.bind(this.defer, true));
      this.defer.promise.done(this.destroy.bind(this));
    }
  }

  AnimatorPromise.prototype.destroy = function () {
    if (this._listener) this._listener.destroy();
    this._listener = null;
    if (this.animation) {
      this.animation.destroy();
    }
    this.animation = null;
    this.defer = null;
  };


  function animateAndPromise (object, animation_props, defer) {
    var animator = new AnimatorPromise(object, animation_props, defer);
    animator.defer.promise.done (_cleanup.bind(null, animator));
    return animator.defer.promise;
  }

  function _cleanup (animator) {
    animator = null;
  }


  function AnimationSequence () {
    this.animations = null;
    this.job = null;
    this.cnt = cnt++;
  }

  AnimationSequence.prototype.destroy = function () {
    this.stop();
    this.animations = null;
    if (this.job) this.job.destroy();
    this.job = null;
  };

  AnimationSequence.prototype.go = function (list) {
    this.animations = new Array(list.length);
    var jobs = new Array(list.length);

    for (var i = 0; i < list.length; i++) {
      this.animations[i] = null;
      jobs[i] = this._toJob.bind(this, i, list[i]);
    }
    this.job = new qlib.PromiseExecutorJob(jobs);
    return this.job.go();
  };

  AnimationSequence.prototype._toJob = function (index, list) {
    if (!this.animations) return q.resolve(true);

    //console.log('will start promise job on index ', index, this.cnt);
    this.animations[index] = new AnimatorPromise (list.object, list.params);
    var p = this.animations[index].defer.promise;
    p.done(this._stopJob.bind(this, index));
    return p;
  };

  AnimationSequence.prototype._stopJob = function (index) {
    if (!this.animations) return;
    this.animations[index] = null;
  };

  AnimationSequence.prototype.stop = function () {
    //console.log('will stop sequence ...', this.cnt);
    if (!this.job || !this.animations) return;
    this.job.destroy();
    this.job = null;
    for (var i = 0; i < this.animations.length; i++) {
      if (this.animations[i]) {
        //console.log('animation on index ', i, 'found');
        this.animations[i].destroy();
        this.animations[i] = null;
      }
    }
    this.animations = null;
  };

  mylib.helpers.animateAndPromise = animateAndPromise;
  mylib.helpers.AnimatorPromise = AnimatorPromise;
  mylib.helpers.AnimationSequence = AnimationSequence;
}

module.exports = createHelpers;

},{}]},{},[1]);
