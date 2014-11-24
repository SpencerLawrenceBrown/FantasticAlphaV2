/*
User Factory
Written by: Spencer Brown, copywrite 2014

//Description
This factory holds the model for the user. It makes a call to the server to pull the information.

//Components
	-User object - for info
	-Functions
		-CheckLoggedIn: Checks if the current user is logged in
		-logOut: Logs out the user
		-register

//Map
	-Used by: 
		-UserFormController - Transfers info from the iv
	-Contains:
		-none
*/

angular.module('UserFCTR', []).factory('UserFactory', ['$http', function($http){
	
	var UserFactory = {
		name: "",
		inventory: []
	};

	UserFactory.loadUserData = function(){
		return $http({
			method: 'GET',
			url: 'api/user-data'
		}).success(function(data){
			UserFactory['name'] =  data.details.fullname;
			UserFactory['inventory'] = data.details.items;
		});
	};

	return UserFactory;
}]);