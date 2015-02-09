/*
/ Mongo Module
/ **Component**
/This is the parts of a  of the incentives
*/

var mongoose = require('mongoose'); //Load the mongoose object

//Campaign Schema
var componentSchema = mongoose.Schema({
	name: String,
	//Description of the reward
	description: String,
	//Digital, Physical
	type: String
});

//create the model and expose to app
module.exports = mongoose.model('Component', componentSchema)