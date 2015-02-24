/*
/ Mongo Module
/ **Incentive**
/This will hold all the information for an incentive
*/

var mongoose = require('mongoose'); //Load the mongoose object

//Component of the incentive
var Component = require('./component');
//Campaign Schema
var incentiveSchema = mongoose.Schema({
	level: String,
	name: String,
	description: String,
	buttonText: String,
	project: String,
	//Unique campaign string
	campaign_id: String,
	price: Number,
	item_id: Number,
	campaign_number: Number,
	contains:{
		//Items unique to this level
		unique:[Component.schema],
		//Other levels included in this level
		carry_over:[String],
		//Items that are related to the rewards unlocked in the campaign
		reward_related:[String]
	}
});

//create the model and expose to app
module.exports = mongoose.model('Incentive', incentiveSchema)