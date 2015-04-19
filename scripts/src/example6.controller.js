/* global angular */
(function() {
    'use strict';
    angular.module('demoApp')
      .controller('Example6Controller', example6Ctrl);

  example6Ctrl.$inject = ['$scope', '$timeout'];

  function example6Ctrl($scope, $timeout) {
    var vm = this;
    vm.group = 'group1';
    vm.elementId = 'example6';

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

    vm.resizeChart = function() {
      var eventData = {
        id: 'example6',
        width: 500,
        height: 200
      };
      $scope.$broadcast('c3.resize', eventData);
    };
  }
})();
