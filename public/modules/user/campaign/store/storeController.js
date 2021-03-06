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

angular.module('StoreCTRL', ['StoreFCTR']).controller('StoreController', ['$routeParams', '$rootScope', '$scope',  'StoreFactory', function($routeParams, $rootScope, $scope, StoreFactory){
	//Model connection
	//Refence to the watch variable
	this.inventory = StoreFactory.incentives;
	//This will have to change eventually, but for now it works. Need to figure out how to bind w/o scope
	this.model = StoreFactory;

	//Reload the inventory
	this.loadInventory = function(){
		StoreFactory.getIncentives();
	};

	//Add item to cart
	this.addItem = function(item){
		//This will emit an event that will be caught by the cart
		//Rootscope allows communication across different scope hierarchies
		// $('html,body').animate({
		// 	scrollTop: $('#reward_bar_div').offset().top - 50
		// }, 600);
		//If it is called from the details box
		if (item === "getCurrent"){
			item = StoreFactory.getCurrent();
			StoreFactory.cart_btn_text = "Item Added!";
			setTimeout(function(){
				StoreFactory.cart_btn_text = "Add to Cart";
				$scope.$apply();
			}, 3000);
		}
		$rootScope.$emit('store:addItem', item);

	};

	//Set the selected item
	this.setCurrent = function(index){
		StoreFactory.setCurrent(index);
		this.model.added_display = false;
	}

	StoreFactory.getIncentives().then(function(){
			this.inventory = StoreFactory.incentives;
	}.bind(this));

}]);
