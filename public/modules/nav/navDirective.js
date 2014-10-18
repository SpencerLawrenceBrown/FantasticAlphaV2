/* 
Nav Bar Directive
Written by: Spencer Brown, copyright 2014

//Description
This directive holds the nav bar directive.
It handles the nav display and interactivity.

//Components
	-Nav Logo: links to homepage & contains logo image
	-Tabs:
		-Browse Campaigns: Contains links to all projects
		-Create Campaign: For creators **NOT IMPLEMENTED**
		-Search Campaigns: Search existing campaigns
		-Cart: Access to cart
		-Login/Register: Links to login page
//Map
Used by:
	-Index.html
Contains:
	-NavigationController: Communications with CampaignsMetaFactory
	-CartDirective: Manages the display of the cart
*/


angular.module('NavDRCT', ['NavCTRL']).directive('fnNav', function(){
	return {
		restrict: 'E',
		replace: true, //Fully replaces the fn-nav element
		transclude: false, //Currently set to false, can't forsee any reason that would change
		templateUrl: 'modules/nav/navTemplate.html', //Loads the html template
		controllerAs:'nav', //Refer to the controller as 'nav' so nav.foo
		controller: 'NavController' //This controller comes from the 'NavCTRL' module that is injected
		//No DOM manipulation yet. If needed, uncomment below
		// link: function($scope, iElm, iAttrs, controller) {
		// }
	};
});