/*
Nav Bar Controller
Written by: Spencer Brown, copyright 2014
--Fun Fact: written while eating a steak in dorm room at UCT in Cape Town--\

//Description
This controller maintains communcation between the ProjectMetaFactory and the
fn-nav directive. Referred to as 'nav' by fn-nav. i.e. {{nav.foo}}

//Components
	Function:
		-No idea

//Map
Used by:
	-NavDirective.js
Contains:
	-ProjectMetaFactory.js
*/

angular.module('NavCTRL', []).controller('NavController', [ '$scope', function($scope){
	this.test = 'tttt';
}]);