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

angular.module('CheckoutCTRL', ['CheckoutFCTR']).controller('CheckoutController', ['$scope', '$rootScope', 'CheckoutFactory', function($scope, $rootScope, CheckoutFactory){
	//Model
	this.model = CheckoutFactory;

	//Methods
	//Checkout
	this.completeCheckout = function(){
		CheckoutFactory.checkout();
	};
}]);
