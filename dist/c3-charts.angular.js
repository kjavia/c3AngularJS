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
    var chartDefinition = {
      link: link,
      restrict: 'A',
      scope: {
        id: '@',
        group: '@',
        raw: '='
      },
      template: '<div />'
    };

    return chartDefinition;
  }

  function link(scope, element) {
    var chart;

    function isFieldMatching(scope, data, fieldName) {
      if (data[fieldName] && scope[fieldName]) {
        return (data[fieldName].localeCompare(scope[fieldName]) === 0);
      }
      return false;
    }

    function isEventApplicable(scope, data) {

      if (!data || (!data.group && !data.id)) {
        // if event does not target specific group or id
        return true;
      }

      if (data.group && isFieldMatching(scope, data, 'group')) {
        return true;
      } else if (data.id && isFieldMatching(scope, data, 'id')) {
        return true;
      } else if (!data.id && !data.group) {
        return true;
      }
      return false;
    }

    function onGenerateCharts(event, data) {
      if (isEventApplicable(scope, data)) {
        scope.raw.bindto = scope.raw.bindto || '#' + scope.id;
        chart = c3.generate(scope.raw);
      }
    }

    function onChartResize(event, data) {
      var width, height, size;
      if (chart && isEventApplicable(scope, data)) {
        if (data) {
          width = data.width;
          height = data.height;
        }
        size = {
          width: width,
          height: height
        };
        chart.resize(size);
      }
    }

    function onChartTransform(event, data) {
      if (chart && isEventApplicable(scope, data)) {
        var args = [data.type, data.dataName];
        chart.transform.apply(this, args);
      }
    }

    scope.$on('c3.generate', onGenerateCharts);
    scope.$on('c3.resize', onChartResize);
    scope.$on('c3.transform', onChartTransform);
  }

})();


(function() {
  'use strict';



})(window);
