/*Fantastic App V2
Written by: Spencer Brown, copyright 2014

Main module that contains the ng-app. Inject the others modules into this module
Eventually add lazy loading. This page will also hold the config (Providers for routing,
HTTP, and location)
*/

var app = angular.module('FantasticAlphaV2', [
	'ngRoute', 
	'ui.bootstrap', 
	'NavDRCT',
	'CartDRCT',
	'StoreDRCT',
	'BarDRCT',
	'OdometerDRCT',
	'CampaignCTRL',
	'RepeatDRCT'
]);

// configure our routes
app.config(function($routeProvider) {
		$routeProvider
			// route for the home page
			.when('/', {
				controller : 'CampaignController',
				controllerAs: 'campaign',
				templateUrl : 'modules/campaign/campaignTemplate.html'
			});
});

