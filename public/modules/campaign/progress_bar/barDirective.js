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
			//Calculate the position
			var recalculatePosition = function(apply){
				var width = $("#campaign_content #progressbar").width();
				//Updates the model through the controller
				controller.recalculateRewardPositions(width);
				if (apply){
					//Since the resize event is out of the angular lifecycle scope$apply calls the $digest and updates the values
					scope.$apply();
				}
			};
			//Update Reward status
			var updateRewardProgress = function(apply){
				for(var x = 0; x < controller.rewards.length; x++){
					//If has a higher amount than has been raised
					if (controller.rewards[x].unlock_amount > controller.actual.campaignPaid){
						//If not the first one
						if (x > 0){
							//If the previous one is unlocked then this one is the current reward
							if (controller.rewards[x-1].progress === 'unlocked'){
								controller.rewards[x].progress = 'current';
							} else {
								controller.rewards[x].progress = 'locked';
							}
						//If the first one
						} else {
							controller.rewards[x].progress = 'current';
						}
					//If has a lower or equal amount than what has been raised
					} else if (controller.rewards[x].unlock_amount <= controller.actual.campaignPaid){
						controller.rewards[x].progress = 'unlocked';
					}
					console.log(controller.rewards[x].name);
					console.log(controller.rewards[x].progress);
				}
				if (apply){
					scope.$apply();
				}
			};

			//Events/Listeners
			//Listen for when the ng-repeat the contains the rewards is loaded so that they can be manipulated
			scope.$on('RewardsRepeatLoaded', function(event){
				recalculatePosition(false);
				updateRewardProgress(false);
    		});

    		$('.increase').click(function(){
    			updateRewardProgress(true);
    		});

			//When the window gets resized, recalculate where the rewards should be
			$(window).resize(function() {
				recalculatePosition();
			});
		}
	};
});
