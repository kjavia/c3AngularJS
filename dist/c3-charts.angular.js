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
})();

/* global angular,c3 */
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
         <div c3-chart raw='myC3CompatibleObject' group='finance'
          on-chart-click='onClick' on-chart-mouse-over='onMouseOver'></div>
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
        id: '@',
        group: '@',
        raw: '='
      },
      template: '<div />'
    };

    return chart;
  }

  function link(scope, element) {
    function onGenerateCharts(event, data) {
      // if the generate chart event is meant for this instance or all
      if ((!scope.group || !data.group) ||
        (scope.group && data.group && scope.group.localeCompare(data.group) === 0)) {
        scope.raw.bindto = scope.raw.bindto || element;
        c3.generate(scope.raw);
      }
    }

    scope.$on('c3.generate', onGenerateCharts);
  }

})();


(function() {
  'use strict';



})(window);
