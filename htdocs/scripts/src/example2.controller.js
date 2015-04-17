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
