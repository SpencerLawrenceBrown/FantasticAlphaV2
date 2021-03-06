/*
Cart Directive
Written by: Spencer Brown, copyright 2014

//Description
This directive holds the cart directive.
The cart directive shows the user the items in their cart. Also triggers checkout.
Since it is connected to the nav, it is asethectically persistent.

//Components
	-Cart Items:
		-Each item contains quantity, ind. price, total price, campaign, property, & rm button
	-Cart Details:
		-Tally of the total number of items in the cart
		-Tally of total price
	-Checkout Button:
		-Triggers the checkout pop-up

//Map
	-Used by:
		-NavTemplate: **Basically by NavDirective**
	-Contains:
		-CartController: Talks to cart model
*/

angular.module('CartDRCT', ['CartCTRL']).directive('fnCart', function(){
	return {
		restrict: 'E',
		replace: true, //Fully replaces the fn-nav element
		transclude: false, //Currently set to false, can't forsee any reason that would change
		templateUrl: 'modules/user/cart/cartTemplate.html', //Loads the html template
		controllerAs:'cart', //Refer to the controller as 'cart' so cart.foo
		controller: 'CartController', //This controller comes from the 'CartCTRL' module that is injected
		//No DOM manipulation yet. If needed, uncomment below
		link: function(scope, elem, attrs, controller) {
			$(document).on('click', function(event) {
				if (!$(event.target).closest('#cart_div').length && !$(event.target).closest('#cart_tab').length ) {
					controller.closeCart();
					scope.$apply();
				}
			});
		}
	};
});