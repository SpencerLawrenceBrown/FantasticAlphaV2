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

angular.module('CampaignFCTR', []).factory('CampaignFactory', ['$http', function($http){

	var CampaignFactory = {
		video:{},
		copy: {},
		rewards: [],
		updates: {}
	};

	CampaignFactory.loadCampaign = function (){
		return $http({
			method: "GET",
			url: "api/campaign-data"
		}).success(function(data){
			CampaignFactory.rewards = data.rewards;
			console.log(CampaignFactory.rewards);
		});
	};

	return CampaignFactory;
}]);
