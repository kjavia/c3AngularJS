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
