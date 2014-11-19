/*
/ Mongo Module
/ **User**
/This will hold our user login information
*/

var mongoose = require('mongoose'); //Load the mongoose object
var bcrypt = require('bcrypt-nodejs'); //Load the encryption middleware for the password

var Item = require('./item');

//Model Schema
var userSchema = mongoose.Schema({
	details :{
		fullname : String,
		items : [Item.schema]
	},

	local : {
		email : String,
		password : String,
	}
});

//Methods
//create hash
//This takes in a password and generates a hash
userSchema.methods.generateHash = function(password){
	 return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//Check password validity
//Compares the password against the local password
userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
};

//create the model and expose to app
module.exports = mongoose.model('User', userSchema)