/*
Campaign Controller
Written by: Spencer Brown, copyright 2014

//Description
This controller will communicate between the campaign view and the campaign factory. Just like every other controller.

//Components
	-References to:
		-Video url
		-Copy about Campaign
		-url for twitter
		-content for blog

//Map
	-Used by:
		-BarTemplate: For the rewards
		-CampaignTemplate
		-App Routing
	-Contains:
		- campaignFactory
*/

angular.module('CampaignCTRL', ['CampaignFCTR']).controller('CampaignController', ['CampaignFactory', function(CampaignFactory){
	//Model connection
	//Enables the directive to watch the factory model
	this.video = CampaignFactory.video;

	//Reload the inventory
	this.loadCampaign = function(){
		CampaignFactory.getCampaign();
	};

	CampaignFactory.
		loadCampaign().
		then(function(){
			this.video = CampaignFactory.video;
		}.bind(this));
}]);