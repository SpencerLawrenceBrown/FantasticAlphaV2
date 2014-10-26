/*Odometer Directive
This Directive works for the odometer element in the progress bar. Will allow it to be updated off the scope!
Which is badass
*/

angular.module('OdometerDRCT', []).directive('odometerDirective', function(){
 return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      
      //Creates new instance of odometer for the element
    	new Odometer({el: element[0], value: scope[attrs.odometer]});
    	
    	//Watch for changes and update the element value (causing odometer to redraw)
    	scope.$watch(attrs.odometer, function(val) {
    		element.text(val);
      });
    }
  };
});