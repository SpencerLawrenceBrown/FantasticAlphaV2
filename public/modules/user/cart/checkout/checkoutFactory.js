/*
Checkout Factory
Written by: Spencer Brown, copyright 2014

//Description
This factory will manage checkout. When a user selects to checkout, the template will become visible.
When they click the checkout button, the items will be sent to the user's account.

//Components
	-CartFactory object (model)
		-this will keep a list of all the items in the cart
	-Functions
		-delete item from cart
		-add item to cart
		-update quantity
		-[eventually] retrieve the user's saved cart

//Map
	-Usedby:
		-CheckoutController: as the model
	-Contains:
		-none
*/

angular.module('CheckoutFCTR', []).factory('CheckoutFactory', ['$http', '$location', '$rootScope', function($http, $location, $rootScope){

	//Create the checkout object
	var CheckoutFactory = {
		canCheckout : false,
		isVisible : false,
		blockVisible: false,
		cardName: "",
		cardNumber: "",
		cardCVC: "",
		cardExpire: ""
	};

	//Methods

	//Adds cart data to user account
	CheckoutFactory.checkout = function(contents){
		// return $http({
		// 	method: "PUT",
		// 	url: "api/user-items",
		// 	data: contents
		// }).success(function(){
		// 	CheckoutFactory.isVisible = false;
		// 	$rootScope.$emit('checkout:successful', contents);
		// }).error(function(){
		// 	CheckoutFactory.isVisible = false;
		// 	CheckoutFactory.blockVisible = false;
		// 	$rootScope.$emit('checkout:failed');
		// 	$location.url('/login');
		// });
		if (CheckoutFactory.canCheckout){
			$rootScope.$emit('checkout:successful', contents);
			CheckoutFactory.canCheckout = false;
		}
		// CheckoutFactory.isVisible = true;
	};
	//Hides the checkout
	CheckoutFactory.hide = function(){
		CheckoutFactory.isVisible = false;
	};

	//Shows the checkout
	CheckoutFactory.show = function(){
		CheckoutFactory.isVisible = true;
	};

	//Return CheckoutFactory object
	return CheckoutFactory;
}]);