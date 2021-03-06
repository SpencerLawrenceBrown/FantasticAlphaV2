/*
Story Factory
Written by: Spencer Brown, copywrite 2014

//Description
This factory holds the model for the store.
Basically just loads all the campaign store data from the server.
This is a factory, because there will only exist one for all the stores.
Each time a new campaign page is loaded, the store will make a new call to get the items for that store.

//Components
	-Store Factory object (model): Houses the store model.
	-Functions
		-Get

//Map
	-Used by: 
		-StoreController - Populates the store directive
	-Contains:
		-CartController: Needs this so that it can add items to the cart
*/

angular.module('StoreFCTR', []).factory('StoreFactory', ['$routeParams', '$http', function($routeParams, $http){
	var StoreFactory = {
		incentives:{}, 
		current_highlight: {},
		current_set : false,
		cart_btn_text : "Add to Cart"
	};

	StoreFactory.getIncentives = function(){
		var urlString = "api/campaign-store/" + $routeParams.campaign_id;
		return $http({
			method: "GET",
			url: urlString
		}).success(function(data){
			StoreFactory.incentives = data.incentives;
			StoreFactory.current_set = false;
			StoreFactory.current_highlight = {};
			console.log(StoreFactory.incentives);
		});
	};

	StoreFactory.setCurrent = function(index){
		if (StoreFactory.current_set == false){
			StoreFactory.current_set = true;
		}

		StoreFactory.current_highlight = StoreFactory.incentives[index];
	};

	StoreFactory.getCurrent = function(){
		if (StoreFactory.current_set == false){
			return false;
		}
		return StoreFactory.current_highlight;
	};

	return StoreFactory;
}]);
