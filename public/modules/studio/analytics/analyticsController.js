/*
Analytics Controller
Written by: Spencer Brown, copyright 2014

//Description
This is just for the demo of the analytics
*/

angular.module('AnalyticsCTRL', []).controller('AnalyticsController', ['$scope', function($scope){
	$scope.analy = false;
	$scope.backers = false;
	$scope.current = false;
	$scope.daily= false;
	$scope.map = false;
	$scope.perks = false;
	$scope.projections = false;
	$scope.trend = false;
}]);