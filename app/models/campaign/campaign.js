/*
/ Mongo Module
/ **Campaign**
/This will hold all the information for a campaign
*/

var mongoose = require('mongoose'); //Load the mongoose object

var Store = require('./store');
var Bar = require('./progress_bar');
var Info = require('./info');

//Campaign Schema
var campaignSchema = mongoose.Schema({
	//Project
	project: String,
	//Campaign number is NOT the id. This is the number of campaigns under a certain project. So Chuck, campaign #2
	campaign_number: Number,
	//Number of fans
	fans: Number,
	//Info for the store component
	store: [Store.schema],
	//Info the for the progress_bar
	progress_bar: [Bar.schema],
	//Info for video, social, and campaign updates
	info: [Info.schema]
});

//create the model and expose to app
module.exports = mongoose.model('Campaign', campaignSchema)