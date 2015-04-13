/*Fantastic App V2
Written by: Spencer Brown, copyright 2014

Main module that contains the ng-app. Inject the others modules into this module
Eventually add lazy loading. This page will also hold the config (Providers for routing,
HTTP, and location)
*/

var app = angular.module('FantasticAlphaV2', [
	//Libs
	'ngRoute',
	'ngSanitize', 
	'ui.bootstrap',
	//Custom
	'NavDRCT',
	'CartDRCT',
	'StoreDRCT',
	'VideoDRCT',
	'TabsDRCT',
	'BarDRCT',
	'OdometerDRCT',
	'CheckoutDRCT',
	'RepeatDRCT',
	'UserFormCTRL',
	'UserPageCTRL',
	'HomePageCTRL',
	//Analytics
	'angulartics',
	'angulartics.segment.io'
]);

// configure our routes
app.config(function($routeProvider, $locationProvider, $httpProvider) {
	$routeProvider
		//route for home page
		.when('/', {
			controller : 'HomepageController',
			controllerAs : 'homepage',
			templateUrl : 'modules/homepage/homeTemplate.html'
		})
		.when('/create', {
			controller : 'HomepageController',
			controllerAs : 'homepage',
			templateUrl : 'modules/studio/creation/creationTemplate.html'
		})
		// route for campaigns
		.when('/campaign/:campaign_id', {
			controller : 'CampaignController',
			controllerAs: 'campaign',
			templateUrl : 'modules/user/campaign/campaignTemplate.html'
		})
		.when('/faq', {
			templateUrl: 'modules/works/worksTemplate.html'
		})
		//Log-in
		.when('/login', {
			controller : 'UserFormController',
			controllerAs : 'account',
			templateUrl : 'modules/helpers/auth/loginTemplate.html'
		})
		//Register
		.when('/register', {
			controller : 'UserFormController',
			controllerAs : 'account',
			templateUrl : 'modules/helpers/auth/registerTemplate.html'
		})
		.when('/user', {
			controller : 'UserPageController',
			controllerAs : 'user',
			templateUrl : 'modules/user/userTemplate.html',
			resolve: {
				loggedin: ['AuthFactory', function(AuthFactory){
    				AuthFactory.checkLoggedIn();
    			}]
			}
		});
	// Use HTML5 History API
	// $locationProvider.html5Mode(true);

	//Look for 401 - when the user is invalid, and send to the login page
	$httpProvider.interceptors.push(function($q, $location) {
	  return function(promise){
	  	return promise.then(// Success: just return the response 
				function(response){ 
					return response; 
				}, 
				// Error: check the error status to get only the 401 
				function(response) { 
					if (response.status === 401) {
						$location.url('/'); 
					}
					return $q.reject(response);
				} 
			); 
	  	};
	});
});
