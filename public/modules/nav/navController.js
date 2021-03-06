/*
Nav Bar Controller
Written by: Spencer Brown, copyright 2014
--Fun Fact: written while eating a steak in dorm room at UCT in Cape Town--\

//Description
This controller maintains communcation between the ProjectMetaFactory and the
fn-nav directive. Referred to as 'nav' by fn-nav. i.e. {{nav.foo}}

//Components
	Function:
		-loadCampaigns: Calls the CampaignsMetaFactory to retrieve the campaignss

//Map
Used by:
	-navDirective.js
Contains:
	-campaignMetaFactory.js
*/

angular.module('NavCTRL', ['MetaFCTR', 'AuthFCTR']).controller('NavController', ['CampaignsMetaFactory', 'AuthFactory', function(CampaignsMetaFactory, AuthFactory){
	//Set the campaigns variable to the Factory campaign
	this.campaigns = CampaignsMetaFactory.allCampaigns;
	this.auth = AuthFactory;

	//Reload the campaigns from server
	this.loadCampaigns = function(){
		CampaignsMetaFactory.getAllCampaigns();
	};

	//On initialization, load campaigns, binds for <IE9
	CampaignsMetaFactory.
		getAllCampaigns()
		.then(function(){
			this.campaigns = CampaignsMetaFactory.allCampaigns;
		}.bind(this));
}]);