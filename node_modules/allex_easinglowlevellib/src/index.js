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
