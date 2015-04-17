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

(function() {
  'use strict';
  angular.module('demoApp')
    .controller('Example1Controller', example1Ctrl);

  example1Ctrl.$inject = ['$scope', '$timeout'];

  function example1Ctrl($scope, $timeout) {
    var vm = this;
    vm.group = 'group1';
    vm.elementId = 'example1';

    vm.data = {
      bindto: '#' + this.elementId,
      data: {
        columns: [
          ['data1', 30, 200, 100, 400, 150, 250],
          ['data2', 50, 20, 10, 40, 15, 25]
        ]
      }
    };
    $timeout(function() {
      //give it a sec for the directive to be attached.
      $scope.$broadcast('c3.generate', {
        group: vm.group
      });
    });
  }
})();

(function() {
  'use strict';
  angular.module('demoApp')
    .controller('Example2Controller', example2Ctrl);

  example2Ctrl.$inject = ['$scope', '$timeout', '$state'];

  function getOnChartClick($scope) {
    return function(dataItem, element) {
      $scope.vm.clickItem = dataItem;
      $scope.$apply();
    }
  }

  function getOnChartMouseOver($scope) {
    return function(dataItem, element) {
      $scope.vm.mouseOverItem = dataItem;
      $scope.$apply();
    }
  }

  function getOnChartMouseOut($scope) {
    return function(dataItem, element) {
      $scope.vm.mouseOutItem = dataItem;
      $scope.$apply();
    }
  }

  function getOnChartSelected($scope) {
    return function(dataItem, element) {
      $scope.vm.selectedItem = dataItem;
      $scope.$apply();
    }
  }

  function getOnChartUnSelected($scope) {
    return function(dataItem, element) {
      $scope.vm.unSelectedItem = dataItem;
      $scope.$apply();
    }
  }

  function example2Ctrl($scope, $timeout, $state) {
    var vm = this;
    vm.group = 'group1';
    vm.elementId = 'example2';
    vm.state = $state;
    vm.data = {
      bindto: '#' + this.elementId,
      data: {
        onclick: getOnChartClick($scope),
        onmouseover: getOnChartMouseOver($scope),
        onmouseout: getOnChartMouseOut($scope),
        onselected: getOnChartSelected($scope),
        onunselected: getOnChartUnSelected($scope),
        selection: {
          enabled: true,
          draggable: true,
        },
        columns: [
          ['data1', 30, 200, 100, 400, 150, 250],
          ['data2', 50, 20, 10, 40, 15, 25]
        ]
      }
    };
    $timeout(function() {
      //give it a sec for the directive to be attached.
      $scope.$broadcast('c3.generate', {
        group: vm.group
      });
    });
  }
})();
