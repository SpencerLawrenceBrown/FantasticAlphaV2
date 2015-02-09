/*
/ Mongo Module
/ **Info**
/This will hold all the more general info for the campaign-Videos, images, social, updates
*/

var mongoose = require('mongoose'); //load mongoose

var infoSchema = mongoose.Schema({
	video_data:{
		//url
		video: String,
		image: String
	},
	tabs:{
		updates:{
			title: String,
			content:[{
				entry_number: Number,
				title: String,
				date: String,
				greeting: String,
				content: String
			}]
		},
		social:{
			producer:{
				title: String
			},
			fans:{
				title: String
			}
		}
	},
	active: String
});

//create the model and expose to app
module.exports = mongoose.model('Info', infoSchema)