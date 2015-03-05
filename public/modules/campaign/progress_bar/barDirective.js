/*
Progress Bar Directive
Written by: Spencer Brown, copyright 2014

//Description:
This directive does all the DOM manipulation for the Progress bar.

//Components:
	-Join now button - updates fanbase numbers
	-Bar rewards - items that are unlocked
	-Bar
		-pending bar - takes into account items in user's cart
		-current bar - total amount spent

//Map:
	-Usedby:
		-campaignTemplate.html
	-contains:
		-barController.js
*/
angular.module('BarDRCT', ['BarCTRL']).directive('fnBar', function(){
	// Runs during compile
	return {
		restrict: 'E',
		replace: true,
		transclude: false,
		templateUrl: 'modules/campaign/progress_bar/barTemplate.html',
		controllerAs: 'bar',
		controller: 'BarController',
		link: function(scope, element, attrs, controller) {
			//Methods
			//Calculate the reward position
			//The apply signifiies if the function will be called out of the $digest cycle
			var recalculateRewardPosition = function(apply){
				var width = $("#campaign_content #progress_bar").width();
				//Updates the model through the controller
				controller.recalculateRewardPositions(width);
				if (apply){
					//Since the resize event is out of the angular lifecycle scope$apply calls the $digest and updates the values
					scope.$apply();
				}
			};
			//Update the counter position
			//The counter is located at the end of the cart div
			//The apply signifiies if the function will be called out of the $digest cycle
			var updateCounterPosition = function(apply){
				var width = $("#campaign_content #progress_bar").width();
				controller.updateCounterPosition(width);
				controller.updateRewardsProgress();
				if (apply){
					//Since the resize event is out of the angular lifecycle scope$apply calls the $digest and updates the values
					scope.$apply();
				}
			}
			//Events/Listeners
			//Listen for when the ng-repeat the contains the rewards is loaded so that they can be manipulated
			scope.$on('RewardsRepeatLoaded', function(event){
				setTimeout(function(){
					recalculateRewardPosition(true);
					updateCounterPosition(true);
				}, 500);
    		});

			//When the window gets resized, recalculate where the rewards should be
			$(window).resize(function() {
				recalculateRewardPosition(true);
				updateCounterPosition(true);
			});

			//When the 'join the fanbase button is clicked, scroll to store'
			$('button#join_fanbase').click(function(){
			$('html,body').animate({
		            scrollTop: $('#store_container').offset().top - 200
		         }, 600);
			});
		}
	};
});
