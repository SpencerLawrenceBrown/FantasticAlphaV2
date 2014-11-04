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

angular.module('BarFCTR', ['CartFCTR']).factory('BarFactory', ['$http', 'CartFactory', function($http, CartFactory){
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
		rewards : []
	};

	//--------------------------------------------------------------
	//METHODS
	//Private
	//This will communicate with the cart to see if the user has any items in the cart. If they do it will be indicated with a second progress bar
	var getCartData = function (){
		//TODO - Check the cart to see if there are any campaign items in it
	};
	//This will receive the data from the server. This is the official campaign values
	var getServerData = function (){
		return $http({
			method: "GET",
			url: "api/bar-data"
		}).success(function(data){
			//Set the appropriate data
			BarFactory.actual.campaignTotal = data.total;
			BarFactory.actual.campaignPaid = data.paid;
			//Scale the value to fit within 0 to 100 for the progress bar visual
			BarFactory.visual.barPaid = scaleData(data.paid, data.total, BarFactory.visual.barTotal);
			BarFactory.rewards = data.rewards;
			//When created initially, assume a width of 1000.
			//TODO - update this so that it reads the current DOM
			BarFactory.calculateRewardPositions(1000);
		});
	};
	//takes in a value and a maximum and then scales it relative to the scale factory
	var scaleData = function(value, max, scale){
		return value/max * scale;
	}

	//Public
	//Load the data from the cart & from the server. It returns the getServerData because it is an asynchronous test.
	//This should really be using $q. That will be added.
	BarFactory.getData = function(){
		getCartData();
		return getServerData();
	};
	//Changes the value of the cart bar. Takes in a negetive number to decrease, positive to increase
	BarFactory.changeValue = function(value){
		BarFactory.visual.barCart += scaleData(value, BarFactory.actual.campaignTotal, BarFactory.visual.barTotal);
		BarFactory.actual.campaignCart += value;
	};
	//This function calculates where the rewards should be positioned along the bar given the submitted width
	//It adds another value to the reward object, unlock_value, which is used for the css
	BarFactory.calculateRewardPositions = function(width){
		for (var i = 0; i < BarFactory.rewards.length; i++){
			BarFactory.rewards[i]['unlock_value'] = BarFactory.rewards[i]['unlock_amount']/BarFactory.actual.campaignTotal * width + 'px';
		}
	};
	//This function calculates where the counter bubble should be position along the bar. The number at the end is the width of the bubble/2 in order to center it
	//This just looks for where along the bar the two bars together are and then calculates that coordinate. 
	BarFactory.updateCounterPosition = function(width){
		BarFactory.visual.barCounter = scaleData(BarFactory.actual.campaignPaid + BarFactory.actual.campaignCart, BarFactory.actual.campaignTotal, BarFactory.visual.barTotal) * (width/ BarFactory.visual.barTotal) - (200/2) + 'px';
		console.log(BarFactory.visual.barCounter);
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
	}

	return BarFactory;
}]);