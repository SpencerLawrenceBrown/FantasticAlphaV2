/*
Campaigns Meta Factory
Written by: Spencer Brown, copyright 2014

//Description
This factory serves as the model for the nav bar. It will make a call
to the server to retrieve all necessary information about all existing campaigns.
Currently (V2) it will mostly retrieve campaign name and campaign link.

//Components
	-CampaignsMeta object (model)
		-Will contain a list of all the campaigns and their details
		-Will be returned by the factory
	-Functions
		-getAllCampaigns: Calls the API to get the campaign meta
		...Add more here if necessary...

//Map
Used by:
	-NavController.js
Contains:
	-CampaignsMeta model [All navigation information]
*/

angular.module('MetaFCTR', []).factory('CampaignsMetaFactory', ['$http', function($http){

	//Our model
	var CampaignsMeta = {
		campaignsInfo: {}
	};

	//Retrieve all the campaigns
	CampaignsMeta.getAllCampaigns = function(){
		return $http({
			method: 'GET',
			url: 'api/campaigns-meta'
		}).success(function(data){
			CampaignsMeta.campaignsInfo = data;
		});
	};

	return CampaignsMeta;
}])