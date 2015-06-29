/*
Calendar Directive
Written by: Spencer Brown, copyright 2015
Heavily inspired by Chris Harrington https://www.codementor.io/angularjs/tutorial/angularjs-calendar-directives-less-cess-moment-font-awesome

//Description
This allows users to pick a date for the game that they want to view

//Components
	-Goes month to month
	-Shows icon of the teams playing on those days

//Controller: calendarController
//That controller talks to the store controller

//Map
	-Usedby:
		-calendarTemplate.html
	-Contains:
		-calendarController
*/

angular.module('CalDRCT', ['CalCTRL']).directive('fnCalendar', function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'modules/user/campaign/store/calendar/calendarTemplate.html',
		controller: 'CalController',
		controllerAs: 'cal'
	};
});