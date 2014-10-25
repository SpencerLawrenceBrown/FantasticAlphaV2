/*
Store Controller
Written by: Spencer Brown, copyright 2014

//Description
This controller communicates between the store directive and the store factory (model).
It bascially functions as a getter and then holds the store contents

//Components
	-Load model

//Map
	-Used by:
		-StoreDirective
	-Contains:
		-StoreFactory
*/

angular.module('StoreCTRL', ['StoreFCTR']).controller('StoreController', ['StoreFactory', function(StoreFactory){
	//Model connection
	//Enables the directive to watch the factory model
	this.inventory = StoreFactory.incentives;

	//Reload the inventory
	this.loadInventory = function(){
		StoreFactory.getIncentives();
	};

	StoreFactory.
		getIncentives().
		then(function(){
			this.inventory = StoreFactory.incentives;
		}.bind(this));
}]);