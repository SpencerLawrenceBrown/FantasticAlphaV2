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

angular.module('StoreCTRL', ['StoreFCTR']).controller('StoreController', ['$rootScope', 'StoreFactory', function($rootScope, StoreFactory){
	//Model connection
	//Enables the directive to watch the factory model
	this.inventory = StoreFactory.incentives;

	//Reload the inventory
	this.loadInventory = function(){
		StoreFactory.getIncentives();
	};

	//Add item to cart
	this.addItem = function(item){
		//This will emit an event that will be caught by the cart
		//Rootscope allows communication across different scope hierarchies
		$rootScope.$emit('store:addItem', item);
	};

	StoreFactory.
		getIncentives().
		then(function(){
			this.inventory = StoreFactory.incentives;
		}.bind(this));
}]);

//TEST THE CART ACCESS FACTORY