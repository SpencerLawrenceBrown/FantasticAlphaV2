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

angular.module('CheckoutFCTR', []).factory('CheckoutFactory',['$http', '$location', '$rootScope' function($http, $location, $rootScope){

	//Create the checkout object
	var CheckoutFactory = {
		isVisible : false,
		blockVisible: false,
		cardName: "",
		cardNumber: "",
		cardCVC: "",
		cardExpire: ""
	};

	//Methods
	//Fires an event that will trigger the cart to send it's data
	CheckoutFactory.checkout = function(){
		$rootScope.emit('checkout:initiate');
	};

	//When the cart contents are received, initiates the checkout
	$rootScope.$on('cart:contents', function(event, contents){
		console.log(contents);
		return $http({
			method: "PUT",
			url: "api/user-items",
			data: contents
		}).success(function(){
			CheckoutFactory.isVisible = false;
			$location.url('/user');
			$rootScope.$emit('checkout:successful');
		}).error(function(){
			CheckoutFactory.isVisible = false;
			CheckoutFactory.blockVisible = false;
			$rootScope.$emit('checkout:failed');
		});
	});

	//Return CheckoutFactory object
	return CheckoutFactory;
}]);