/*
Incentive Directive
Written by: Spencer Brown, copyright 2015

//Description
This hold the information for each incentive.
It is populated by the store factory. There will be DOM manipulation!

//Components
	-Different divs (buttons?) for each store item.
	-An area for description of the items

//Controller: StoreController

//Map
	-Usedby:
		-campaignTemplate.html
	-Contains:
		-StoreController
*/

angular.module('IncentiveDRCT',[]).directive('fnIncentive', function(){
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		templateUrl: 'modules/user/campaign/store/incentiveTemplate.html',
		scope:{
			incentives:"=tier",
			visible:"=",
			label:"=",
			current:"=",
			header:"@title",
			choose:"&",
			add:"&"
		},
		link: function(scope, element, attrs){
		}
	};
});