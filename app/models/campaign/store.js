/*
/ Mongo Module
/ **Store**
/This will hold all the incentives for the store
*/

var mongoose = require('mongoose'); //Load the mongoose object

//Incentive Schema
var Incentive = require('./incentive');

//Campaign Schema
var storeSchema = mongoose.Schema({
	home_incentives:[Incentive.schema],
	team_incentives:[Incentive.schema],
	stadium_incentives:[Incentive.schema]
});

//create the model and expose to app
module.exports = mongoose.model('Store', storeSchema)