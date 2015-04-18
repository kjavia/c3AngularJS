c3AngularJS
====
Like [C3.js][http://c3js.org/] & [AngularJs][https://angularjs.org/] and want
to use them together with ease?

c3AngularJS is a javascript library that does exactly that. It brings in an
AngularJS directive and helper functions to easily incorporate C3.js charts
into your AngularJS project.

To have C3 charts in your Angular project, simply add the c3-charts.angular.js
in your project, add a dependancy to the c3-angular module as below.

```javascript
  angular.module('demoApp', ['c3-charts']);

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

    // wait for the directive to be attached.
    $timeout(function() {
      // trigger an event that will render the chart
      $scope.$broadcast('c3.generate', {
        group: vm.group
      });
    });
  }
})();
```
In your template add below.
```html

<div ng-controller='Example1Controller as vm'>
  <h3>Example 1</h3>
  <p>
    A basic example showing usage of 'raw' object which
    contains all options including data for the C3 chart.
    It is compatible with the parameter passed to the c3.generate function.
  </p>
  <div c3-chart group='{{vm.group}}' id='{{vm.elementId}}' raw='vm.data'></div>
  <div ng-include src='"tabs.html"'></div>
</div>

```

