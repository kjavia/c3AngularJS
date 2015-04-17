(function() {
  'use strict';
  angular.module('demoApp', ['ui.router', 'c3-charts'])
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('example1', {
          url: '/example1',
          templateUrl: 'example1.html',
          data: {
            title: 'Example 1 - Basic'
          }
        })
        .state('example2', {
          url: '/example2',
          templateUrl: 'example2.html',
          data: {
            title: 'Example 2 - Mouse Events'
          }
        });
      $urlRouterProvider.otherwise("/example1");
    })
    .directive('prismCode', [
      '$timeout',
      function($timeout) {
        return {
          restrict: 'A',
          priority: 0,
          compile: function(tElement, tAttributes, transclude) {
            return {
              post: function(scope, element, attributes) {
                var $element = $(element);
                $timeout(function() {
                  Prism.fileHighlight();
                }, 0);
              }
            }
          }
        }
      }
    ])
    .run(function($rootScope, $state) {
      $rootScope.$state = $state;
      $rootScope.allStates = $.grep($state.get(), function(s) {
        return s.name.length > 0;
      });;
    });

})();
