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
        })
        .state('example3', {
          url: '/example3',
          templateUrl: 'example3.html',
          data: {
            title: 'Example 3 - Chart Type'
          }
        })
        .state('example4', {
          url: '/example4',
          templateUrl: 'example4.html',
          data: {
            title: 'Example 4 - Multiple Groups'
          }
        })
        .state('example5', {
          url: '/example5',
          templateUrl: 'example5.html',
          data: {
            title: 'Example 5 - Change Chart Type'
          }
        })
        .state('example6', {
          url: '/example6',
          templateUrl: 'example6.html',
          data: {
            title: 'Example 6 - Change Chart Size'
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
