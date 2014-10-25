/*
Progress Bar Directive
Written by: Spencer Brown, copyright 2014

//Description:
This directive does all the DOM manipulation for the Progress bar.

//Components:
	-Join now button - updates fanbase numbers
	-Bar rewards - items that are unlocked
	-Bar
		-pending bar - takes into account items in user's cart
		-current bar - total amount spent

//Map:
	-Usedby:
		-campaignTemplate.html
	-contains:
		-barController.js
*/

angular.module('BarDRCT', ['BarCTRL']).directive('fnBar', function(){
	// Runs during compile
	return {
		restrict: 'E',
		replace: true,
		transclude: false,
		templateUrl: 'modules/campaign/progress_bar/barTemplate.html',
		controllerAs: 'bar',
		controller: 'BarController',
		link: function(scope, element, attrs, controller) {
		}
	};
});
