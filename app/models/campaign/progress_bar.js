/*
/ Mongo Module
/ **Progress Bar**
/This will hold all the info for the progress bar
*/

var mongoose = require('mongoose'); //Load the mongoose object

//Incentive Schema
var Reward = require('./reward');

//Campaign Schema
var barSchema = mongoose.Schema({
	total: Number,
	paid: Number,
	rewards:[Reward.schema]
});

//create the model and expose to app
module.exports = mongoose.model('Bar', barSchema)