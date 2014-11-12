/*Fantastic App V2
Written by: Spencer Brown, copyright 2014

Main module that contains the ng-app. Inject the others modules into this module
Eventually add lazy loading. This page will also hold the config (Providers for routing,
HTTP, and location)
*/

var app = angular.module('FantasticAlphaV2', [
	'ngRoute',
	'ngSanitize', 
	'ui.bootstrap',
	'NavDRCT',
	'CartDRCT',
	'StoreDRCT',
	'VideoDRCT',
	'BarDRCT',
	'OdometerDRCT',
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

app.controller('VideoController',
	["$sce", function ($sce) {
		this.config = {
			sources: [
				{src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/videos/videogular.mp4"), type: "video/mp4"},
				{src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/videos/videogular.webm"), type: "video/webm"},
				{src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/videos/videogular.ogg"), type: "video/ogg"}
			],
			theme: "css/video/videogular.css",
			plugins: {
				poster: "http://www.videogular.com/assets/images/videogular.png"
			}
		};
	}]
);

