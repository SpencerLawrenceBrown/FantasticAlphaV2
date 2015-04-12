/*
Tab Directive
Written by: Spencer Brown, copyright 2014

//Description
This displays the tabs and their contents.

//Components
	-Social
		-Producer
		-Fans
		-Updates

//Controller: CampaignController

//Map
	-Usedby:
		-campaignTemplate.html
	-Contains:
		-CampaignController instance
*/

angular.module('TabsDRCT', ['CampaignCTRL']).directive('fnTabs', function(){
	return {
		restrict: 'E',
		replace: true,
		transclude: false,
		templateUrl: 'modules/campaign/tabs/tabsTemplate.html',
		controllerAs: 'campaign',
		controller: 'CampaignController',
		link: function(scope, element, attrs, cont){
		}
	}
});