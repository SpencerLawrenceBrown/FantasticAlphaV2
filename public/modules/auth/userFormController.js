/*
User Form Controller
Written by: Spencer Brown, copyright 2014

//Description
This controller communicates between the authFactory and the template.

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
angular.module('UserFormCTRL', ['AuthFCTR']).controller('UserFormController', ['$rootScope','$scope','AuthFactory', function($rootScope, $scope, AuthFactory){
	$scope.auth = AuthFactory;
	$scope.fullname = '';
	$scope.email = '';
	$scope.password	 = '';

	var getJSON =  function(register){
		var formData = {
			email 		: $scope.email,
			password 	: $scope.password,
			fullname 	: $scope.fullname
		};
		return formData;
	};

	$scope.postForm = function(register){
		if (register){
			AuthFactory.register(getJSON());
		} else {
			AuthFactory.login(getJSON());
		}
	};

	$scope.islogged = function(){
		$scope.auth.checkLoggedIn();
	};
	
	//Listens for when the checkout fails and makes the loginMSG visible
	var failureListener = $rootScope.$on('checkout:failed', function(){
		AuthFactory.loginMSG = true;
	});
}]);