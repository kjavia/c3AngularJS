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


    vm.renderCharts = function(data) {
      $("[c3-chart]").children().remove(); //clear the charts
      $scope.$broadcast('c3.generate', data);
    }
  }
})();
