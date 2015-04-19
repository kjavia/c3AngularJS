/* global angular, $, Prism */
(function() {
  'use strict';
  angular.module('demoApp', ['ui.router', 'c3-charts'])
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('example1', {
          url: '/example1',
          templateUrl: 'example1.html',
          data: {
            title: '1 - Basic'
          }
        })
        .state('example2', {
          url: '/example2',
          templateUrl: 'example2.html',
          data: {
            title: '2 - Mouse Events'
          }
        })
        .state('example3', {
          url: '/example3',
          templateUrl: 'example3.html',
          data: {
            title: '3 - Chart Type'
          }
        })
        .state('example4', {
          url: '/example4',
          templateUrl: 'example4.html',
          data: {
            title: '4 - Multiple Groups'
          }
        })
        .state('example5', {
          url: '/example5',
          templateUrl: 'example5.html',
          data: {
            title: '5 - Change Chart Type'
          }
        })
        .state('example6', {
          url: '/example6',
          templateUrl: 'example6.html',
          data: {
            title: '6 - Change Chart Size'
          }
        })
        .state('example7', {
          url: '/example7',
          templateUrl: 'example7.html',
          data: {
            title: '7 - Load New Data'
          }
        })
        .state('example8', {
          url: '/example8',
          templateUrl: 'example8.html',
          data: {
            title: '8 - Chart Instances'
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
          compile: function() {
            return {
              post: function() {
                $timeout(function() {
                  Prism.fileHighlight();
                }, 0);
              }
            };
          }
        };
      }
    ])
    .run(function($rootScope, $state) {
      $rootScope.$state = $state;
      $rootScope.allStates = $.grep($state.get(), function(s) {
        return s.name.length > 0;
      });
    });

})();
