/*
Progress Bar Factory
Written by: Spencer Brown, copyright 2014

//Description
This factory is more interesting than the others. Due to the templated nature of the campaigns and the life cycle
of ng-view controllers (they are destroyed when the view is changed), the information will have to be reloaded
each time the view is changed. This is less than ideal, but that's ok. When the factory is reloaded, it will make 
a call to the server as well as communicate with the cart factory to see if there are any of its items in it.
Depending on the results it will update the progress bar accordingly.

//Components[need to update]
	-Paid model: Holds the data for the bar that shows the progress that has already been achieved
	-Cart model: Holds the data for the bar that shows the potential progress to be made with an order

//Map
	-Usedby:
		-BarController
	-Contains:
		-CartFactory 
*/

angular.module('BarFCTR', ['CartFCTR']).factory('BarFactory', ['$routeParams', '$http', '$rootScope', 'CartFactory', function($routeParams, $http, $rootScope, CartFactory){
	//MODEL
	/*!IMPORTANT - The total is set to 100. The current progress bar plugin uses that to set the max,
	thus going forward all the values must be repreportioned relative to 100.
	So if the total is acutally 3000 and the current value is 1234, then the value
	value for the bar is 1234/3000 * 100.
	
	More info about Bar Factory. Because of the necessary translation(explained above^),
	the BarFactory holds two sets of variables-one for the odometer and one for the progress.
	
	1)The actual is the element that shows how much money has been raised.
	That value is NOT translated to fit the bar. So if the campaign has raised $1234, then its value
	is 1234.

	2)The progress bar holds the values for displaying the progress bar. if the campaign had
	raised $1234 out of $3000, then the value under progress bar would be 1234/3000 * 100 or 41.13.
 	*/
	var BarFactory = {
		actual: {
			campaignTotal: 0, //Total amount the campaign wants to raise
			campaignPaid: 0,  //Amount the campaign has already raised
			campaignCart: 0   //Amount in the user's cart that goes towards this campaign
		},
		visual: { 
		//Same as the values in 'BarFactory.actual', but scaled for the progress bar visual
			barTotal: 100,
			barPaid: 0,
			barCart: 0,
			barCounter: 0
		},
		//The list of rewards. Every reward has a name, which serves as the text, and a value, which is used to align it
		rewards : [],
		current_reward: {},
		unlocked: 0,
		width: 1000
	};

	//--------------------------------------------------------------
	//METHODS
	//*Private*//
	//This will receive the data from the server. This is the official campaign values
	var getServerData = function (){
		var urlString = "api/campaign-bar/" + $routeParams.campaign_id;
		return $http({
			method: "GET",
			url: urlString
		}).success(function(data){
			//Set the appropriate data
			BarFactory.actual.campaignTotal = data.total;
			BarFactory.actual.campaignPaid = data.paid;
			//Scale the value to fit within 0 to 100 for the progress bar visual
			BarFactory.visual.barPaid = scaleData(data.paid, data.total, BarFactory.visual.barTotal);
			BarFactory.rewards = data.rewards;
			//Update the positions based on width-Assumes 1000px width initially. The width updated by the barDirective when it changes
			BarFactory.calculateRewardPositions(BarFactory.width);
			//Update the in-cart bar to show the current's carts contents
			getCartData();
		});
	};
	//takes in a value and a maximum and then scales it relative to the scale factory
	var scaleData = function(value, max, scale){
		return value/max * scale;
	}

	//When loaded, check the cart for campaign items
	var getCartData = function(){
		BarFactory.changeValue(CartFactory.computeCampaignTotal($routeParams.campaign_id));
	}

	//Listens for when the cart is updated. Then get the new value of all the items from the campaign in the cart
	var cartListener = $rootScope.$on('cart:contentsChanged', function(){
		BarFactory.changeValue(CartFactory.computeCampaignTotal($routeParams.campaign_id));
	});

	//Listens for when checkout is completed then gets the campaign items from the cart then adds up the new campaign total.
	var checkoutListener = $rootScope.$on('checkout:successful', function(){
		BarFactory.checkout();	
	});

	//*Public*//
	//Load the data from the cart & from the server, then update the rewards progress. It returns the getServerData because it is an asynchronous test.
	//This should really be using $q. That will be added.
	//*Data & Value*//
	BarFactory.getData = function(){
		return getServerData();
	};
	//Changes the value of the cart bar. Updates counter position accordingly
	BarFactory.changeValue = function(value){
		BarFactory.visual.barCart = scaleData(value, BarFactory.actual.campaignTotal, BarFactory.visual.barTotal);
		BarFactory.actual.campaignCart = value;
		BarFactory.updateCounterPosition(BarFactory.width);
	};
	//This will update the rewards progress which will change which rewards are visible. This is called on checkout so that rewardss are only shown when paid
	BarFactory.updateRewardsProgress = function(){
		for(var x = 0; x < BarFactory.rewards.length; x++){
			//If has a higher amount than has been raised
			if (BarFactory.rewards[x].unlock_amount > BarFactory.actual.campaignPaid){
				//If not the first one
				if (x > 0){
					//If the previous one is unlocked then this one is the current reward
					if (BarFactory.rewards[x-1].progress === 'unlocked'){
						BarFactory.unlocked = x;
						BarFactory.rewards[x].progress = 'current';
						BarFactory.current_reward = BarFactory.rewards[x];
					} else {
						BarFactory.rewards[x].progress = 'locked';
					}
				//If the first one
				} else {
					BarFactory.rewards[x].progress = 'current';
					BarFactory.unlocked = x;
					BarFactory.current_reward = BarFactory.rewards[x];
				}
			//If has a lower or equal amount than what has been raised
			} else if (BarFactory.rewards[x].unlock_amount <= BarFactory.actual.campaignPaid){
				BarFactory.rewards[x].progress = 'unlocked';
			}
		}
	}

	//*Positioning*//
	//This function calculates where the rewards should be positioned along the bar given the submitted width
	//It adds another value to the reward object, unlock_value, which is used for the css
	BarFactory.calculateRewardPositions = function(width){
		for (var i = 0; i < BarFactory.rewards.length; i++){
			BarFactory.rewards[i]['unlock_value'] = BarFactory.rewards[i]['unlock_amount']/BarFactory.actual.campaignTotal * width + 'px';
		}
		BarFactory.width = width;
	};
	//This function calculates where the counter bubble should be position along the bar. The number at the end is the width of the bubble/2 in order to center it
	//This just looks for where along the bar the two bars together are and then calculates that coordinate. 
	BarFactory.updateCounterPosition = function(width){
		BarFactory.visual.barCounter = scaleData(BarFactory.actual.campaignPaid + BarFactory.actual.campaignCart, BarFactory.actual.campaignTotal, BarFactory.visual.barTotal) * (width/BarFactory.visual.barTotal) - (200/2) + 'px';
	}
	//This simulates what the checkout process will be like. When the user checks out,
	//the paid amount will be updated and the cart will decrease to zero.
	//Currently the visual is decreased to by .99999 instead of to zero, because if
	//changed to zero the progress bar animation doesn't work
	BarFactory.checkout = function(){
		BarFactory.visual.barPaid += BarFactory.visual.barCart;
		BarFactory.visual.barCart += -(BarFactory.visual.barCart * .99999);
		BarFactory.actual.campaignPaid += BarFactory.actual.campaignCart;
		BarFactory.actual.campaignCart = 0;
		BarFactory.updateRewardsProgress();
		//For testing purposes this does not push to the server. 
	}
	return BarFactory;
}]);