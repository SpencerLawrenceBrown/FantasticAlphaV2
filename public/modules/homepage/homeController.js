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

angular.module('HomePageCTRL', ['MetaFCTR', 'AuthFCTR']).controller('HomepageController', [ 'CampaignsMetaFactory', 'AuthFactory', '$scope', function(MetaFactory, AuthFactory, $scope){
	//Model connection
	this.model = MetaFactory;
	this.auth = AuthFactory;
	$scope.email = "";

	//Fixes mobile viewport
	$("meta[name='viewport']").attr('content', 'width=device-width, initial-scale=1');

	//Add an email to the mailing list
	this.addEmail = function(){
		console.log("Email:" + $scope.email);
		var formData = {
			email 		: $scope.email,
			password 	: "test",
			fullname 	: "user"
		};
		AuthFactory.register(formData);
		$scope.email = "";
	};	

}]);