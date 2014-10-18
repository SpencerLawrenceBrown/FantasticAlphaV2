/*
Cart Controller

//Description:
Communcates between the cart model (CartFactory) and the cartDirective.

//Components:
	Functions:
		-No idea

//Map
Used by:
	-CartDirective: communicates with the cartFactory
Contains:
	-CartFactory: Manages the contents of the cart
*/

angular.module('CartCTRL', ['CartFCTR']).controller('CartController', ['CartFactory', function(CartFactory){
	this.test = 'test';
	this.model = CartFactory;
}]);
