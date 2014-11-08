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

angular.module('CartCTRL', ['CartFCTR']).controller('CartController', ['$scope', '$rootScope', 'CartFactory', function($scope, $rootScope, CartFactory){
	//Model
	this.model = CartFactory;

	//Methods
	//Remove an item from the cart
	this.removeItem = function(item){
		CartFactory.removeItem(item);
	}
	// //Gets the total value of the amount in the cart from a particular campaign
	// this.getItemsTotal = function(campaign_id){
	// 	return cart.getItemsTotal(campaign_id);
	// }

	//Listeners
	//This listens for an event from the stores that contains the item to be added to the cart
	//Adds the item to the cart
	var storeListener = $rootScope.$on('store:addItem', function(event, item){
		CartFactory.addItem(item);
	});
	//Destroys listener when this controller is destroyed
	$scope.$on('$destroy', storeListener);
}]);
