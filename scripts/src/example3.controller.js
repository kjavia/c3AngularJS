/* global angular */
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
