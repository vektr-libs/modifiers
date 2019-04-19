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
