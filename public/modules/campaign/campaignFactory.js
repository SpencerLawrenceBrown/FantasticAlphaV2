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

angular.module('CampaignFCTR', []).factory('CampaignFactory', ['$http', '$sce', function($http, $sce){

	var CampaignFactory = {
		video:{
			url:{},
			id: ""
		},
		copy: {},
		updates: {}
	};

	CampaignFactory.loadCampaign = function (){
		return $http({
			method: "GET",
			url: "api/chuck-data"
		}).success(function(data){
			//Sets the video as a trusted resource so that iframe will play. Also adds different small controls to change apperance
			CampaignFactory.video.url = $sce.trustAsResourceUrl(data.video+ "?enablejsapi=1&modestbranding=1&autohide=1&showinfo=0");
			CampaignFactory.video.id = data.video_id;
		});
	};

	return CampaignFactory;
}]);
