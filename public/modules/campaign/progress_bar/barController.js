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
	//Model for the actual campaign amounts, contains campaignTotal, campaignPaid, campaignCart
	//All variables explained in barFactory.js
	this.actual = BarFactory.actual;

	//Model for the progress bar visual, contains barTotal, barPaid, barCart
	//All variables explained in barFactory.js
	this.visual = BarFactory.visual;

	//Reload the inventory
	this.loadData = function(){
		BarFactory.getData();
	};

	this.increaseBar = function(value){
		BarFactory.increaseValue(value);
	};

	BarFactory.
		getData().
		then(function(){
			this.values = BarFactory.actual;
			this.progress = BarFactory.visual;
		}.bind(this));
}]);