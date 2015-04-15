(function() {
  'use strict';
  angular.module('demoApp')
    .controller('Example1Controller', example1Ctrl);

  function example1Ctrl() {
    this.test = 'Hello World';
  }

})();
