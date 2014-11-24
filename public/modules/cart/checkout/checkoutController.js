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

angular.module('CheckoutCTRL', ['CheckoutFCTR', 'CartFCTR']).controller('CheckoutController', ['$scope', '$rootScope', 'CheckoutFactory', 'CartFactory', function($scope, $rootScope, CheckoutFactory, CartFactory){
	//Model
	this.model = CheckoutFactory;
	this.cart = CartFactory;

	//Methods
	//Checkout
	this.completeCheckout = function(){
		CheckoutFactory.checkout(CartFactory.contents);
	};
}]);
