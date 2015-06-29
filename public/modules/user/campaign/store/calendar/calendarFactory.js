/*
Calendar Factory
Written by: Spencer Brown, copywrite 2015

//Description
This manages the calendar data

//Components
	-Builds the calendar

//Map
	-Used by: 
		-CalController - Populates the calendar
*/

angular.module('CalFCTR', []).factory('CalFactory', ['moment', function(moment){
	var CalFactory = {
		teamSchedule:{
		  "3/4/2015": {
		    "Time":"3:05 PM",
		    "Opponent":"White Sox",
		    "Location":"Camelback Ranch",
		    "Status":"Home"
		  },
		  "3/5/2015": {
		    "Time":"3:05 PM",
		    "Opponent":"White Sox",
		    "Location":"Camelback Ranch",
		    "Status":"Home"
		  },
		  "3/6/2015": {
		    "Time":"3:05 PM",
		    "Opponent":"Brewers",
		    "Location":"Maryvale Baseball Park",
		    "Status":"Away"
		  },
		  "3/6/2015": {
		    "Time":"3:05 PM",
		    "Opponent":"Mariners",
		    "Location":"Camelback Ranch",
		    "Status":"Home"
		  },
		  "3/7/2015": {
		    "Time":"3:05 PM",
		    "Opponent":"Indians",
		    "Location":"Goodyear Ballpark",
		    "Status":"Away"
		  },
		  "3/8/2015": {
		    "Time":"4:05 PM",
		    "Opponent":"Brewers",
		    "Location":"Camelback Ranch",
		    "Status":"Home"
		  },
		  "3/9/2015": {
		    "Time":"4:05 PM",
		    "Opponent":"Giants",
		    "Location":"Scottsdale Stadium",
		    "Status":"Away"
		  },
		  "3/10/2015": {
		    "Time":"4:05 PM",
		    "Opponent":"Rockies",
		    "Location":"Camelback Ranch",
		    "Status":"Home"
		  },
		  "3/11/2015": {
		    "Time":"4:05 PM",
		    "Opponent":"Cubs",
		    "Location":"Sloan Park",
		    "Status":"Away"
		  },
		  "3/12/2015": {
		    "Time":"9:30 PM",
		    "Opponent":"Padres",
		    "Location":"Peoria Stadium",
		    "Status":"Away"
		  },
		  "3/13/2015": {
		    "Time":"10:05 PM",
		    "Opponent":"Reds",
		    "Location":"Camelback Ranch",
		    "Status":"Home"
		  },
		  "3/14/2015": {
		    "Time":"4:05 PM",
		    "Opponent":"Indians",
		    "Location":"Camelback Ranch",
		    "Status":"Home"
		  },
		  "3/15/2015": {
		    "Time":"4:05 PM",
		    "Opponent":"Mariners",
		    "Location":"Peoria Stadium",
		    "Status":"Away"
		  },
		  "3/16/2015": {
		    "Time":"4:05 PM",
		    "Opponent":"Athletics",
		    "Location":"Camelback Ranch",
		    "Status":"Home"
		  },
		  "3/17/2015": {
		    "Time":"4:05 PM",
		    "Opponent":"Rangers",
		    "Location":"Surprise Stadium",
		    "Status":"Away"
		  },
		  "3/18/2015": {
		    "Time":"4:05 PM",
		    "Opponent":"Cubs",
		    "Location":"Camelback Ranch",
		    "Status":"Home"
		  },
		  "3/19/2015": {
		    "Time":"4:05 PM",
		    "Opponent":"Angels",
		    "Location":"Camelback Ranch",
		    "Status":"Home"
		  },
		  "3/20/2015": {
		    "Time":"8:05 PM",
		    "Opponent":"Rangers",
		    "Location":"Alamodome",
		    "Status":"Away"
		  },
		  "3/20/2015": {
		    "Time":"4:05 PM",
		    "Opponent":"Athletics",
		    "Location":"HoHoKam Stadium",
		    "Status":"Away"
		  },
		  "3/21/2015": {
		    "Time":"2:05 PM",
		    "Opponent":"Rangers",
		    "Location":"Alamodome",
		    "Status":"Away"
		  },
		  "3/21/2015": {
		    "Time":"4:10 PM",
		    "Opponent":"Rockies",
		    "Location":"Salt River Fields at Talking Stick",
		    "Status":"Away"
		  },
		  "3/22/2015": {
		    "Time":"4:05 PM",
		    "Opponent":"Indians",
		    "Location":"Camelback Ranch",
		    "Status":"Home"
		  },
		  "3/23/2015": {
		    "Time":"4:05 PM",
		    "Opponent":"D-backs",
		    "Location":"Camelback Ranch",
		    "Status":"Home"
		  },
		  "3/25/2015": {
		    "Time":"4:05 PM",
		    "Opponent":"Padres",
		    "Location":"Camelback Ranch",
		    "Status":"Home"
		  },
		  "3/26/2015": {
		    "Time":"4:05 PM",
		    "Opponent":"White Sox",
		    "Location":"Camelback Ranch",
		    "Status":"Home"
		  },
		  "3/27/2015": {
		    "Time":"10:05 PM",
		    "Opponent":"Giants",
		    "Location":"Camelback Ranch",
		    "Status":"Home"
		  },
		  "3/28/2015": {
		    "Time":"4:10 PM",
		    "Opponent":"Angels",
		    "Location":"Tempe Diablo Stadium",
		    "Status":"Away"
		  },
		  "3/29/2015": {
		    "Time":"4:05 PM",
		    "Opponent":"Giants",
		    "Location":"Scottsdale Stadium",
		    "Status":"Away"
		  },
		  "3/29/2015": {
		    "Time":"4:05 PM",
		    "Opponent":"Rangers",
		    "Location":"Camelback Ranch",
		    "Status":"Home"
		  },
		  "3/30/2015": {
		    "Time":"4:10 PM",
		    "Opponent":"D-backs",
		    "Location":"Salt River Fields at Talking Stick",
		    "Status":"Away"
		  },
		  "3/31/2015": {
		    "Time":"4:05 PM",
		    "Opponent":"White Sox",
		    "Location":"Camelback Ranch",
		    "Status":"Home"
		  },
		  "4/1/2015": {
		    "Time":"3:05 PM",
		    "Opponent":"Royals",
		    "Location":"Surprise Stadium",
		    "Status":"Away"
		  },
		  "4/2/2015": {
		    "Time":"10:05 PM",
		    "Opponent":"Angels",
		    "Location":"Angel Stadium of Anaheim",
		    "Status":"Away"
		  },
		  "4/3/2015": {
		    "Time":"10:05 PM",
		    "Opponent":"Angels",
		    "Location":"Angel Stadium of Anaheim",
		    "Status":"Away"
		  },
		  "4/4/2015": {
		    "Time":"9:10 PM",
		    "Opponent":"Angels",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "4/6/2015": {
		    "Time":"4:10 PM",
		    "Opponent":"Padres",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "4/7/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Padres",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "4/8/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Padres",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "4/10/2015": {
		    "Time":"9:40 PM",
		    "Opponent":"D-backs",
		    "Location":"Chase Field",
		    "Status":"Away"
		  },
		  "4/11/2015": {
		    "Time":"8:10 PM",
		    "Opponent":"D-backs",
		    "Location":"Chase Field",
		    "Status":"Away"
		  },
		  "4/12/2015": {
		    "Time":"4:10 PM",
		    "Opponent":"D-backs",
		    "Location":"Chase Field",
		    "Status":"Away"
		  },
		  "4/13/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Mariners",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "4/14/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Mariners",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "4/15/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Mariners",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "4/17/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Rockies",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "4/18/2015": {
		    "Time":"9:10 PM",
		    "Opponent":"Rockies",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "4/19/2015": {
		    "Time":"4:10 PM",
		    "Opponent":"Rockies",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "4/21/2015": {
		    "Time":"10:15 PM",
		    "Opponent":"Giants",
		    "Location":"AT&T Park",
		    "Status":"Away"
		  },
		  "4/22/2015": {
		    "Time":"10:15 PM",
		    "Opponent":"Giants",
		    "Location":"AT&T Park",
		    "Status":"Away"
		  },
		  "4/23/2015": {
		    "Time":"3:45 PM",
		    "Opponent":"Giants",
		    "Location":"AT&T Park",
		    "Status":"Away"
		  },
		  "4/24/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Padres",
		    "Location":"Petco Park",
		    "Status":"Away"
		  },
		  "4/25/2015": {
		    "Time":"8:40 PM",
		    "Opponent":"Padres",
		    "Location":"Petco Park",
		    "Status":"Away"
		  },
		  "4/26/2015": {
		    "Time":"4:10 PM",
		    "Opponent":"Padres",
		    "Location":"Petco Park",
		    "Status":"Away"
		  },
		  "4/27/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Giants",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "4/28/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Giants",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "4/29/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Giants",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "5/1/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"D-backs",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "5/2/2015": {
		    "Time":"9:10 PM",
		    "Opponent":"D-backs",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "5/3/2015": {
		    "Time":"4:10 PM",
		    "Opponent":"D-backs",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "5/4/2015": {
		    "Time":"7:20 PM",
		    "Opponent":"Brewers",
		    "Location":"Miller Park",
		    "Status":"Away"
		  },
		  "5/5/2015": {
		    "Time":"8:10 PM",
		    "Opponent":"Brewers",
		    "Location":"Miller Park",
		    "Status":"Away"
		  },
		  "5/6/2015": {
		    "Time":"8:10 PM",
		    "Opponent":"Brewers",
		    "Location":"Miller Park",
		    "Status":"Away"
		  },
		  "5/7/2015": {
		    "Time":"1:40 PM",
		    "Opponent":"Brewers",
		    "Location":"Miller Park",
		    "Status":"Away"
		  },
		  "5/8/2015": {
		    "Time":"8:40 PM",
		    "Opponent":"Rockies",
		    "Location":"Coors Field",
		    "Status":"Away"
		  },
		  "5/10/2015": {
		    "Time":"4:10 PM",
		    "Opponent":"Rockies",
		    "Location":"Coors Field",
		    "Status":"Away"
		  },
		  "5/11/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Marlins",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "5/12/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Marlins",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "5/13/2015": {
		    "Time":"7:50 PM",
		    "Opponent":"Marlins",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "5/14/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Rockies",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "5/15/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Rockies",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "5/16/2015": {
		    "Time":"9:10 PM",
		    "Opponent":"Rockies",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "5/17/2015": {
		    "Time":"4:10 PM",
		    "Opponent":"Rockies",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "5/19/2015": {
		    "Time":"10:15 PM",
		    "Opponent":"Giants",
		    "Location":"AT&T Park",
		    "Status":"Away"
		  },
		  "5/20/2015": {
		    "Time":"10:15 PM",
		    "Opponent":"Giants",
		    "Location":"AT&T Park",
		    "Status":"Away"
		  },
		  "5/21/2015": {
		    "Time":"3:45 PM",
		    "Opponent":"Giants",
		    "Location":"AT&T Park",
		    "Status":"Away"
		  },
		  "5/22/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Padres",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "5/23/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Padres",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "5/24/2015": {
		    "Time":"4:10 PM",
		    "Opponent":"Padres",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "5/25/2015": {
		    "Time":"8:10 PM",
		    "Opponent":"Braves",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "5/26/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Braves",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "5/27/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Braves",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "5/29/2015": {
		    "Time":"8:15 PM",
		    "Opponent":"Cardinals",
		    "Location":"Busch Stadium",
		    "Status":"Away"
		  },
		  "5/30/2015": {
		    "Time":"7:15 PM",
		    "Opponent":"Cardinals",
		    "Location":"Busch Stadium",
		    "Status":"Away"
		  },
		  "5/31/2015": {
		    "Time":"2:15 PM",
		    "Opponent":"Cardinals",
		    "Location":"Busch Stadium",
		    "Status":"Away"
		  },
		  "6/1/2015": {
		    "Time":"8:40 PM",
		    "Opponent":"Rockies",
		    "Location":"Coors Field",
		    "Status":"Away"
		  },
		  "6/2/2015": {
		    "Time":"3:10 PM",
		    "Opponent":"Rockies",
		    "Location":"Coors Field",
		    "Status":"Away"
		  },
		  "6/2/2015": {
		    "Time":"8:40 PM",
		    "Opponent":"Rockies",
		    "Location":"Coors Field",
		    "Status":"Away"
		  },
		  "6/3/2015": {
		    "Time":"8:10 PM",
		    "Opponent":"Rockies",
		    "Location":"Coors Field",
		    "Status":"Away"
		  },
		  "6/4/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Cardinals",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "6/5/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Cardinals",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "6/6/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Cardinals",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "6/7/2015": {
		    "Time":"8:08 PM",
		    "Opponent":"Cardinals",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "6/8/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"D-backs",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "6/9/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"D-backs",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "6/10/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"D-backs",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "6/12/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Padres",
		    "Location":"Petco Park",
		    "Status":"Away"
		  },
		  "6/13/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Padres",
		    "Location":"Petco Park",
		    "Status":"Away"
		  },
		  "6/14/2015": {
		    "Time":"4:10 PM",
		    "Opponent":"Padres",
		    "Location":"Petco Park",
		    "Status":"Away"
		  },
		  "6/15/2015": {
		    "Time":"8:05 PM",
		    "Opponent":"Rangers",
		    "Location":"Globe Life Park in Arlington",
		    "Status":"Away"
		  },
		  "6/16/2015": {
		    "Time":"8:05 PM",
		    "Opponent":"Rangers",
		    "Location":"Globe Life Park in Arlington",
		    "Status":"Away"
		  },
		  "6/17/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Rangers",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "6/18/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Rangers",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "6/19/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Giants",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "6/20/2015": {
		    "Time":"7:15 PM",
		    "Opponent":"Giants",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "6/21/2015": {
		    "Time":"8:08 PM",
		    "Opponent":"Giants",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "6/22/2015": {
		    "Time":"8:05 PM",
		    "Opponent":"Cubs",
		    "Location":"Wrigley Field",
		    "Status":"Away"
		  },
		  "6/23/2015": {
		    "Time":"8:05 PM",
		    "Opponent":"Cubs",
		    "Location":"Wrigley Field",
		    "Status":"Away"
		  },
		  "6/24/2015": {
		    "Time":"8:05 PM",
		    "Opponent":"Cubs",
		    "Location":"Wrigley Field",
		    "Status":"Away"
		  },
		  "6/25/2015": {
		    "Time":"2:20 PM",
		    "Opponent":"Cubs",
		    "Location":"Wrigley Field",
		    "Status":"Away"
		  },
		  "6/26/2015": {
		    "Time":"7:10 PM",
		    "Opponent":"Marlins",
		    "Location":"Marlins Park",
		    "Status":"Away"
		  },
		  "6/27/2015": {
		    "Time":"4:10 PM",
		    "Opponent":"Marlins",
		    "Location":"Marlins Park",
		    "Status":"Away"
		  },
		  "6/28/2015": {
		    "Time":"1:10 PM",
		    "Opponent":"Marlins",
		    "Location":"Marlins Park",
		    "Status":"Away"
		  },
		  "6/29/2015": {
		    "Time":"9:40 PM",
		    "Opponent":"D-backs",
		    "Location":"Chase Field",
		    "Status":"Away"
		  },
		  "6/30/2015": {
		    "Time":"9:40 PM",
		    "Opponent":"D-backs",
		    "Location":"Chase Field",
		    "Status":"Away"
		  },
		  "7/1/2015": {
		    "Time":"9:40 PM",
		    "Opponent":"D-backs",
		    "Location":"Chase Field",
		    "Status":"Away"
		  },
		  "7/3/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Mets",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "7/4/2015": {
		    "Time":"7:15 PM",
		    "Opponent":"Mets",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "7/5/2015": {
		    "Time":"4:10 PM",
		    "Opponent":"Mets",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "7/6/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Phillies",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "7/7/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Phillies",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "7/8/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Phillies",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "7/9/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Phillies",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "7/10/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Brewers",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "7/11/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Brewers",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "7/12/2015": {
		    "Time":"4:10 PM",
		    "Opponent":"Brewers",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "7/14/2015": {
		    "Time":"7:30 PM",
		    "Opponent":"AL All-StarsNL All-Stars",
		    "Location":"Great American Ball Park",
		    "Status":"Away"
		  },
		  "7/17/2015": {
		    "Time":"7:05 PM",
		    "Opponent":"Nationals",
		    "Location":"Nationals Park",
		    "Status":"Away"
		  },
		  "7/18/2015": {
		    "Time":"4:05 PM",
		    "Opponent":"Nationals",
		    "Location":"Nationals Park",
		    "Status":"Away"
		  },
		  "7/19/2015": {
		    "Time":"1:35 PM",
		    "Opponent":"Nationals",
		    "Location":"Nationals Park",
		    "Status":"Away"
		  },
		  "7/20/2015": {
		    "Time":"7:10 PM",
		    "Opponent":"Braves",
		    "Location":"Turner Field",
		    "Status":"Away"
		  },
		  "7/21/2015": {
		    "Time":"7:10 PM",
		    "Opponent":"Braves",
		    "Location":"Turner Field",
		    "Status":"Away"
		  },
		  "7/22/2015": {
		    "Time":"12:10 PM",
		    "Opponent":"Braves",
		    "Location":"Turner Field",
		    "Status":"Away"
		  },
		  "7/23/2015": {
		    "Time":"7:10 PM",
		    "Opponent":"Mets",
		    "Location":"Citi Field",
		    "Status":"Away"
		  },
		  "7/24/2015": {
		    "Time":"7:10 PM",
		    "Opponent":"Mets",
		    "Location":"Citi Field",
		    "Status":"Away"
		  },
		  "7/25/2015": {
		    "Time":"7:10 PM",
		    "Opponent":"Mets",
		    "Location":"Citi Field",
		    "Status":"Away"
		  },
		  "7/26/2015": {
		    "Time":"1:10 PM",
		    "Opponent":"Mets",
		    "Location":"Citi Field",
		    "Status":"Away"
		  },
		  "7/28/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Athletics",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "7/29/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Athletics",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "7/31/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Angels",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "8/1/2015": {
		    "Time":"4:05 PM",
		    "Opponent":"Angels",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "8/2/2015": {
		    "Time":"3:33 AM",
		    "Opponent":"Angels",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "8/4/2015": {
		    "Time":"7:05 PM",
		    "Opponent":"Phillies",
		    "Location":"Citizens Bank Park",
		    "Status":"Away"
		  },
		  "8/5/2015": {
		    "Time":"7:05 PM",
		    "Opponent":"Phillies",
		    "Location":"Citizens Bank Park",
		    "Status":"Away"
		  },
		  "8/6/2015": {
		    "Time":"1:05 PM",
		    "Opponent":"Phillies",
		    "Location":"Citizens Bank Park",
		    "Status":"Away"
		  },
		  "8/7/2015": {
		    "Time":"7:05 PM",
		    "Opponent":"Pirates",
		    "Location":"PNC Park",
		    "Status":"Away"
		  },
		  "8/8/2015": {
		    "Time":"4:05 PM",
		    "Opponent":"Pirates",
		    "Location":"PNC Park",
		    "Status":"Away"
		  },
		  "8/9/2015": {
		    "Time":"1:35 PM",
		    "Opponent":"Pirates",
		    "Location":"PNC Park",
		    "Status":"Away"
		  },
		  "8/10/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Nationals",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "8/11/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Nationals",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "8/12/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Nationals",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "8/13/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Reds",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "8/14/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Reds",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "8/15/2015": {
		    "Time":"9:10 PM",
		    "Opponent":"Reds",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "8/16/2015": {
		    "Time":"4:10 PM",
		    "Opponent":"Reds",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "8/18/2015": {
		    "Time":"10:05 PM",
		    "Opponent":"Athletics",
		    "Location":"O.co Coliseum",
		    "Status":"Away"
		  },
		  "8/19/2015": {
		    "Time":"3:35 PM",
		    "Opponent":"Athletics",
		    "Location":"O.co Coliseum",
		    "Status":"Away"
		  },
		  "8/21/2015": {
		    "Time":"8:10 PM",
		    "Opponent":"Astros",
		    "Location":"Minute Maid Park",
		    "Status":"Away"
		  },
		  "8/22/2015": {
		    "Time":"7:10 PM",
		    "Opponent":"Astros",
		    "Location":"Minute Maid Park",
		    "Status":"Away"
		  },
		  "8/23/2015": {
		    "Time":"2:10 PM",
		    "Opponent":"Astros",
		    "Location":"Minute Maid Park",
		    "Status":"Away"
		  },
		  "8/25/2015": {
		    "Time":"7:10 PM",
		    "Opponent":"Reds",
		    "Location":"Great American Ball Park",
		    "Status":"Away"
		  },
		  "8/26/2015": {
		    "Time":"7:10 PM",
		    "Opponent":"Reds",
		    "Location":"Great American Ball Park",
		    "Status":"Away"
		  },
		  "8/27/2015": {
		    "Time":"12:35 PM",
		    "Opponent":"Reds",
		    "Location":"Great American Ball Park",
		    "Status":"Away"
		  },
		  "8/28/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Cubs",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "8/29/2015": {
		    "Time":"9:10 PM",
		    "Opponent":"Cubs",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "8/30/2015": {
		    "Time":"3:33 AM",
		    "Opponent":"Cubs",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "8/31/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Giants",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "9/1/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Giants",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "9/2/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Giants",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "9/3/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Padres",
		    "Location":"Petco Park",
		    "Status":"Away"
		  },
		  "9/4/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Padres",
		    "Location":"Petco Park",
		    "Status":"Away"
		  },
		  "9/5/2015": {
		    "Time":"8:40 PM",
		    "Opponent":"Padres",
		    "Location":"Petco Park",
		    "Status":"Away"
		  },
		  "9/6/2015": {
		    "Time":"4:10 PM",
		    "Opponent":"Padres",
		    "Location":"Petco Park",
		    "Status":"Away"
		  },
		  "9/7/2015": {
		    "Time":"9:05 PM",
		    "Opponent":"Angels",
		    "Location":"Angel Stadium of Anaheim",
		    "Status":"Away"
		  },
		  "9/8/2015": {
		    "Time":"10:05 PM",
		    "Opponent":"Angels",
		    "Location":"Angel Stadium of Anaheim",
		    "Status":"Away"
		  },
		  "9/9/2015": {
		    "Time":"10:05 PM",
		    "Opponent":"Angels",
		    "Location":"Angel Stadium of Anaheim",
		    "Status":"Away"
		  },
		  "9/11/2015": {
		    "Time":"9:40 PM",
		    "Opponent":"D-backs",
		    "Location":"Chase Field",
		    "Status":"Away"
		  },
		  "9/12/2015": {
		    "Time":"8:10 PM",
		    "Opponent":"D-backs",
		    "Location":"Chase Field",
		    "Status":"Away"
		  },
		  "9/13/2015": {
		    "Time":"4:10 PM",
		    "Opponent":"D-backs",
		    "Location":"Chase Field",
		    "Status":"Away"
		  },
		  "9/14/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Rockies",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "9/15/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Rockies",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "9/16/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Rockies",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "9/18/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Pirates",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "9/19/2015": {
		    "Time":"9:10 PM",
		    "Opponent":"Pirates",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "9/20/2015": {
		    "Time":"4:10 PM",
		    "Opponent":"Pirates",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "9/21/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"D-backs",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "9/22/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"D-backs",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "9/23/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"D-backs",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "9/24/2015": {
		    "Time":"3:10 PM",
		    "Opponent":"D-backs",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "9/25/2015": {
		    "Time":"8:10 PM",
		    "Opponent":"Rockies",
		    "Location":"Coors Field",
		    "Status":"Away"
		  },
		  "9/26/2015": {
		    "Time":"8:10 PM",
		    "Opponent":"Rockies",
		    "Location":"Coors Field",
		    "Status":"Away"
		  },
		  "9/27/2015": {
		    "Time":"4:10 PM",
		    "Opponent":"Rockies",
		    "Location":"Coors Field",
		    "Status":"Away"
		  },
		  "9/28/2015": {
		    "Time":"10:15 PM",
		    "Opponent":"Giants",
		    "Location":"AT&T Park",
		    "Status":"Away"
		  },
		  "9/29/2015": {
		    "Time":"10:15 PM",
		    "Opponent":"Giants",
		    "Location":"AT&T Park",
		    "Status":"Away"
		  },
		  "9/30/2015": {
		    "Time":"10:15 PM",
		    "Opponent":"Giants",
		    "Location":"AT&T Park",
		    "Status":"Away"
		  },
		  "10/1/2015": {
		    "Time":"3:45 PM",
		    "Opponent":"Giants",
		    "Location":"AT&T Park",
		    "Status":"Away"
		  },
		  "10/2/2015": {
		    "Time":"10:10 PM",
		    "Opponent":"Padres",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "10/3/2015": {
		    "Time":"9:10 PM",
		    "Opponent":"Padres",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  },
		  "10/4/2015": {
		    "Time":"3:10 PM",
		    "Opponent":"Padres",
		    "Location":"Dodger Stadium",
		    "Status":"Home"
		  }},
		selectedDate:{},
		currentDate:{},
		calendar:{
			month: "January",
			weeks:[]
		}
	};

	CalFactory.selectDate = function(date){
		CalFactory.selectedDate.choosen = false;
		CalFactory.selectedDate = date;
		CalFactory.selectedDate.choosen = true;
	}

	CalFactory.setMoment = function(){
		CalFactory.currentDate = moment();
		console.log(CalFactory.currentDate);
		console.log(CalFactory.currentDate.day(0).day(0).hour(0).minute(0).second(0).millisecond(0));
		CalFactory.buildCal(CalFactory.currentDate);
	};

	CalFactory.buildCal = function(date){
		start = date.clone();
		CalFactory.calendar.month = start.format("MMMM YYYY");
		buildMonth(start.startOf('month'));
		console.log(CalFactory);
		function buildMonth(start){
			CalFactory.calendar.weeks = [];
			currentMonth = start.month(),
			date = start.clone();
        	while (currentMonth == date.month()) {
        		//Start at beginning of the week
        		date.day(0);
	            CalFactory.calendar.weeks.push({days: buildWeek(date.clone(), start.month())});
	            date.add(1, "w");
        	}
		}
		function buildWeek(date, month){
			var days = [];
			for (var i = 0; i < 7; i++) {
            	days.push({
                	name: date.format("dd").substring(0, 1),
                	number: date.date(),
                	game: CalFactory.teamSchedule[date.format("M/D/YYYY")],
                	isCurrentMonth: date.month() === month,
                	choosen: false,
                	date: date.format("MMMM Do YYYY")
            	});
            	date = date.clone();
            	date.add(1, "d");
        	}
        	CalFactory.selectDate(days[0]);
        	return days;
		}
	}
	return CalFactory;
}]);
