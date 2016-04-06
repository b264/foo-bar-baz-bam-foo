(function (angular) {

  // Create all modules and define dependencies to make sure they exist
  // and are loaded in the correct order to satisfy dependency injection
  // before all nested files are concatenated by Gulp

  // Config
  angular.module('fooBarBazBamFoo.config', [])
      .value('fooBarBazBamFoo.config', {
          debug: true
      });

  // Modules

  angular.module('fooBarBazBamFoo.directives', []);



  angular.module('fooBarBazBamFoo.services', []);


    angular.module('fooBarBazBamFoo.controllers', []);

  angular.module('fooBarBazBamFoo',
      [
        'fooBarBazBamFoo.config',
        'fooBarBazBamFoo.directives',
        'fooBarBazBamFoo.services',
        'fooBarBazBamFoo.controllers'
      ]);

})(angular);
