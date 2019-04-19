var expect = require('chai').expect,
  allexlib = require('allexlib'),
  Lib = require('../src')(allexlib.inherit, allexlib.isFunction, allexlib.Map);


describe ('Init test', function () {
  it ('Test initialization', function () {
    expect(Lib.EasingRegistry).to.be.instanceof(allexlib.Map);
  });
});
