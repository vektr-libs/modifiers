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
