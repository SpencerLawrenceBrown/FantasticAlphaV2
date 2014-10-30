/*
NGRepeat Watcher Directive
Written by: Spencer Brown, copyright 2014

//Description:
This directive watches an ng-repeat element and fires an event when it finishes loading. This is necessary to
know in order to perform DOM manipulation on the elements of the ng-repeat

//Components:
	-emits an event when the ngrepeat load is completed

//Map:
	-Usedby:
		-barTemplate.html
	-Listened for by:
		-barDirective.js
	-contains:
		-none
*/

angular.module('RepeatDRCT', []).directive('fnRepeatCompletionWatcher', function(){
	return{
		restrict: 'A',
		replace: false,
		transclude: false,
		link: function(scope, element, attrs){
			//If the last element in the ng-repeat, emit an event
			if (scope.$last){
				var eventName = attrs.fnContext + "RepeatLoaded";
				scope.$emit(eventName);
			}
		}
	}
});
