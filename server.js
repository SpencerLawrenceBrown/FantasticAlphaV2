//Fantastic Alpha Server

//Modules ============================================================
var express 		= require('express'); //Server
var mongoose 		= require('mongoose'); //MongoDB
var bodyParser 		= require('body-parser'); //HTTP Request Parser
var methodOverride 	= require('method-override'); //HTTP Request Methods
var passport 		= require('passport'); //Auth
var flash 			= require('connect-flash'); //Session Flash-data
var morgan       	= require('morgan');
var cookieParser 	= require('cookie-parser'); //Cookies
var session      	= require('express-session'); //Sessions
var favicon 		= require('serve-favicon'); //Load Favicon
var modRewrite 		= require('connect-modrewrite'); //Rewrites URLs to load angular views
var http 			= require('http');//Quick Http server
var configDB = require('./config/database.js'); //Database info

//Create express app
var app = express();

//Configuration ======================================================

//Set the port to 8080
var port = process.env.PORT || 3000;

mongoose.connect(configDB.url); //Connect to database

require('./config/passport')(passport); //Pass passport for config

//Module connection
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

//HTML Request parsing
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(favicon(__dirname + '/public/assets/images/favicon.ico'));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'spencerbrownlovespuppys' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//Routing ============================================================

//Models
//User
var User 			= require('./app/models/user/user');
var Item 			= require('./app/models/user/item');
var ItemComponent 	= require('./app/models/user/itemDetails');
//Campaign 
var Campaign 		= require('./app/models/campaign/campaign');
var Store 			= require('./app/models/campaign/store');
var Incentive		= require('./app/models/campaign/incentive');
var Component 		= require('./app/models/campaign/component');
var ProgressBar 	= require('./app/models/campaign/progress_bar');
var Reward 			= require('./app/models/campaign/reward');
var Info 			= require('./app/models/campaign/info');

//Middleware for auth
var auth = function(req,res,next){
	if (!req.isAuthenticated()){
		res.send(401);
	}
	else{
		next();
	}
}

//Database objects
//API Router----------------------
var APIrouter = express.Router();

// middleware to use for all requests --This will fire everytime
APIrouter.use(function(req, res, next) {
	// do logging
	console.log(req.method, req.url);
	next(); // make sure we go to the next routes and don't stop here
});

//**General Actions**//
//Get all the campaigns -- called by Campaigns Meta Factory
APIrouter.get('/all-campaigns', function(req, res){
	Campaign.find(function(err, campaigns){
		if (err){
			res.send(err);
		}
		res.json(campaigns);
	});
});

//**Campaign Actions**//
//---Load---
//Get campaign info -- called by Campaign Factory
APIrouter.get('/campaign-info/:campaign_id', function(req, res){
	Campaign.findById(req.params.campaign_id, function(err, campaign){
		if (err){
			res.send(err);
		}
		res.json(campaign);
	});
});
//Get campaign store -- called by Store Factory
APIrouter.get('/campaign-store/:campaign_id', function(req, res){
	Campaign.findById(req.params.campaign_id, function(err, campaign){
		if (err){
			res.send(err);
		}
		res.json(campaign.store[0]);
	});
});
//Get campaign bar -- called by Progress Bar Factory
APIrouter.get('/campaign-bar/:campaign_id', function(req, res){
	Campaign.findById(req.params.campaign_id, function(err, campaign){
		if (err){
			res.send(err);
		}
		res.json(campaign.progress_bar[0]);
	});
});
//---Edit--- [All PUTS: Finds the campaign based on the project name and the campaign number (NOT ID)]
//Create a new campaign
APIrouter.post('/new-campaign', function(req, res){
	var campaign = new Campaign();
	campaign.project = req.body.project;
	campaign.fans = req.body.fans;
	campaign.campaign_number = req.body.number;

	//Initialize with basic info
	//Info
	var info = new Info();
	info.tabs.updates.title = "Campaign Updates";
	info.tabs.social.producer.title = "From Producer";
	info.tabs.social.fans.title = "From Fans";
	info,active = 'update';
	//Store
	var store = new Store();
	//Bar
	var bar = new ProgressBar();
	bar.total = req.body.total;
	bar.paid = req.body.paid;
	//Set
	campaign.info = info;
	campaign.store = store;
	campaign.progress_bar = bar;

	// save the campaign and check for errors
	campaign.save(function(err) {
		if (err)
			res.send(err);
		res.json(campaign._id);
	});
});
//Add incentives to the store
APIrouter.put('/add-incentives', function(req, res){
	//Find a campaign with a matching project and campaign_number
	Campaign.findOne({project: req.body.project, campaign_number: req.body.number}, function(err, campaign){
		var deJSONstring = JSON.parse(req.body.incentives);
		//Add rewards to store
		for (var i = 0; i < deJSONstring.length; i++){
			var incentive = new Incentive();
			incentive.level = deJSONstring[i].level;
			incentive.description = deJSONstring[i].description;
			incentive.buttonText = deJSONstring[i].buttonText;
			incentive.project = campaign.project;
			incentive.campaign_id = req.body.camp_id;
			incentive.price = deJSONstring[i].price;
			incentive.campaign_number = campaign.campaign_number;

			//Add the different types of incentives
			//Unique
			//These use the components for display the information
			if (deJSONstring[i].contains.unique.length > 0){
				for (var x = 0; x < deJSONstring[i].contains.unique.length; x++){
					console.log(deJSONstring[i].contains.unique);
					var newUnique = new Component();
					newUnique.name = deJSONstring[i].contains.unique[x].name;
					newUnique.description = deJSONstring[i].contains.unique[x].description;
					newUnique.type = deJSONstring[i].contains.unique[x].type;
					incentive.contains.unique.push(newUnique);
				};
			};
			//Carry Over
			if (deJSONstring[i].contains.carry_over.length > 0){
				for (var y = 0; y < deJSONstring[i].contains.carry_over.length; y++){
					var newCarry = deJSONstring[i].contains.carry_over[y];
					incentive.contains.carry_over.push(newCarry);
				};
			};
			//Reward Related
			if (deJSONstring[i].contains.reward_related.length > 0){
				for (var z = 0; z < deJSONstring[i].contains.reward_related.length; z++){
					var newReward = deJSONstring[i].contains.reward_related[z];
					incentive.contains.reward_related.push(newReward);
				};
			};
			//Push into store
			campaign.store[0]["incentives"].push(incentive);
		};	
		// save the campaign and check for errors
		campaign.save(function(err) {
			if (err)
				res.send(err);
			res.json(campaign);
		});
	});
});
//Add reward to the progress bar
APIrouter.put('/add-rewards', function(req, res){
	//Find a campaign with a matching project and campaign_number
	Campaign.findOne({project: req.body.project, campaign_number: req.body.number}, function(err, campaign){
		//rewards to the progress bar
		var deJSONrewards = JSON.parse(req.body.rewards);
		for (var i = 0; i < deJSONrewards.length; i++){
			var reward = new Reward();
			reward.name = deJSONrewards[i].name;
			reward.unlock_amount = deJSONrewards[i].unlock_amount;
			reward.progress = deJSONrewards[i].progress;
			campaign.progress_bar[0]["rewards"].push(reward);
		};
		// save the campaign and check for errors
		campaign.save(function(err) {
			if (err)
				res.send(err);
			res.json(campaign);
		});
	});
});
//Add campaign updates to the updates blog
APIrouter.put('/add-updates', function(req, res){
	//Find a campaign with a matching project and campaign_number
	Campaign.findOne({project: req.body.project, campaign_number: req.body.number}, function(err, campaign){
		var deJSONstring = JSON.parse(req.body.updates);
		for (var i = 0; i < deJSONstring.length; i++){
			var newUpdate = {
				entry_number: deJSONstring[i].entry_number,
				title: deJSONstring[i].title,
				date: deJSONstring[i].date,
				greeting: deJSONstring[i].greeting,
				content: deJSONstring[i].content
			};
			campaign.info[0]["tabs"]["updates"]["content"].push(newUpdate);
		};
		// save the campaign and check for errors
		campaign.save(function(err) {
			if (err)
				res.send(err);
			res.json(campaign);
		});
	});
});
//Add/Update campaign video url
APIrouter.put('/add-video', function(req, res){
	//Find a campaign with a matching project and campaign_number
	Campaign.findOne({project: req.body.project, campaign_number: req.body.number}, function(err, campaign){
		campaign.info[0]["video_data"]["video"] = req.body.video_url;
		// save the campaign and check for errors
		campaign.save(function(err) {
			if (err)
				res.send(err);
			res.json(campaign);
		});
	});
});

//Add/Update campaign image url
APIrouter.put('/add-image', function(req, res){
	//Find a campaign with a matching project and campaign_number
	Campaign.findOne({project: req.body.project, campaign_number: req.body.number}, function(err, campaign){
		campaign.info[0]["video_data"]["image"] = req.body.image_url;
		// save the campaign and check for errors
		campaign.save(function(err) {
			if (err)
				res.send(err);
			res.json(campaign);
		});
	});
});


//**User Actions**//
//Get user data
APIrouter.get('/user-data', auth, function(req, res){
	User.findById(req.user._id, function(err, user){
		if (err){
			res.send(err);
		}
		res.json(user);
	});
});
//Add items to the user's account
APIrouter.put('/user-items', auth, function(req, res){
	User.findById(req.user._id, function(err, user){
		if (err){
			res.send(err);
		}
		for (var x = 0; x < req.body.length; x++){
			var item = new Item();
			item.project = req.body[x].info.project;
			item.level = req.body[x].info.level;
			item.description = req.body[x].info.description;
			item.campaign_id = req.body[x].info.campaign_id;
			item.campaign_number = req.body[x].info.campaign_number;
			item.price = req.body[x].info.totalPrice;
			itemComp = new ItemComponent();
			//Unique
			for (var w = 0; w < req.body[x].info.contains.unique.length; w++){
					itemComp.unique.push(req.body[x].info.contains.unique[w]);
			};
			//carry_over
			for (var y = 0; y < req.body[x].info.contains.carry_over.length; y++){
					itemComp.carry_over.push(req.body[x].info.contains.carry_over[y]);
			};
			//reward_related
			for (var z = 0; z < req.body[x].info.contains.reward_related.length; z++){
					itemComp.reward_related.push(req.body[x].info.contains.reward_related[z]);
			};
			item.components = itemComp;
			item.quantity = req.body[x].quantity;
			user.details.items.push(item);
		}

		user.save(function(err){
			if (err){
				res.send(err);
			}
			res.json(user);
		});
	});
});

//*********************************
//Frontend Router------------------
var Frontrouter = express.Router();

Frontrouter.use(function(req, res, next) {
	// do logging
	console.log(req.method, req.url);
	next(); // make sure we go to the next routes and don't stop here
});
//Returns the home page
Frontrouter.get('/', function(req, res){
	res.render('public/index');
});
//load the user profile
Frontrouter.get('/profile', function(req, res){
});
//route to test if the user is logged in or not 
Frontrouter.get('/loggedin', function(req, res){ 
	res.send(req.isAuthenticated() ? req.user : '0'); 
});
//Log the user out
Frontrouter.get('/logout', function(req,res){
	req.logout();
	res.send(200);
})
//process the register form
Frontrouter.post('/register', passport.authenticate('local-signup'), function(req,res){
	res.send(req.user);
});
//process the login form
Frontrouter.post('/login', passport.authenticate('local-login'), function(req, res){
	res.send(req.user);
});

//Routers
app.use('/api', APIrouter);
app.use('/', Frontrouter);

//Start Server =======================================================

app.listen(port);
console.log('Fantastic is running on ' + port);
exports = module.exports = app;
