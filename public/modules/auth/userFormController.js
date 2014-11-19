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
angular.module('UserFormCTRL', ['AuthFCTR']).controller('userFormController', ['$scope','AuthFactory', function($scope, AuthFactory){
	$scope.auth = AuthFactory;
	$scope.fullname = '';
	$scope.email = '';
	$scope.password = '';

	var getJSON =  function(register){
		var formData = {
			email : $scope.email,
			password : $scope.password,
			fullname : $scope.fullname
		};
		return formData;
	};

	$scope.postForm = function(register){
		console.log("submit");
		if (register){
			$scope.auth.register(getJSON());
		} else {
			$scope.auth.login(getJSON());
		}
	};

	$scope.islogged = function(){
		$scope.auth.checkLoggedIn();
	};
}]);