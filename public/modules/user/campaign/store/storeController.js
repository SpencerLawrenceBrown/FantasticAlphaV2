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
	this.home = StoreFactory.home_incentives;
	this.team = StoreFactory.team_incentives;
	this.stadium = StoreFactory.stadium_incentives;
	//This will have to change eventually, but for now it works. Need to figure out how to bind w/o scope
	this.model = StoreFactory;
	this.tab = StoreFactory.tab;

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

	this.change = function(input){
		console.log(input);
		if (input == 1){
			console.log("hi");
			StoreFactory.tab = true;
		} else {
			StoreFactory.tab = false;
		}
		console.log(StoreFactory.tab);
	}

	this.submit = function(){
		StoreFactory.button = "Comment Submitted!";
		StoreFactory.textbox = "";
	}

	//Set the selected item
	this.setCurrent = function(incentive){
		StoreFactory.setCurrent(incentive);
		this.model.added_display = false;
	}

	StoreFactory.getIncentives().then(function(){
		this.home = StoreFactory.home_incentives;
		this.team = StoreFactory.team_incentives;
		this.stadium = StoreFactory.stadium_incentives;
		this.tab = StoreFactory.tab;
	}.bind(this));

}]);
