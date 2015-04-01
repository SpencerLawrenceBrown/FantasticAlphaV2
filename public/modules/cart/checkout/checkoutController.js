          /*
Checkout Controller

//Description:
Communcates between the checkoutt model (CheckoutFactory) and the checkoutDirective.

//Components:

//Map
Used by:
	-CheckoutDirective: communicates with the checkoutFactory
Contains:
	-CheckoutFactory: Manages the contents of the checkout
*/

angular.module('CheckoutCTRL', ['CheckoutFCTR', 'CartFCTR', 'AuthFCTR']).controller('CheckoutController', ['$scope', '$rootScope', 'CheckoutFactory', 'CartFactory', 'AuthFactory', function($scope, $rootScope, CheckoutFactory, CartFactory, AuthFactory){
	//Model
	this.model = CheckoutFactory;
	this.cart = CartFactory;
	this.auth = AuthFactory;
	$scope.email = "";

	//Methods
	//Checkout
	this.completeCheckout = function(){
		CheckoutFactory.checkout(CartFactory.contents);
	};
	//Close checkout
	this.closeCheckout = function(){
		this.completeCheckout();
		CheckoutFactory.hide();
	};
	//Open checkout
	this.openCheckout = function(){
		//So that when close checkout fires, it allows it to go through
		CheckoutFactory.canCheckout = true;
		CheckoutFactory.show();
	};
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
