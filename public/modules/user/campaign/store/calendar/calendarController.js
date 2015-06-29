/*
Calendar Controller
Written by Spencer Brown Copyright 2015

//Description
This controller communicates between the CalFactory and the directive.

//Components
	-Load model
	-refresh model
	
//Map
	-Used by:
		-BarDirective
	-Contains:
		-BarFactory
*/

angular.module('CalCTRL', ['CalFCTR']).controller('CalController', ['CalFactory', function(CalFactory){
	this.model = CalFactory;
	
	this.select = function(date){
		console.log(date);
		CalFactory.selectDate(date);
	}

	CalFactory.setMoment();
}]);