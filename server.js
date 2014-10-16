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

var configDB = require('./config/database.js'); //Database info

//Create express app
var app = express();

//Configuration ======================================================

//Set the port to 8080
var port = process.env.PORT || 8080;

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

var User 			= require('./app/models/user');
var Item 			= require('./app/models/item');
var ItemComponent 	= require('./app/models/itemDetails'); 

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

//Get a simple request for all the projects and return the projects.json file
APIrouter.get('/projects', function(req, res){
	res.sendfile('./app/api/projects.json');
	console.log('complete');
});

APIrouter.get('/userdata', auth, function(req, res){
	User.findById(req.user._id, function(err, user){
		if (err){
			res.send(err);
		}
		res.json(user);
	});
});

APIrouter.put('/userdata', auth, function(req, res){
	User.findById(req.user._id, function(err, user){
		if (err){
			res.send(err);
		}

		for (var x = 0; x < req.body.length; x++){
			var item = new Item();
			item.campaign = req.body[x].info.campaign;
			item.name = req.body[x].info.title;
			item.price = req.body[x].info.price;
			for (var y = 0; y < req.body[x].info.contains.length; y++){
				var itemComp = new ItemComponent();
				itemComp.detail = req.body[x].info.contains[y];
				item.components.push(itemComp);
			}
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
//Frontend Router-------------------
var Frontrouter = express.Router();

Frontrouter.use(function(req, res, next) {
	// do logging
	console.log(req.method, req.url);
	next(); // make sure we go to the next routes and don't stop here
});

//Get a simple request for all the projects and return the projects.json file
Frontrouter.get('/', function(req, res){
	res.render('public/index');
});

Frontrouter.get('/profile', function(req, res){
});

// route to test if the user is logged in or not 
Frontrouter.get('/loggedin', function(req, res){ 
	res.send(req.isAuthenticated() ? req.user : '0'); 
});

Frontrouter.get('/logout', function(req,res){
	req.logout();
	res.send(200);
})

Frontrouter.post('/register', passport.authenticate('local-signup'), function(req,res){
	res.send(req.user);
});

// process the login form
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
