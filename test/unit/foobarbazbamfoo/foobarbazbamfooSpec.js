'use strict';

describe('', function() {

  var module;
  var dependencies;
  dependencies = [];

  var hasModule = function(module) {
  return dependencies.indexOf(module) >= 0;
  };

  beforeEach(function() {

  // Get module
  module = angular.module('fooBarBazBamFoo');
  dependencies = module.requires;
  });

  it('should load config module', function() {
    expect(hasModule('fooBarBazBamFoo.config')).to.be.ok;
  });




  it('should load directives module', function() {
    expect(hasModule('fooBarBazBamFoo.directives')).to.be.ok;
  });



  it('should load services module', function() {
    expect(hasModule('fooBarBazBamFoo.services')).to.be.ok;
  });



    it('should load controllers module', function() {
      expect(hasModule('fooBarBazBamFoo.controllers')).to.be.ok;
    });


});
