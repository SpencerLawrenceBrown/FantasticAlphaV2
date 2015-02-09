/*
Campaign Factory
Written by: Spencer Brown, copywrite 2014

//Description
This factory holds the model for the campaign.
Basically just loads all the campaign data from the server.

//Components
	-Campaign Factory object (model): Houses the campaign model.
	-Functions
		-Get

//Map
	-Used by: 
		-CampaignController - Populates the store directive
	-Contains:
		-none
*/

angular.module('CampaignFCTR', []).factory('CampaignFactory', ['$routeParams', '$http', '$sce', function($routeParams, $http, $sce){
	//Model
	var CampaignFactory = {
		video:{
			url:{},
			id: "",
			image: ""
		},
		info: {},
		tabs: {}
	};

	//Methods
	//Load the campaign data from the server
	CampaignFactory.loadCampaign = function(){
		var urlString = "api/campaign-info/" + $routeParams.campaign_id;
		return $http({
			method: "GET",
			url: urlString,
		}).success(function(data){
			//Sets the video as a trusted resource so that iframe will play. Also adds different small controls to change apperance
			CampaignFactory.video.url = $sce.trustAsResourceUrl(data.video_data.video+ "?enablejsapi=1&modestbranding=1&autohide=1&showinfo=0");
			//Set the path for the campaign image
			CampaignFactory.video.image = "assets/images/" + data.video_data.image + ".jpg";
			//Sets the tabs data
			CampaignFactory.tabs = data.tabs;
			//Always start with the update tab open
			CampaignFactory.tabs.active = "update";
		});
	};
	//Set the active tab
	CampaignFactory.setActiveTab = function(index){
		//Add a switch statement
		if (index === 0){
			CampaignFactory.tabs.active = "producer";
		}
		else if (index === 1){
			CampaignFactory.tabs.active = "fan";
		}
		else if (index === 2){
			CampaignFactory.tabs.active = "update";
		}
	};
	
	return CampaignFactory;
}]);
