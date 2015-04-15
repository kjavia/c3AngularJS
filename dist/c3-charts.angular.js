/* global angular */
/**
 * @ngdoc overview
 * @name c3-charts
 *
 * @description
 * Provides directives and services to easily incorporate C3.js
 * charts in your AngularJS project
 *
 */
(function() {
  'use strict';
  angular.module('c3-charts', []);
  console.log('testing');
})();

/* global angular */
/**
 * @ngdoc directive
 * @name c3-charts:c3-chart
 * @scope
 * @restrict A
 * @description A basic directive for the c3.js chart library
 * @element div
 * @example
   <example module="c3-charts">
     <file name="index.html">
         <div c3-chart raw='myC3CompatibleObject' group='finance' on-chart-click='onClick' on-chart-mouse-over='onMouseOver'></div>
     </file>
   </example>
 * @raw {object} A object member of the controller scope
 * that will completely drive the generation of the c3 widget.
 */
(function() {
  'use strict';
  angular.module('c3-charts').directive('c3Chart', c3Chart);
  function c3Chart() {
    var chart = {
      link: link,
      restrict: 'A',
      scope: {
        group: '@',
        onChartclick: '&',
        onChartMouseOver: '&',
        onChartMouseOut: '&',
        raw: '='
      },
      template: '<div />'
    };

    function link(scope, element, attrs) {
      element.text('hi this is good');
    }
    return chart;
  }
})();


(function() {
  'use strict';



})(window);
