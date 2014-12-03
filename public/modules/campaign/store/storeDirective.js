/*
Store Directive
Written by: Spencer Brown, copyright 2014

//Description
This hold the information about the incentives.
It is populated by the store factory. There will be DOM manipulation! whooop

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

angular.module('StoreDRCT', ['StoreCTRL']).directive('fnStore', function(){
	return {
		restrict: 'E',
		replace: true,
		transclude: false,
		templateUrl: 'modules/campaign/store/storeTemplate.html',
		controllerAs: 'store',
		controller: 'StoreController',
		link: function(scope, elements, attrs, controller) {
			$('#incentive_options div').click(function(){
				$('html,body').animate({
		            scrollTop: $('#reward_bar_div').offset().top - 50
		        }, 600);
			});
		}
	};
});