/* global angular */
(function() {
  'use strict';
  angular.module('demoApp')
    .controller('Example5Controller', example5Ctrl);

  example5Ctrl.$inject = ['$scope', '$timeout'];

  function example5Ctrl($scope, $timeout) {
    var vm = this;
    vm.group = 'group1';
    vm.elementId = 'example5';

    vm.data = {
      bindto: '#' + this.elementId,
      data: {
        columns: [
          ['data1', 30, 200, 100, 400, 150, 250],
          ['data2', 50, 20, 10, 40, 15, 25]
        ]
      }
    };
    // wait for the directive to be attached.
    $timeout(function() {
      // trigger an event that will render the chart
      $scope.$broadcast('c3.generate', {
        group: vm.group
      });
    });

    vm.transformChart = function(type, dataName) {
      var eventData = {
        id: 'example5',
        type: type
      };

      if (dataName) {
        eventData.dataName = dataName;
      }

      $scope.$broadcast('c3.transform', eventData);
    };
  }
})();
