/*
Homepage Controller
Written by: Spencer Brown, copyright 2015

//Description
This controller manages the homepage and connects to the campaign meta factory

//Components
	-References to:
		-campaignMetaFactory

//Map
	-Used by:
		-App Routing
	-Contains:
		-none
*/

angular.module('HomePageCTRL', ['MetaFCTR']).controller('HomepageController', [ 'CampaignsMetaFactory', function(MetaFactory){
	//Model connection
	this.model = MetaFactory;
	$("meta[name='viewport']").attr('content', 'width=device-width, initial-scale=1');
}]);