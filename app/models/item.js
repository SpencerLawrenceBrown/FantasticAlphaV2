/*
/ Mongo Module
/ **Item**
/This will hold item information to be added to the user
*/

var mongoose = require('mongoose'); //Load the mongoose object
var Detail = require('./itemDetails');

//Item Schema
var itemSchema = mongoose.Schema({
	campaign: String,
	name : String,
	price : Number,
	components : [Detail.schema],
	quantity : Number
});

//create the model and expose to app
module.exports = mongoose.model('Item', itemSchema)
