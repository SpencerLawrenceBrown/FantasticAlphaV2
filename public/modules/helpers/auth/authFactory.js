/*
Auth Factory
Written by: Spencer Brown, copywrite 2014

//Description
This factory holds the model for authentification. Manages sign in & login.

//Components
	-Auth Factory object
	-Functions
		-CheckLoggedIn: Checks if the current user is logged in
		-logOut: Logs out the user
		-register

//Map
	-Used by: 
		-UserFormController - Transfers info from the view to factory
	-Contains:
		-none
*/

angular.module('AuthFCTR', []).factory('AuthFactory', ['$q', '$rootScope', '$timeout', '$http', '$location', function($q, $rootScope, $timeout, $http, $location){
	var deferred = $q.defer();

	var AuthFactory = {
		loggedin : false,
		email : '',
		password : '',
		name : '',
		loginMSG: false
	};

	AuthFactory.checkLoggedIn = function(){
		$http.get('/loggedin').success(function(user){
			//Authenticated
			if (user != 0){
				$timeout(deferred.resolve, 0);
			}
			else{
				$timeout(function(){deferred.reject();}, 0);
				AuthFactory.loginMSG = true;
				$location.url('/login');
			}
		});
	}

	AuthFactory.logOut = function(){
		$http.get('/logout').success(function(){
			AuthFactory['loggedin'] = false;
			AuthFactory['loginMSG'] = false;
			$location.url('/');
		});
	}

	AuthFactory.register = function(data){
		// $http({
		// 	method : 'POST',
		// 	url : '/register',
		// 	data : $.param(data),
		// 	headers : {'Content-Type' : 'application/x-www-form-urlencoded'}
		// }).success(function(resp){
		// 	AuthFactory['loggedin'] = true;
		// 	AuthFactory['email'] = resp.local.email;
		// 	AuthFactory['password'] = resp.local.password;
		// 	AuthFactory['name'] = resp.details.fullname;
		// 	//$location.url('/user');
		// });
		
		//For use with email only
		$http({
			method : 'POST',
			url : '/register',
			data : $.param(data),
			headers : {'Content-Type' : 'application/x-www-form-urlencoded'}
		}).success(function(resp){
			AuthFactory['loggedin'] = true;
			AuthFactory['loginMSG'] = false;
			//$location.url('/user');
		}).error(function(){
			AuthFactory['loggedin'] = false;
			AuthFactory['loginMSG'] = true;
		});
	}

	AuthFactory.login = function(data){
		$http({
			method: 'POST',
			url: '/login',
			data: $.param(data),
			headers: {'Content-Type' : 'application/x-www-form-urlencoded'}
		}).success(function(resp){
			AuthFactory['loggedin'] = true;
			AuthFactory['loginMSG'] = false;
			AuthFactory['email'] = resp.local.email;
			AuthFactory['password'] = resp.local.password;
			$location.url('/user');
		});
	}

	var checkoutListener = $rootScope.$on('checkout:failed', function(){
		AuthFactory['loginMSG'] = true;
	});

	return AuthFactory;
}]);