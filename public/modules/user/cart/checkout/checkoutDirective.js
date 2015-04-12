/*
Checkout Directive
Written by: Spencer Brown, copyright 2014

//Description
This directive holds the checkout directive.
The checkout directive is loaded from the cart template.
This pushes items to the user's cart

//Components
	-Form inputs
	-Complete Button:
		-Triggers the checkout pop-up

//Map
	-Used by:
		-CartTemplate: **Basically by CartDirective**
	-Contains:
		-CheckoutController: Talks to checkout model
*/


angular.module('CheckoutDRCT', ['CheckoutCTRL']).directive('fnCheckout', function(){
	return {
		restrict: 'E',
		replace: true, //Fully replaces the fn-checkout element
		transclude: false, //Currently set to false, can't forsee any reason that would change
		templateUrl: 'modules/user/cart/checkout/checkoutTemplate.html', //Loads the html template
		controllerAs:'checkout', //Refer to the controller as 'checkout' so checkout.foo
		controller: 'CheckoutController', //This controller comes from the 'CheckoutCTRL' module that is injected
		//No DOM manipulation yet. If needed, uncomment below
		link: function(scope, elem, attrs, controller) {
			$(document).on('scroll', function(event) {
				var scrolled = $(window).scrollTop();
				$("#checkout_bg").css({'top': scrolled});
			});
			$(document).on('click', function(event) {
				if (!$(event.target).closest('#checkout_form').length) {
					controller.closeCheckout();
					scope.$apply();
				}
			});
			$(document).on('click', function(event) {
				if ($(event.target).closest('button#checkout_button').length) {
					controller.openCheckout();
					scope.$apply();
				}
			});
		}
	};
});