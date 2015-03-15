/*
Campaign Controller
Written by: Spencer Brown, copyright 2014

//Description
This controller will communicate between the campaign view and the campaign factory. Just like every other controller.

//Components
	-References to:
		-Video url
		-Copy about Campaign
		-Embed for social
		-content for blog

//Map
	-Used by:
		-BarTemplate: For the rewards
		-CampaignTemplate
		-App Routing
	-Contains:
		- campaignFactory
*/

angular.module('CampaignCTRL', ['CampaignFCTR', 'BarFCTR']).controller('CampaignController', ['CampaignFactory', 'BarFactory', '$analytics', '$scope', function(CampaignFactory, BarFactory, $analytics, $scope){
	//Model connection
	//Enables the directive to watch the factory model
	this.bar = BarFactory;
	this.video = CampaignFactory.video;
	this.tabs = CampaignFactory.tabs;
	$scope.url = "";

	//Reload the inventory
	this.setActiveTab = function(index){
		CampaignFactory.setActiveTab(index);
	};

	CampaignFactory.
		loadCampaign().
		then(function(){
			this.video = CampaignFactory.video;
			this.tabs = CampaignFactory.tabs;
			$scope.url = CampaignFactory.video.url;
			var path = '/campaign/' + this.video.project;
			$analytics.pageTrack(path);
			console.log('firsed');
		}.bind(this));
}]);