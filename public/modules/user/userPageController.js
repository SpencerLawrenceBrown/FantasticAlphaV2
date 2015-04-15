/*
User Page Controller
Written by: Spencer Brown, copyright 2014

//Description
This controller manages the view of the user's page. The user's page lists the fanbases they belong to as well as their purchases. Eventually their badges as well.

//Components
	-getJson
	-postData
	
//Map
	-Used by:
		-LoginTemplate
		-RegistrationTemplate
	-Contains:
		-AuthFactory
*/

angular.module('UserPageCTRL', ['AuthFCTR', 'UserFCTR']).controller('UserPageController', ['$scope', 'AuthFactory', 'UserFactory', function($scope, AuthFactory, UserFactory){
	this.auth = AuthFactory;
	this.details = UserFactory;
	
	this.loadUserData = function(){
		UserFactory.loadUserData();
	}
	
	this.logout = function(){
		AuthFactory.logOut();
	};

	UserFactory.
		loadUserData().
		then(function(){
			this.user = UserFactory;
		}.bind(this));
}]);