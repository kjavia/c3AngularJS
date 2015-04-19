/* global angular */
(function() {
  'use strict';
  angular.module('demoApp')
    .controller('Example7Controller', example7Ctrl);

  example7Ctrl.$inject = ['$scope', '$timeout'];

  function example7Ctrl($scope, $timeout) {
    var vm = this;
    vm.group = 'group1';
    vm.elementId = 'example7';

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

    vm.loadData = function() {
      var newData = {
          columns: [
            ['data1', 100, 150, 250, 250, 30, 120],
            ['data2', 200, 130, 40, 30, 55, 15]
          ]
        },
        eventData = {
          id: 'example7',
          data: newData
        };
      $scope.$broadcast('c3.load', eventData);
    };
  }
})();
