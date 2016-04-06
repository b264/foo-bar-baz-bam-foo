(function (angular) {

  // Create all modules and define dependencies to make sure they exist
  // and are loaded in the correct order to satisfy dependency injection
  // before all nested files are concatenated by Gulp

  // Config
  angular.module('foobarbazbamfoo.config', [])
      .value('foobarbazbamfoo.config', {
          debug: true
      });

  // Modules
  
  angular.module('foobarbazbamfoo.directives', []);
  
  
  
  angular.module('foobarbazbamfoo.services', []);
  
  
    angular.module('foobarbazbamfoo.controllers', []);
  
  angular.module('foobarbazbamfoo',
      [
        'foobarbazbamfoo.config',
        'foobarbazbamfoo.directives',
        'foobarbazbamfoo.services',
        'foobarbazbamfoo.controllers'
      ]);

})(angular);
