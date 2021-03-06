/*
/ Mongo Module
/ **Item Component**
/This will hold item details to be added to the item obkect
*/

var mongoose = require('mongoose'); //Load the mongoose object

//Item Schema
var itemDetailSchema = mongoose.Schema({
	carry_over: [String],
	reward_related: [String],
	unique: [String]
});

//create the model and expose to app
module.exports = mongoose.model('ItemComponent', itemDetailSchema)
