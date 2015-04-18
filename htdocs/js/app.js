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
    vm.group = 'group2';
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

(function() {
  'use strict';
  angular.module('demoApp')
    .controller('Example3Controller', example3Ctrl);

  example3Ctrl.$inject = ['$scope', '$timeout'];

  function example3Ctrl($scope, $timeout) {
    var vm = this;
    vm.group = 'group3';
    vm.elementId = 'example3';

    vm.data = {
      bindto: '#' + this.elementId,
      data: {
        columns: [
          ['data1', 30],
          ['data2', 120],
        ],
        type: 'donut'
      },
      donut: {
        title: "Iris Petal Width"
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
    .controller('Example4Controller', example1Ctrl);

  example1Ctrl.$inject = ['$scope', '$timeout'];

  function example1Ctrl($scope, $timeout) {
    var i, vm = this;
    vm.elementId = 'example4';
    vm.items = [];

    // add a line chart to group1
    vm.items.push({
      elementId: 'chart1',
      group: 'group1',
      data: {
        columns: [
          ['data1', 30, 200, 100, 400, 150, 250],
          ['data2', 50, 20, 10, 40, 15, 25]
        ]
      }
    });
    // add a bar chart to group1
    vm.items.push({
      elementId: 'chart2',
      group: 'group1',
      data: {
        columns: [
          ['data1', 30, 200, 100, 400, 150, 250],
          ['data2', 130, 100, 140, 200, 150, 50]
        ],
        type: 'bar'
      },
      bar: {
        width: {
          ratio: 0.5
        }
      }
    });

    // add a area-spline chart to group1
    vm.items.push({
      elementId: 'chart3',
      group: 'group1',
      data: {
        columns: [
          ['data1', 300, 350, 300, 0, 0, 120],
          ['data2', 130, 100, 140, 200, 150, 50]
        ],
        types: {
          data1: 'area-spline',
          data2: 'area-spline'
            // 'line', 'spline', 'step', 'area', 'area-step' are also available to stack
        },
        groups: [
          ['data1', 'data2']
        ]
      }
    });

    // add a pie chart to group 2
    vm.items.push({
      elementId: 'chart4',
      group: 'group2',
      data: {
        columns: [
          ['data1', 30],
          ['data2', 120],
        ],
        type: 'pie',
      }
    });

    // add a donut chart to group 2
    vm.items.push({
      elementId: 'chart5',
      group: 'group2',
      data: {
        columns: [
          ['data1', 30],
          ['data2', 120],
        ],
        type: 'donut',
      },
      donut: {
        title: "Iris Petal Width"
      }
    });

    // add a gauge chart to group 2
    vm.items.push({
      elementId: 'chart6',
      group: 'group2',
      data: {
        columns: [
          ['data', 91.4]
        ],
        type: 'gauge',
        gauge: {
          min: 0,
          max: 100,
          units: ' %',
          width: 39
        }
      }
    });


    vm.renderCharts = function(groupName) {
      $scope.$broadcast('c3.generate', {
        group: groupName
      });
    }
  }
})();
