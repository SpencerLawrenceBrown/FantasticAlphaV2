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

angular.module('CartCTRL', ['CartFCTR', 'CheckoutFCTR']).controller('CartController', ['$scope', '$rootScope', 'CartFactory', 'CheckoutFactory', function($scope, $rootScope, CartFactory, CheckoutFactory){
	//Model
	var storeListen = true;
	this.model = CartFactory;
	this.checkout = CheckoutFactory;

	//Methods
	//Remove an item from the cart 
	this.removeItem = function(item){
		CartFactory.removeItem(item);
	}

	this.completeCheckout = function(){
		console.log("clicke");
		CheckoutFactory.canCheckout = true;
		CheckoutFactory.checkout(CartFactory.contents);
	}
	//Open the checkout window and close the cart. 
	this.openCheckout = function(){
		//CheckoutFactory.checkout();
		CartFactory.hide();
	}
	//Close the div
	this.closeCart = function(){
		CartFactory.hide();
	}
	//Set the cart to not listen
	$scope.setListen = function(value){
		storeListen = value;
	}
	// //Gets the total value of the amount in the cart from a particular campaign
	// this.getItemsTotal = function(campaign_id){
	// 	return cart.getItemsTotal(campaign_id);
	// }

	//Listeners
	//This listens for an event from the stores that contains the item to be added to the cart
	//Adds the item to the cart
	var storeListener = $rootScope.$on('store:addItem', function(event, item){
		if (storeListen){
			CartFactory.addItem(item);
		}
	});

	//This resets the cart on a successful checkout
	var successListener = $rootScope.$on('checkout:successful', function(){
		CartFactory.checkout();
	});

	//This hides the cart on a failed checkout
	var failureListener = $rootScope.$on('checkout:failed', function(){
		CartFactory.isVisible = false;
	});

	//Destroys listener when this controller is destroyed
	$scope.$on('$destroy', storeListener);
	$scope.$on('$destroy', successListener);
	$scope.$on('$destroy', failureListener);
}]);
