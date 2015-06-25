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
		home_incentives:{}, 
		team_incentives:{}, 
		stadium_incentives:{},
		home_select : false,
		team_select : false,
		stadium_select : false, 
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
			StoreFactory.home_incentives = data.home_incentives;
			StoreFactory.team_incentives = data.team_incentives;
			StoreFactory.stadium_incentives = data.stadium_incentives;
			StoreFactory.current_set = false;
			StoreFactory.current_highlight = {};
			console.log(StoreFactory);
		});
	};

	StoreFactory.setCurrent = function(incentive){
		if (StoreFactory.current_set == false){
			StoreFactory.current_set = true;
		}
		function checkIncentive(array, incentive){
			var found = false;
			//Check for it
			for (i = 0; i<array.length; i++){
				if (array[i] == incentive){
					StoreFactory.current_highlight = array[i];
					found = true;
				}
			}
			return found;
		}
		StoreFactory.home_select = checkIncentive(StoreFactory.home_incentives, incentive);
		StoreFactory.team_select = checkIncentive(StoreFactory.team_incentives,incentive);
		StoreFactory.stadium_select = checkIncentive(StoreFactory.stadium_incentives, incentive);
	};

	StoreFactory.getCurrent = function(){
		if (StoreFactory.current_set == false){
			return false;
		}
		console.log(StoreFactory.current_highlight);
		return StoreFactory.current_highlight;
	};

	return StoreFactory;
}]);
