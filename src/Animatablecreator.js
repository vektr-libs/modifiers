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
