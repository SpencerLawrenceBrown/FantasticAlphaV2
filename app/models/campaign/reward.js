/*
/ Mongo Module
/ **Reward**
/This will hold all the info for a specific reward
*/

var mongoose = require('mongoose'); //Load the mongoose object

//Campaign Schema
var rewardSchema = mongoose.Schema({
	name: String,
	unlock_amount: Number,
	progress: String
});

//create the model and expose to app
module.exports = mongoose.model('Reward', rewardSchema)