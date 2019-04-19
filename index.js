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
