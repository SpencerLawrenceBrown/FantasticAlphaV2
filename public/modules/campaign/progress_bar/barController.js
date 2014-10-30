/*
Progress Bar Controller
Written by: Spencer Brown, copyright 2014

//Description
This controller communicates between the barFactory and the directive.

//Components
	-Load model
	-refresh model

//Map
	-Used by:
		-BarDirective
	-Contains:
		-BarFactory
*/

angular.module('BarCTRL', ['BarFCTR']).controller('BarController', ['BarFactory', function(BarFactory){
	//--------------------------------------------
	//Data
	//Binding for the actual campaign amounts, contains campaignTotal, campaignPaid, campaignCart
	//All variables explained in barFactory.js
	this.actual = BarFactory.actual;

	//Binding for the progress bar visual, contains barTotal, barPaid, barCart
	//All variables explained in barFactory.js
	this.visual = BarFactory.visual;

	//Binding for the rewards
	this.rewards = BarFactory.rewards;

	//--------------------------------------------
	//Methods
	//Reload the inventory
	this.loadData = function(){
		BarFactory.getData();
	};
	//Change the value of the bar
	this.changeBar = function(value){
		BarFactory.changeValue(value);
	};
	//Simulate checkout
	this.checkout = function(){
		BarFactory.checkout();
	}
	//Calls a method that updates the model
	this.recalculateRewardPositions= function(newWidth){
		BarFactory.calculateRewardPositions(newWidth);
	}

	this.log = function(element){
		console.log(element);
		console.log('test');
	}
	//Load the bar factory when the controller is instantiated
	BarFactory.
		getData().
		then(function(){
			this.values = BarFactory.actual;
			this.progress = BarFactory.visual;
			this.rewards = BarFactory.rewards;
		}.bind(this));
}]);