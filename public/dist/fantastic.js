/*Fantastic App V2
Written by: Spencer Brown, copyright 2014

Main module that contains the ng-app. Inject the others modules into this module
Eventually add lazy loading. This page will also hold the config (Providers for routing,
HTTP, and location)
*/

var app = angular.module('FantasticAlphaV2', [
	//Libs
	'ngRoute',
	'ngSanitize', 
	'ui.bootstrap',
	//Custom
	'NavDRCT',
	'CartDRCT',
	'StoreDRCT',
	'VideoDRCT',
	'TabsDRCT',
	'BarDRCT',
	'OdometerDRCT',
	'CheckoutDRCT',
	'RepeatDRCT',
	'UserFormCTRL',
	'UserPageCTRL',
	'HomePageCTRL',
	//Analytics
	'angulartics',
	'angulartics.segment.io'
]);

// configure our routes
app.config(function($routeProvider, $locationProvider, $httpProvider) {
	$routeProvider
		//route for home page
		.when('/', {
			controller : 'HomepageController',
			controllerAs : 'homepage',
			templateUrl : 'modules/homepage/homeTemplate.html'
		})

		// route for campaigns
		.when('/campaign/:campaign_id', {
			controller : 'CampaignController',
			controllerAs: 'campaign',
			templateUrl : 'modules/campaign/campaignTemplate.html'
		})
		.when('/faq', {
			templateUrl: 'modules/works/worksTemplate.html'
		})
		//Log-in
		.when('/login', {
			controller : 'UserFormController',
			controllerAs : 'account',
			templateUrl : 'modules/auth/loginTemplate.html'
		})
		//Register
		.when('/register', {
			controller : 'UserFormController',
			controllerAs : 'account',
			templateUrl : 'modules/auth/registerTemplate.html'
		})
		.when('/user', {
			controller : 'UserPageController',
			controllerAs : 'user',
			templateUrl : 'modules/user/userTemplate.html',
			resolve: {
				loggedin: ['AuthFactory', function(AuthFactory){
    				AuthFactory.checkLoggedIn();
    			}]
			}
		});
	// Use HTML5 History API
	// $locationProvider.html5Mode(true);

	//Look for 401 - when the user is invalid, and send to the login page
	$httpProvider.interceptors.push(function($q, $location) {
	  return function(promise){
	  	return promise.then(// Success: just return the response 
				function(response){ 
					return response; 
				}, 
				// Error: check the error status to get only the 401 
				function(response) { 
					if (response.status === 401) {
						$location.url('/'); 
					}
					return $q.reject(response);
				} 
			); 
	  	};
	});
});

/*
Auth Factory
Written by: Spencer Brown, copywrite 2014

//Description
This factory holds the model for authentification. Manages sign in & login.

//Components
	-Auth Factory object
	-Functions
		-CheckLoggedIn: Checks if the current user is logged in
		-logOut: Logs out the user
		-register

//Map
	-Used by: 
		-UserFormController - Transfers info from the view to factory
	-Contains:
		-none
*/

angular.module('AuthFCTR', []).factory('AuthFactory', ['$q', '$rootScope', '$timeout', '$http', '$location', function($q, $rootScope, $timeout, $http, $location){
	var deferred = $q.defer();

	var AuthFactory = {
		loggedin : false,
		email : '',
		password : '',
		name : '',
		loginMSG: false
	};

	AuthFactory.checkLoggedIn = function(){
		$http.get('/loggedin').success(function(user){
			//Authenticated
			if (user != 0){
				$timeout(deferred.resolve, 0);
			}
			else{
				$timeout(function(){deferred.reject();}, 0);
				AuthFactory.loginMSG = true;
				$location.url('/login');
			}
		});
	}

	AuthFactory.logOut = function(){
		$http.get('/logout').success(function(){
			AuthFactory['loggedin'] = false;
			AuthFactory['loginMSG'] = false;
			$location.url('/');
		});
	}

	AuthFactory.register = function(data){
		// $http({
		// 	method : 'POST',
		// 	url : '/register',
		// 	data : $.param(data),
		// 	headers : {'Content-Type' : 'application/x-www-form-urlencoded'}
		// }).success(function(resp){
		// 	AuthFactory['loggedin'] = true;
		// 	AuthFactory['email'] = resp.local.email;
		// 	AuthFactory['password'] = resp.local.password;
		// 	AuthFactory['name'] = resp.details.fullname;
		// 	//$location.url('/user');
		// });
		
		//For use with email only
		$http({
			method : 'POST',
			url : '/register',
			data : $.param(data),
			headers : {'Content-Type' : 'application/x-www-form-urlencoded'}
		}).success(function(resp){
			AuthFactory['loggedin'] = true;
			AuthFactory['loginMSG'] = false;
			//$location.url('/user');
		}).error(function(){
			AuthFactory['loggedin'] = false;
			AuthFactory['loginMSG'] = true;
		});
	}

	AuthFactory.login = function(data){
		$http({
			method: 'POST',
			url: '/login',
			data: $.param(data),
			headers: {'Content-Type' : 'application/x-www-form-urlencoded'}
		}).success(function(resp){
			AuthFactory['loggedin'] = true;
			AuthFactory['loginMSG'] = false;
			AuthFactory['email'] = resp.local.email;
			AuthFactory['password'] = resp.local.password;
			$location.url('/user');
		});
	}

	var checkoutListener = $rootScope.$on('checkout:failed', function(){
		AuthFactory['loginMSG'] = true;
	});

	return AuthFactory;
}]);
/*
User Form Controller
Written by: Spencer Brown, copyright 2014

//Description
This controller communicates between the authFactory and the template.

//Components
	-getJson
	-postData
	
//Map
	-Used by:
		-LoginTemplate
		-RegistrationTemplate
	-Contains:
		-AuthFactory
*/
angular.module('UserFormCTRL', ['AuthFCTR']).controller('UserFormController', ['$rootScope','$scope','AuthFactory', function($rootScope, $scope, AuthFactory){
	$scope.auth = AuthFactory;
	$scope.fullname = '';
	$scope.email = '';
	$scope.password	 = '';

	var getJSON =  function(register){
		var formData = {
			email 		: $scope.email,
			password 	: "test",
			fullname 	: "user"
		};
		return formData;
	};

	$scope.postForm = function(register){
		if (register){
			AuthFactory.register(getJSON());
		} else {
			AuthFactory.login(getJSON());
		}
	};

	$scope.islogged = function(){
		$scope.auth.checkLoggedIn();
	};
	
	//Listens for when the checkout fails and makes the loginMSG visible
	var failureListener = $rootScope.$on('checkout:failed', function(){
		AuthFactory.loginMSG = true;
	});
}]);
/*
Campaign Controller
Written by: Spencer Brown, copyright 2014

//Description
This controller will communicate between the campaign view and the campaign factory. Just like every other controller.

//Components
	-References to:
		-Video url
		-Copy about Campaign
		-Embed for social
		-content for blog

//Map
	-Used by:
		-BarTemplate: For the rewards
		-CampaignTemplate
		-App Routing
	-Contains:
		- campaignFactory
*/

angular.module('CampaignCTRL', ['CampaignFCTR', 'BarFCTR']).controller('CampaignController', ['CampaignFactory', 'BarFactory', '$analytics', '$scope', function(CampaignFactory, BarFactory, $analytics, $scope){
	//Model connection
	//Enables the directive to watch the factory model
	this.bar = BarFactory;
	this.video = CampaignFactory.video;
	this.tabs = CampaignFactory.tabs;
	this.project = CampaignFactory.campaign;
	$scope.url = "";

	//Reload the inventory
	this.setActiveTab = function(index){
		CampaignFactory.setActiveTab(index);
	};

	CampaignFactory.
		loadCampaign().
		then(function(){
			this.project = CampaignFactory.campaign;
			this.video = CampaignFactory.video;
			this.tabs = CampaignFactory.tabs;
			$scope.url = CampaignFactory.video.url;
			var path = '/campaign/' + this.video.project;
			$analytics.pageTrack(path);
			console.log('firsed');
		}.bind(this));
}]);
/*
Campaign Factory
Written by: Spencer Brown, copywrite 2014

//Description
This factory holds the model for the campaign.
Basically just loads all the campaign data from the server.

//Components
	-Campaign Factory object (model): Houses the campaign model.
	-Functions
		-Get

//Map
	-Used by: 
		-CampaignController - Populates the store directive
	-Contains:
		-none
*/

angular.module('CampaignFCTR', []).factory('CampaignFactory', ['$routeParams', '$http', '$sce', function($routeParams, $http, $sce){
	//Model
	var CampaignFactory = {
		campaign:{
			producer: "",
			fans: 0
		},
		video:{
			url:{},
			id: "",
			image: ""
		},
		info: {},
		tabs: {}
	};

	//Methods
	//Load the campaign data from the server
	CampaignFactory.loadCampaign = function(){
		var urlString = "api/campaign-info/" + $routeParams.campaign_id;
		return $http({
			method: "GET",
			url: urlString,
		}).success(function(data){
			CampaignFactory.campaign.producer = data.producer;
			CampaignFactory.campaign.fans = data.fans;
			CampaignFactory.campaign.project = data.project;
			//Sets the video as a trusted resource so that iframe will play. Also adds different small controls to change apperance
			CampaignFactory.video.url = $sce.trustAsResourceUrl(data.info[0].video_data.video+ "?enablejsapi=1&modestbranding=1&autohide=1&showinfo=0");
			//Set the path for the campaign image
			CampaignFactory.video.image = "assets/images/" + data.info[0].video_data.image + ".jpg";
			//Sets the tabs data
			CampaignFactory.tabs = data.info[0].tabs;
			//Always start with the update tab open
			CampaignFactory.tabs.active = "update";
		});
	};
	//Set the active tab
	CampaignFactory.setActiveTab = function(index){
		//Add a switch statement
		if (index === 0){
			CampaignFactory.tabs.active = "producer";
		}
		else if (index === 1){
			CampaignFactory.tabs.active = "fan";
		}
		else if (index === 2){
			CampaignFactory.tabs.active = "update";
		}
	};
	
	return CampaignFactory;
}]);

/*
Progress Bar Controller
Written by: Spencer Brown, copyright 2014

//Description
This controller communicates between the barFactory and the directive.

//Components
	-Load model
	-refresh model
	
//Map
	-Used by:
		-BarDirective
	-Contains:
		-BarFactory
*/

angular.module('BarCTRL', ['BarFCTR']).controller('BarController', ['BarFactory', function(BarFactory){
	//--------------------------------------------
	//Data
	//Binding for the actual campaign amounts, contains campaignTotal, campaignPaid, campaignCart
	//All variables explained in barFactory.js
	this.actual = BarFactory.actual;

	//Binding for the progress bar visual, contains barTotal, barPaid, barCart
	//All variables explained in barFactory.js
	this.visual = BarFactory.visual;

	//Binding for the rewards
	this.rewards = BarFactory.rewards;

	//--------------------------------------------
	//Methods
	//Reload the inventory
	this.loadData = function(){
		BarFactory.getData();
	};
	//Change the value of the bar
	this.changeBar = function(value){
		BarFactory.changeValue(value);
	};
	//Simulate checkout
	this.checkout = function(){
		BarFactory.checkout();
	}
	//Calls a method that updates the model
	this.recalculateRewardPositions= function(newWidth){
		BarFactory.calculateRewardPositions(newWidth);
	}
	//Calls a method that updates the model
	this.updateCounterPosition= function(newWidth){
		BarFactory.updateCounterPosition(newWidth);
	}
	//Updates the rewards progress
	this.updateRewardsProgress = function(){
		BarFactory.updateRewardsProgress();
	}

	//Initialize
	//Load the bar factory when the controller is instantiated
	BarFactory.
		getData().
		then(function(){
			this.values = BarFactory.actual;
			this.progress = BarFactory.visual;
			this.rewards = BarFactory.rewards;
		}.bind(this));
}]);
/*
Progress Bar Directive
Written by: Spencer Brown, copyright 2014

//Description:
This directive does all the DOM manipulation for the Progress bar.

//Components:
	-Join now button - updates fanbase numbers
	-Bar rewards - items that are unlocked
	-Bar
		-pending bar - takes into account items in user's cart
		-current bar - total amount spent

//Map:
	-Usedby:
		-campaignTemplate.html
	-contains:
		-barController.js
*/
angular.module('BarDRCT', ['BarCTRL']).directive('fnBar', function(){
	// Runs during compile
	return {
		restrict: 'E',
		replace: true,
		transclude: false,
		templateUrl: 'modules/campaign/progress_bar/barTemplate.html',
		controllerAs: 'bar',
		controller: 'BarController',
		link: function(scope, element, attrs, controller) {
			//Methods
			//Calculate the reward position
			//The apply signifiies if the function will be called out of the $digest cycle
			var recalculateRewardPosition = function(apply){
				var width = $("#campaign_content #progress_bar").width();
				//Updates the model through the controller
				controller.recalculateRewardPositions(width);
				if (apply){
					//Since the resize event is out of the angular lifecycle scope$apply calls the $digest and updates the values
					scope.$apply();
				}
			};
			//Update the counter position
			//The counter is located at the end of the cart div
			//The apply signifiies if the function will be called out of the $digest cycle
			var updateCounterPosition = function(apply){
				var width = $("#campaign_content #progress_bar").width();
				controller.updateCounterPosition(width);
				controller.updateRewardsProgress();
				if (apply){
					//Since the resize event is out of the angular lifecycle scope$apply calls the $digest and updates the values
					scope.$apply();
				}
			}
			//Events/Listeners
			//Listen for when the ng-repeat the contains the rewards is loaded so that they can be manipulated
			scope.$on('RewardsRepeatLoaded', function(event){
				setTimeout(function(){
					recalculateRewardPosition(true);
					updateCounterPosition(true);
				}, 500);
    		});

			//When the window gets resized, recalculate where the rewards should be
			$(window).resize(function() {
				recalculateRewardPosition(true);
				updateCounterPosition(true);
			});

			//When the 'join the fanbase button is clicked, scroll to store'
			$('button#join_fanbase').click(function(){
			$('html,body').animate({
		            scrollTop: $('#store_container').offset().top - 100
		         }, 600);
			});

			//When the 'go to cart' button is clicked, scroll to cart'
			$('button#checkout_scroll').click(function(){
			$('html,body').animate({
		            scrollTop: $('#checkout_div').offset().top - 50
		         }, 600);
			});
			$('button.add_to_cart').click(function(){
			$('html,body').animate({
		            scrollTop: $('#reward_bar_div').offset().top - 50
		         }, 200);
			$('html,body').clearQueue();
			});
		}
	};
});

/*
Progress Bar Factory
Written by: Spencer Brown, copyright 2014

//Description
This factory is more interesting than the others. Due to the templated nature of the campaigns and the life cycle
of ng-view controllers (they are destroyed when the view is changed), the information will have to be reloaded
each time the view is changed. This is less than ideal, but that's ok. When the factory is reloaded, it will make 
a call to the server as well as communicate with the cart factory to see if there are any of its items in it.
Depending on the results it will update the progress bar accordingly.

//Components[need to update]
	-Paid model: Holds the data for the bar that shows the progress that has already been achieved
	-Cart model: Holds the data for the bar that shows the potential progress to be made with an order

//Map
	-Usedby:
		-BarController
	-Contains:
		-CartFactory 
*/

angular.module('BarFCTR', ['CartFCTR']).factory('BarFactory', ['$routeParams', '$http', '$rootScope', 'CartFactory', function($routeParams, $http, $rootScope, CartFactory){
	//MODEL
	/*!IMPORTANT - The total is set to 100. The current progress bar plugin uses that to set the max,
	thus going forward all the values must be repreportioned relative to 100.
	So if the total is acutally 3000 and the current value is 1234, then the value
	value for the bar is 1234/3000 * 100.
	
	More info about Bar Factory. Because of the necessary translation(explained above^),
	the BarFactory holds two sets of variables-one for the odometer and one for the progress.
	
	1)The actual is the element that shows how much money has been raised.
	That value is NOT translated to fit the bar. So if the campaign has raised $1234, then its value
	is 1234.

	2)The progress bar holds the values for displaying the progress bar. if the campaign had
	raised $1234 out of $3000, then the value under progress bar would be 1234/3000 * 100 or 41.13.
 	*/
	var BarFactory = {
		actual: {
			campaignTotal: 0, //Total amount the campaign wants to raise
			campaignPaid: 0,  //Amount the campaign has already raised
			campaignCart: 0   //Amount in the user's cart that goes towards this campaign
		},
		visual: { 
		//Same as the values in 'BarFactory.actual', but scaled for the progress bar visual
			barTotal: 100,
			barPaid: 0,
			barCart: 0,
			barCounter: 0
		},
		//The list of rewards. Every reward has a name, which serves as the text, and a value, which is used to align it
		rewards : [],
		current_reward: {},
		remaining : 0,
		unlocked: 0,
		fans: 11417,
		width: 1000
	};

	//--------------------------------------------------------------
	//METHODS
	//*Private*//
	//This will receive the data from the server. This is the official campaign values
	var getServerData = function (){
		var urlString = "api/campaign-bar/" + $routeParams.campaign_id;
		return $http({
			method: "GET",
			url: urlString
		}).success(function(data){
			//Set the appropriate data
			BarFactory.actual.campaignTotal = data.total;
			BarFactory.actual.campaignPaid = data.paid;
			//Scale the value to fit within 0 to 100 for the progress bar visual
			BarFactory.visual.barPaid = scaleData(data.paid, data.total, BarFactory.visual.barTotal);
			BarFactory.rewards = data.rewards;
			//Update the positions based on width-Assumes 1000px width initially. The width updated by the barDirective when it changes
			BarFactory.calculateRewardPositions(BarFactory.width);
			//Update the in-cart bar to show the current's carts contents
			getCartData();
		});
	};
	//takes in a value and a maximum and then scales it relative to the scale factory
	var scaleData = function(value, max, scale){
		return value/max * scale;
	}

	//When loaded, check the cart for campaign items
	var getCartData = function(){
		BarFactory.changeValue(CartFactory.computeCampaignTotal($routeParams.campaign_id));
	}

	//Listens for when the cart is updated. Then get the new value of all the items from the campaign in the cart
	var cartListener = $rootScope.$on('cart:contentsChanged', function(){
		BarFactory.changeValue(CartFactory.computeCampaignTotal($routeParams.campaign_id));
	});

	//Listens for when checkout is completed then gets the campaign items from the cart then adds up the new campaign total.
	var checkoutListener = $rootScope.$on('checkout:successful', function(){
		BarFactory.checkout();	
	});

	//*Public*//
	//Load the data from the cart & from the server, then update the rewards progress. It returns the getServerData because it is an asynchronous test.
	//This should really be using $q. That will be added.
	//*Data & Value*//
	BarFactory.getData = function(){
		return getServerData();
	};
	//Changes the value of the cart bar. Updates counter position accordingly
	BarFactory.changeValue = function(value){
		BarFactory.visual.barCart = scaleData(value, BarFactory.actual.campaignTotal, BarFactory.visual.barTotal);
		BarFactory.actual.campaignCart = value;
		BarFactory.updateCounterPosition(BarFactory.width);
	};
	//This will update the rewards progress which will change which rewards are visible. This is called on checkout so that rewardss are only shown when paid
	BarFactory.updateRewardsProgress = function(){
		for(var x = 0; x < BarFactory.rewards.length; x++){
			//If has a higher amount than has been raised
			if (BarFactory.rewards[x].unlock_amount > BarFactory.actual.campaignPaid){
				//If not the first one
				if (x > 0){
					//If the previous one is unlocked then this one is the current reward
					if (BarFactory.rewards[x-1].progress === 'unlocked'){
						BarFactory.unlocked = x;
						BarFactory.rewards[x].progress = 'current';
						BarFactory.current_reward = BarFactory.rewards[x];
						BarFactory.remaining = BarFactory.current_reward.unlock_amount - BarFactory.actual.campaignPaid;
					} else {
						BarFactory.rewards[x].progress = 'locked';
					}
				//If the first one
				} else {
					BarFactory.rewards[x].progress = 'current';
					BarFactory.unlocked = x;
					BarFactory.current_reward = BarFactory.rewards[x];
					BarFactory.remaining = BarFactory.current_reward.unlock_amount - BarFactory.actual.campaignPaid;

				}
			//If has a lower or equal amount than what has been raised
			} else if (BarFactory.rewards[x].unlock_amount <= BarFactory.actual.campaignPaid){
				BarFactory.rewards[x].progress = 'unlocked';
			}
		}
	}

	//*Positioning*//
	//This function calculates where the rewards should be positioned along the bar given the submitted width
	//It adds another value to the reward object, unlock_value, which is used for the css
	BarFactory.calculateRewardPositions = function(width){
		for (var i = 0; i < BarFactory.rewards.length; i++){
			BarFactory.rewards[i]['unlock_value'] = BarFactory.rewards[i]['unlock_amount']/BarFactory.actual.campaignTotal * width + 'px';
		}
		BarFactory.width = width;
	};
	//This function calculates where the counter bubble should be position along the bar. The number at the end is the width of the bubble/2 in order to center it
	//This just looks for where along the bar the two bars together are and then calculates that coordinate. 
	BarFactory.updateCounterPosition = function(width){
		BarFactory.visual.barCounter = scaleData(BarFactory.actual.campaignPaid + BarFactory.actual.campaignCart, BarFactory.actual.campaignTotal, BarFactory.visual.barTotal) * (width/BarFactory.visual.barTotal) - (200/2) + 'px';
	}
	//This simulates what the checkout process will be like. When the user checks out,
	//the paid amount will be updated and the cart will decrease to zero.
	//Currently the visual is decreased to by .99999 instead of to zero, because if
	//changed to zero the progress bar animation doesn't work
	BarFactory.checkout = function(){
		BarFactory.visual.barPaid += BarFactory.visual.barCart;
		BarFactory.visual.barCart += -(BarFactory.visual.barCart * .99999);
		BarFactory.actual.campaignPaid += BarFactory.actual.campaignCart;
		BarFactory.actual.campaignCart = 0;
		BarFactory.fans++;
		BarFactory.updateRewardsProgress();
		//For testing purposes this does not push to the server. 
	}
	return BarFactory;
}]);
/*! odometer 0.4.6 */
(function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G=[].slice;q='<span class="odometer-value"></span>',n='<span class="odometer-ribbon"><span class="odometer-ribbon-inner">'+q+"</span></span>",d='<span class="odometer-digit"><span class="odometer-digit-spacer">8</span><span class="odometer-digit-inner">'+n+"</span></span>",g='<span class="odometer-formatting-mark"></span>',c="(,ddd).dd",h=/^\(?([^)]*)\)?(?:(.)(d+))?$/,i=30,f=2e3,a=20,j=2,e=.5,k=1e3/i,b=1e3/a,o="transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",y=document.createElement("div").style,p=null!=y.transition||null!=y.webkitTransition||null!=y.mozTransition||null!=y.oTransition,w=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,l=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver,s=function(a){var b;return b=document.createElement("div"),b.innerHTML=a,b.children[0]},v=function(a,b){return a.className=a.className.replace(new RegExp("(^| )"+b.split(" ").join("|")+"( |$)","gi")," ")},r=function(a,b){return v(a,b),a.className+=" "+b},z=function(a,b){var c;return null!=document.createEvent?(c=document.createEvent("HTMLEvents"),c.initEvent(b,!0,!0),a.dispatchEvent(c)):void 0},u=function(){var a,b;return null!=(a=null!=(b=window.performance)?"function"==typeof b.now?b.now():void 0:void 0)?a:+new Date},x=function(a,b){return null==b&&(b=0),b?(a*=Math.pow(10,b),a+=.5,a=Math.floor(a),a/=Math.pow(10,b)):Math.round(a)},A=function(a){return 0>a?Math.ceil(a):Math.floor(a)},t=function(a){return a-x(a)},C=!1,(B=function(){var a,b,c,d,e;if(!C&&null!=window.jQuery){for(C=!0,d=["html","text"],e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(function(a){var b;return b=window.jQuery.fn[a],window.jQuery.fn[a]=function(a){var c;return null==a||null==(null!=(c=this[0])?c.odometer:void 0)?b.apply(this,arguments):this[0].odometer.update(a)}}(a));return e}})(),setTimeout(B,0),m=function(){function a(b){var c,d,e,g,h,i,l,m,n,o,p=this;if(this.options=b,this.el=this.options.el,null!=this.el.odometer)return this.el.odometer;this.el.odometer=this,m=a.options;for(d in m)g=m[d],null==this.options[d]&&(this.options[d]=g);null==(h=this.options).duration&&(h.duration=f),this.MAX_VALUES=this.options.duration/k/j|0,this.resetFormat(),this.value=this.cleanValue(null!=(n=this.options.value)?n:""),this.renderInside(),this.render();try{for(o=["innerHTML","innerText","textContent"],i=0,l=o.length;l>i;i++)e=o[i],null!=this.el[e]&&!function(a){return Object.defineProperty(p.el,a,{get:function(){var b;return"innerHTML"===a?p.inside.outerHTML:null!=(b=p.inside.innerText)?b:p.inside.textContent},set:function(a){return p.update(a)}})}(e)}catch(q){c=q,this.watchForMutations()}}return a.prototype.renderInside=function(){return this.inside=document.createElement("div"),this.inside.className="odometer-inside",this.el.innerHTML="",this.el.appendChild(this.inside)},a.prototype.watchForMutations=function(){var a,b=this;if(null!=l)try{return null==this.observer&&(this.observer=new l(function(){var a;return a=b.el.innerText,b.renderInside(),b.render(b.value),b.update(a)})),this.watchMutations=!0,this.startWatchingMutations()}catch(c){a=c}},a.prototype.startWatchingMutations=function(){return this.watchMutations?this.observer.observe(this.el,{childList:!0}):void 0},a.prototype.stopWatchingMutations=function(){var a;return null!=(a=this.observer)?a.disconnect():void 0},a.prototype.cleanValue=function(a){var b;return"string"==typeof a&&(a=a.replace(null!=(b=this.format.radix)?b:".","<radix>"),a=a.replace(/[.,]/g,""),a=a.replace("<radix>","."),a=parseFloat(a,10)||0),x(a,this.format.precision)},a.prototype.bindTransitionEnd=function(){var a,b,c,d,e,f,g=this;if(!this.transitionEndBound){for(this.transitionEndBound=!0,b=!1,e=o.split(" "),f=[],c=0,d=e.length;d>c;c++)a=e[c],f.push(this.el.addEventListener(a,function(){return b?!0:(b=!0,setTimeout(function(){return g.render(),b=!1,z(g.el,"odometerdone")},0),!0)},!1));return f}},a.prototype.resetFormat=function(){var a,b,d,e,f,g,i,j;if(a=null!=(i=this.options.format)?i:c,a||(a="d"),d=h.exec(a),!d)throw new Error("Odometer: Unparsable digit format");return j=d.slice(1,4),g=j[0],f=j[1],b=j[2],e=(null!=b?b.length:void 0)||0,this.format={repeating:g,radix:f,precision:e}},a.prototype.render=function(a){var b,c,d,e,f,g,h,i,j,k,l,m;for(null==a&&(a=this.value),this.stopWatchingMutations(),this.resetFormat(),this.inside.innerHTML="",g=this.options.theme,b=this.el.className.split(" "),f=[],i=0,k=b.length;k>i;i++)c=b[i],c.length&&((e=/^odometer-theme-(.+)$/.exec(c))?g=e[1]:/^odometer(-|$)/.test(c)||f.push(c));for(f.push("odometer"),p||f.push("odometer-no-transitions"),f.push(g?"odometer-theme-"+g:"odometer-auto-theme"),this.el.className=f.join(" "),this.ribbons={},this.digits=[],h=!this.format.precision||!t(a)||!1,m=a.toString().split("").reverse(),j=0,l=m.length;l>j;j++)d=m[j],"."===d&&(h=!0),this.addDigit(d,h);return this.startWatchingMutations()},a.prototype.update=function(a){var b,c=this;return a=this.cleanValue(a),(b=a-this.value)?(v(this.el,"odometer-animating-up odometer-animating-down odometer-animating"),b>0?r(this.el,"odometer-animating-up"):r(this.el,"odometer-animating-down"),this.stopWatchingMutations(),this.animate(a),this.startWatchingMutations(),setTimeout(function(){return c.el.offsetHeight,r(c.el,"odometer-animating")},0),this.value=a):void 0},a.prototype.renderDigit=function(){return s(d)},a.prototype.insertDigit=function(a,b){return null!=b?this.inside.insertBefore(a,b):this.inside.children.length?this.inside.insertBefore(a,this.inside.children[0]):this.inside.appendChild(a)},a.prototype.addSpacer=function(a,b,c){var d;return d=s(g),d.innerHTML=a,c&&r(d,c),this.insertDigit(d,b)},a.prototype.addDigit=function(a,b){var c,d,e,f;if(null==b&&(b=!0),"-"===a)return this.addSpacer(a,null,"odometer-negation-mark");if("."===a)return this.addSpacer(null!=(f=this.format.radix)?f:".",null,"odometer-radix-mark");if(b)for(e=!1;;){if(!this.format.repeating.length){if(e)throw new Error("Bad odometer format without digits");this.resetFormat(),e=!0}if(c=this.format.repeating[this.format.repeating.length-1],this.format.repeating=this.format.repeating.substring(0,this.format.repeating.length-1),"d"===c)break;this.addSpacer(c)}return d=this.renderDigit(),d.querySelector(".odometer-value").innerHTML=a,this.digits.push(d),this.insertDigit(d)},a.prototype.animate=function(a){return p&&"count"!==this.options.animation?this.animateSlide(a):this.animateCount(a)},a.prototype.animateCount=function(a){var c,d,e,f,g,h=this;if(d=+a-this.value)return f=e=u(),c=this.value,(g=function(){var i,j,k;return u()-f>h.options.duration?(h.value=a,h.render(),void z(h.el,"odometerdone")):(i=u()-e,i>b&&(e=u(),k=i/h.options.duration,j=d*k,c+=j,h.render(Math.round(c))),null!=w?w(g):setTimeout(g,b))})()},a.prototype.getDigitCount=function(){var a,b,c,d,e,f;for(d=1<=arguments.length?G.call(arguments,0):[],a=e=0,f=d.length;f>e;a=++e)c=d[a],d[a]=Math.abs(c);return b=Math.max.apply(Math,d),Math.ceil(Math.log(b+1)/Math.log(10))},a.prototype.getFractionalDigitCount=function(){var a,b,c,d,e,f,g;for(e=1<=arguments.length?G.call(arguments,0):[],b=/^\-?\d*\.(\d*?)0*$/,a=f=0,g=e.length;g>f;a=++f)d=e[a],e[a]=d.toString(),c=b.exec(e[a]),e[a]=null==c?0:c[1].length;return Math.max.apply(Math,e)},a.prototype.resetDigits=function(){return this.digits=[],this.ribbons=[],this.inside.innerHTML="",this.resetFormat()},a.prototype.animateSlide=function(a){var b,c,d,f,g,h,i,j,k,l,m,n,o,p,q,s,t,u,v,w,x,y,z,B,C,D,E;if(s=this.value,j=this.getFractionalDigitCount(s,a),j&&(a*=Math.pow(10,j),s*=Math.pow(10,j)),d=a-s){for(this.bindTransitionEnd(),f=this.getDigitCount(s,a),g=[],b=0,m=v=0;f>=0?f>v:v>f;m=f>=0?++v:--v){if(t=A(s/Math.pow(10,f-m-1)),i=A(a/Math.pow(10,f-m-1)),h=i-t,Math.abs(h)>this.MAX_VALUES){for(l=[],n=h/(this.MAX_VALUES+this.MAX_VALUES*b*e),c=t;h>0&&i>c||0>h&&c>i;)l.push(Math.round(c)),c+=n;l[l.length-1]!==i&&l.push(i),b++}else l=function(){E=[];for(var a=t;i>=t?i>=a:a>=i;i>=t?a++:a--)E.push(a);return E}.apply(this);for(m=w=0,y=l.length;y>w;m=++w)k=l[m],l[m]=Math.abs(k%10);g.push(l)}for(this.resetDigits(),D=g.reverse(),m=x=0,z=D.length;z>x;m=++x)for(l=D[m],this.digits[m]||this.addDigit(" ",m>=j),null==(u=this.ribbons)[m]&&(u[m]=this.digits[m].querySelector(".odometer-ribbon-inner")),this.ribbons[m].innerHTML="",0>d&&(l=l.reverse()),o=C=0,B=l.length;B>C;o=++C)k=l[o],q=document.createElement("div"),q.className="odometer-value",q.innerHTML=k,this.ribbons[m].appendChild(q),o===l.length-1&&r(q,"odometer-last-value"),0===o&&r(q,"odometer-first-value");return 0>t&&this.addDigit("-"),p=this.inside.querySelector(".odometer-radix-mark"),null!=p&&p.parent.removeChild(p),j?this.addSpacer(this.format.radix,this.digits[j-1],"odometer-radix-mark"):void 0}},a}(),m.options=null!=(E=window.odometerOptions)?E:{},setTimeout(function(){var a,b,c,d,e;if(window.odometerOptions){d=window.odometerOptions,e=[];for(a in d)b=d[a],e.push(null!=(c=m.options)[a]?(c=m.options)[a]:c[a]=b);return e}},0),m.init=function(){var a,b,c,d,e,f;if(null!=document.querySelectorAll){for(b=document.querySelectorAll(m.options.selector||".odometer"),f=[],c=0,d=b.length;d>c;c++)a=b[c],f.push(a.odometer=new m({el:a,value:null!=(e=a.innerText)?e:a.textContent}));return f}},null!=(null!=(F=document.documentElement)?F.doScroll:void 0)&&null!=document.createEventObject?(D=document.onreadystatechange,document.onreadystatechange=function(){return"complete"===document.readyState&&m.options.auto!==!1&&m.init(),null!=D?D.apply(this,arguments):void 0}):document.addEventListener("DOMContentLoaded",function(){return m.options.auto!==!1?m.init():void 0},!1),"function"==typeof define&&define.amd?define(["jquery"],function(){return m}):typeof exports===!1?module.exports=m:window.Odometer=m}).call(this);
/*Odometer Directive
This Directive works for the odometer element in the progress bar. Will allow it to be updated off the scope!
Which is badass
*/

angular.module('OdometerDRCT', []).directive('odometerDirective', function(){
 return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      
      //Creates new instance of odometer for the element
    	new Odometer({el: element[0], value: scope[attrs.odometer]});
    	
    	//Watch for changes and update the element value (causing odometer to redraw)
    	scope.$watch(attrs.odometer, function(val) {
    		element.text(val);
      });
    }
  };
});
/*
Store Controller
Written by: Spencer Brown, copyright 2014

//Description
This controller communicates between the store directive and the store factory (model).
It bascially functions as a getter and then holds the store contents

//Components
	-Load model

//Map
	-Used by:
		-StoreDirective
	-Contains:
		-StoreFactory
*/

angular.module('StoreCTRL', ['StoreFCTR']).controller('StoreController', ['$routeParams', '$rootScope', '$scope',  'StoreFactory', function($routeParams, $rootScope, $scope, StoreFactory){
	//Model connection
	//Refence to the watch variable
	this.inventory = StoreFactory.incentives;
	//This will have to change eventually, but for now it works. Need to figure out how to bind w/o scope
	this.model = StoreFactory;

	//Reload the inventory
	this.loadInventory = function(){
		StoreFactory.getIncentives();
	};

	//Add item to cart
	this.addItem = function(item){
		//This will emit an event that will be caught by the cart
		//Rootscope allows communication across different scope hierarchies
		// $('html,body').animate({
		// 	scrollTop: $('#reward_bar_div').offset().top - 50
		// }, 600);
		//If it is called from the details box
		if (item === "getCurrent"){
			item = StoreFactory.getCurrent();
			StoreFactory.cart_btn_text = "Item Added!";
			setTimeout(function(){
				StoreFactory.cart_btn_text = "Add to Cart";
				$scope.$apply();
			}, 3000);
		}
		$rootScope.$emit('store:addItem', item);

	};

	//Set the selected item
	this.setCurrent = function(index){
		StoreFactory.setCurrent(index);
		this.model.added_display = false;
	}

	StoreFactory.getIncentives().then(function(){
			this.inventory = StoreFactory.incentives;
	}.bind(this));

}]);

/*
Store Directive
Written by: Spencer Brown, copyright 2014

//Description
This hold the information about the incentives.
It is populated by the store factory. There will be DOM manipulation! whooop

//Components
	-Different divs (buttons?) for each store item.
	-An area for description of the items

//Controller: StoreController

//Map
	-Usedby:
		-campaignTemplate.html
	-Contains:
		-StoreController
*/

angular.module('StoreDRCT', ['StoreCTRL']).directive('fnStore', function(){
	return {
		restrict: 'E',
		replace: true,
		transclude: false,
		templateUrl: 'modules/campaign/store/storeTemplate.html',
		controllerAs: 'store',
		controller: 'StoreController'
	};
});
/*
Story Factory
Written by: Spencer Brown, copywrite 2014

//Description
This factory holds the model for the store.
Basically just loads all the campaign store data from the server.
This is a factory, because there will only exist one for all the stores.
Each time a new campaign page is loaded, the store will make a new call to get the items for that store.

//Components
	-Store Factory object (model): Houses the store model.
	-Functions
		-Get

//Map
	-Used by: 
		-StoreController - Populates the store directive
	-Contains:
		-CartController: Needs this so that it can add items to the cart
*/

angular.module('StoreFCTR', []).factory('StoreFactory', ['$routeParams', '$http', function($routeParams, $http){
	var StoreFactory = {
		incentives:{}, 
		current_highlight: {},
		current_set : false,
		cart_btn_text : "Add to Cart"
	};

	StoreFactory.getIncentives = function(){
		var urlString = "api/campaign-store/" + $routeParams.campaign_id;
		return $http({
			method: "GET",
			url: urlString
		}).success(function(data){
			StoreFactory.incentives = data.incentives;
			StoreFactory.current_set = false;
			StoreFactory.current_highlight = {};
		});
	};

	StoreFactory.setCurrent = function(index){
		if (StoreFactory.current_set == false){
			StoreFactory.current_set = true;
		}

		StoreFactory.current_highlight = StoreFactory.incentives[index];
	};

	StoreFactory.getCurrent = function(){
		if (StoreFactory.current_set == false){
			return false;
		}
		return StoreFactory.current_highlight;
	};

	return StoreFactory;
}]);

/*
Tab Directive
Written by: Spencer Brown, copyright 2014

//Description
This displays the tabs and their contents.

//Components
	-Social
		-Producer
		-Fans
		-Updates

//Controller: CampaignController

//Map
	-Usedby:
		-campaignTemplate.html
	-Contains:
		-CampaignController instance
*/

angular.module('TabsDRCT', ['CampaignCTRL']).directive('fnTabs', function(){
	return {
		restrict: 'E',
		replace: true,
		transclude: false,
		templateUrl: 'modules/campaign/tabs/tabsTemplate.html',
		controllerAs: 'campaign',
		controller: 'CampaignController',
		link: function(scope, element, attrs, cont){
		}
	}
});
/*
Video Directive
Written by: Spencer Brown, copyright 2014

//Description
This displays the video
It is populated by the campaign factory

//Components
	-Video
	-Poster for video

//Controller: CampaignController

//Map
	-Usedby:
		-campaignTemplate.html
	-Contains:
		-CampaignController instance
*/

angular.module('VideoDRCT', ['CampaignCTRL']).directive('fnVideo', function(){
	return {
		restrict: 'E',
		replace: true,
		transclude: false,
		templateUrl: 'modules/campaign/video/videoTemplate.html',
		controllerAs: 'campaign',
		controller: 'CampaignController',
		link: function(scope, element, attrs, cont){

			// /* Use Youtube IFrame API to control video*/
			// //Code based on: https://developers.google.com/youtube/iframe_api_reference#
			
			// //This code loads the IFrame Player API code asynchronously.
		     var tag = document.createElement('script');
		     tag.src = "https://www.youtube.com/iframe_api";
		     var firstScriptTag = document.getElementsByTagName('script')[0];
		     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		     // 3. This function creates an <iframe> (and YouTube player)
		     //    after the API code downloads.
		     var player;
		     window.onYouTubeIframeAPIReady = function() {
		         player = new YT.Player('video_player', {
		         	events: {
		         		'onStateChange': onPlayerStateChange
		           	}
		         });
		     }

		     onPlayerStateChange = function(event){
		     	if (event.data == YT.PlayerState.ENDED){
		     		console.log('ended');
		     		$('.video_poster').fadeIn();
		    	}
		     }

		     $('#video_overlay').click(function(){
		     	$('.video_poster').fadeOut();
		     	player.playVideo();
		     });
		}
	}
});
/*
Cart Controller

//Description:
Communcates between the cart model (CartFactory) and the cartDirective.

//Components:
	Functions:
		-No idea

//Map
Used by:
	-CartDirective: communicates with the cartFactory
Contains:
	-CartFactory: Manages the contents of the cart
*/

angular.module('CartCTRL', ['CartFCTR', 'CheckoutFCTR']).controller('CartController', ['$scope', '$rootScope', 'CartFactory', 'CheckoutFactory', function($scope, $rootScope, CartFactory, CheckoutFactory){
	//Model
	var storeListen = true;
	this.model = CartFactory;
	this.checkout = CheckoutFactory;

	//Methods
	//Remove an item from the cart 
	this.removeItem = function(item){
		CartFactory.removeItem(item);
	}
	//Open the checkout window and close the cart. 
	this.openCheckout = function(){
		//CheckoutFactory.checkout();
		CartFactory.hide();
	}
	//Close the div
	this.closeCart = function(){
		CartFactory.hide();
	}
	//Set the cart to not listen
	$scope.setListen = function(value){
		storeListen = value;
	}
	// //Gets the total value of the amount in the cart from a particular campaign
	// this.getItemsTotal = function(campaign_id){
	// 	return cart.getItemsTotal(campaign_id);
	// }

	//Listeners
	//This listens for an event from the stores that contains the item to be added to the cart
	//Adds the item to the cart
	var storeListener = $rootScope.$on('store:addItem', function(event, item){
		if (storeListen){
			CartFactory.addItem(item);
		}
	});

	//This resets the cart on a successful checkout
	var successListener = $rootScope.$on('checkout:successful', function(){
		CartFactory.checkout();
	});

	//This hides the cart on a failed checkout
	var failureListener = $rootScope.$on('checkout:failed', function(){
		CartFactory.isVisible = false;
	});

	//Destroys listener when this controller is destroyed
	$scope.$on('$destroy', storeListener);
	$scope.$on('$destroy', successListener);
	$scope.$on('$destroy', failureListener);
}]);

/*
Cart Directive
Written by: Spencer Brown, copyright 2014

//Description
This directive holds the cart directive.
The cart directive shows the user the items in their cart. Also triggers checkout.
Since it is connected to the nav, it is asethectically persistent.

//Components
	-Cart Items:
		-Each item contains quantity, ind. price, total price, campaign, property, & rm button
	-Cart Details:
		-Tally of the total number of items in the cart
		-Tally of total price
	-Checkout Button:
		-Triggers the checkout pop-up

//Map
	-Used by:
		-NavTemplate: **Basically by NavDirective**
	-Contains:
		-CartController: Talks to cart model
*/

angular.module('CartDRCT', ['CartCTRL']).directive('fnCart', function(){
	return {
		restrict: 'E',
		replace: true, //Fully replaces the fn-nav element
		transclude: false, //Currently set to false, can't forsee any reason that would change
		templateUrl: 'modules/cart/cartTemplate.html', //Loads the html template
		controllerAs:'cart', //Refer to the controller as 'cart' so cart.foo
		controller: 'CartController', //This controller comes from the 'CartCTRL' module that is injected
		//No DOM manipulation yet. If needed, uncomment below
		link: function(scope, elem, attrs, controller) {
			$(document).on('click', function(event) {
				if (!$(event.target).closest('#cart_div').length && !$(event.target).closest('#cart_tab').length ) {
					controller.closeCart();
					scope.$apply();
				}
			});
		}
	};
});
/*
Cart Factory
Written by: Spencer Brown, copyright 2014

//Description
This factory will hold the contents of the cart.
It is different than the other factories because it will be referenced by two modules (campaign.ShopController & 
cartController[which will be inside CartDirective which is part of NavDirective]). 
This cart will have to manage all the different campaign shops. 
There are multiple campaign shops (may change this) so that the progress bars are kept correctly updated.

//Components
	-CartFactory object (model)
		-this will keep a list of all the items in the cart
	-Functions
		-delete item from cart
		-add item to cart
		-update quantity
		-[eventually] retrieve the user's saved cart

	-Each item consists of:
		-price
		-level 
		-contains
		-project
		-campaign ID
		-item ID
		-description

//Map
	-Usedby:
		-CartController: as the model
	-Contains:
		-none
*/

angular.module('CartFCTR', []).factory('CartFactory',['$rootScope', function($rootScope){
	
	//Create the cart object, this will serve as the model and hold all the cart data
	var CartFactory = {
		totalQuantity: 0,
		totalPrice: 0,
		isEmpty: true,
		isVisible: false,
		contents: []
	};

	/*Add an item to the cart
	The item is a json string containing all the necessary package info*/
	CartFactory.addItem = function(item){
		var id = item._id; //id unique to the package
		var cartItem = {}; //make a variable to hold the new item
		var found = false; // used for search

		//Look through all the cart contents
		for (var x = 0; x < CartFactory.contents.length; x++){
			//If an object is found with a matching id, edit that object to increase quantity and price
			if (CartFactory.contents[x].info._id === id){
				CartFactory.contents[x].quantity += 1;
				CartFactory.contents[x].totalPrice += item.price;
				found = true;
				break;
			}
		}
		//if an object is not found with a matching id, create a new object
		if (!found){
			cartItem['id'] = id;
			cartItem['info'] = item;
			cartItem['quantity'] = 1;
			cartItem['totalPrice'] = item['price'];
			//Add object to cart
			CartFactory.contents.push(cartItem);
		}
		//update cart details
		CartFactory.totalPrice += item['price'];
		CartFactory.totalQuantity++;

		//determine status of cart
		if (CartFactory.contents.length > 0){
			CartFactory.isEmpty = false;
		} else {
			CartFactory.isEmpty = true;
		}
		//Alerts the progress bar factories that the carts contents have changed
		$rootScope.$emit('cart:contentsChanged');
	};

	/*Remove an item from the cart
	The item is a json string containing all the necessary package info*/
	CartFactory.removeItem = function(item){
		var id = item.info.item_id; //id unique to the package
		var price = item.info,price; //get the items price
		var found = false; // used for search

		//Search the cart for the item
		for (var x = 0; x < CartFactory.contents.length; x++){
			//If found reduce quantity by 1
			if (CartFactory.contents[x].info.item_id === id){
				CartFactory.contents[x].quantity = CartFactory.contents[x].quantity - 1;
				CartFactory.contents[x].totalPrice = CartFactory.contents[x].totalPrice - CartFactory.contents[x].info.price;
				
				//if quantity is <= 0, then remove it from the array
				if (CartFactory.contents[x].quantity <= 0){
					CartFactory.contents.splice(x,1);
				}
				found = true;
			}
			//if not found, then you shouldn't be able to remove in the first place...
			if (!found){
				//alert(error)
			}
		}

		//Update all the cart info
		CartFactory.totalPrice = CartFactory.totalPrice - item.info.price;
		CartFactory.totalQuantity--;

		//Determine cart status
		if (CartFactory.contents.length > 0){
			CartFactory.isEmpty = false;
		} else {
			CartFactory.isEmpty = true;
		}
		//Alerts the progress bar factories that the carts contents have changed
		$rootScope.$emit('cart:contentsChanged');
	};

	/*Called by progress bar factory to determine current amount in the cart.
	This is used to determine the positioning & values of the progress bar.
	The id is the campaign id.*/
	CartFactory.computeCampaignTotal = function(id){
		var campaignTotal = 0;

		for (var x = 0; x < CartFactory.contents.length; x++){
			if (CartFactory.contents[x].info.campaign_id === id){
				campaignTotal += CartFactory.contents[x].info.price * CartFactory.contents[x].quantity;
			}
		}
		return campaignTotal;
	};

	/*This clears the factory after a checkout*/
	CartFactory.checkout = function(){
		CartFactory.totalQuantity = 0;
		CartFactory.totalPrice = 0;
		CartFactory.isEmpty = true;
		CartFactory.isVisible = false;
		CartFactory.contents = [];
	};

	CartFactory.hide = function(){
		CartFactory.isVisible = false;
	};

	//Return CartFactory object
	return CartFactory;
}]);
          /*
Checkout Controller

//Description:
Communcates between the checkoutt model (CheckoutFactory) and the checkoutDirective.

//Components:

//Map
Used by:
	-CheckoutDirective: communicates with the checkoutFactory
Contains:
	-CheckoutFactory: Manages the contents of the checkout
*/

angular.module('CheckoutCTRL', ['CheckoutFCTR', 'CartFCTR', 'AuthFCTR']).controller('CheckoutController', ['$scope', '$rootScope', 'CheckoutFactory', 'CartFactory', 'AuthFactory', function($scope, $rootScope, CheckoutFactory, CartFactory, AuthFactory){
	//Model
	this.model = CheckoutFactory;
	this.cart = CartFactory;
	this.auth = AuthFactory;
	$scope.email = "";

	//Methods
	//Checkout
	this.completeCheckout = function(){
		CheckoutFactory.checkout(CartFactory.contents);
	};
	//Close checkout
	this.closeCheckout = function(){
		this.completeCheckout();
		CheckoutFactory.hide();
	};
	//Open checkout
	this.openCheckout = function(){
		//So that when close checkout fires, it allows it to go through
		CheckoutFactory.canCheckout = true;
		CheckoutFactory.show();
	};
	//Add an email to the mailing list
	this.addEmail = function(){
		console.log($scope.email);
		var formData = {
			email 		: $scope.email,
			password 	: "test",
			fullname 	: "user"
		};
		AuthFactory.register(formData);
		$scope.email = "";
	};
}]);

/*
Checkout Directive
Written by: Spencer Brown, copyright 2014

//Description
This directive holds the checkout directive.
The checkout directive is loaded from the cart template.
This pushes items to the user's cart

//Components
	-Form inputs
	-Complete Button:
		-Triggers the checkout pop-up

//Map
	-Used by:
		-CartTemplate: **Basically by CartDirective**
	-Contains:
		-CheckoutController: Talks to checkout model
*/


angular.module('CheckoutDRCT', ['CheckoutCTRL']).directive('fnCheckout', function(){
	return {
		restrict: 'E',
		replace: true, //Fully replaces the fn-checkout element
		transclude: false, //Currently set to false, can't forsee any reason that would change
		templateUrl: 'modules/cart/checkout/checkoutTemplate.html', //Loads the html template
		controllerAs:'checkout', //Refer to the controller as 'checkout' so checkout.foo
		controller: 'CheckoutController', //This controller comes from the 'CheckoutCTRL' module that is injected
		//No DOM manipulation yet. If needed, uncomment below
		link: function(scope, elem, attrs, controller) {
			$(document).on('scroll', function(event) {
				var scrolled = $(window).scrollTop();
				$("#checkout_bg").css({'top': scrolled});
			});
			$(document).on('click', function(event) {
				if (!$(event.target).closest('#checkout_form').length) {
					controller.closeCheckout();
					scope.$apply();
				}
			});
			$(document).on('click', function(event) {
				if ($(event.target).closest('button#checkout_button').length) {
					controller.openCheckout();
					scope.$apply();
				}
			});
		}
	};
});
/*
Checkout Factory
Written by: Spencer Brown, copyright 2014

//Description
This factory will manage checkout. When a user selects to checkout, the template will become visible.
When they click the checkout button, the items will be sent to the user's account.

//Components
	-CartFactory object (model)
		-this will keep a list of all the items in the cart
	-Functions
		-delete item from cart
		-add item to cart
		-update quantity
		-[eventually] retrieve the user's saved cart

//Map
	-Usedby:
		-CheckoutController: as the model
	-Contains:
		-none
*/

angular.module('CheckoutFCTR', []).factory('CheckoutFactory', ['$http', '$location', '$rootScope', function($http, $location, $rootScope){

	//Create the checkout object
	var CheckoutFactory = {
		canCheckout : false,
		isVisible : false,
		blockVisible: false,
		cardName: "",
		cardNumber: "",
		cardCVC: "",
		cardExpire: ""
	};

	//Methods

	//Adds cart data to user account
	CheckoutFactory.checkout = function(contents){
		// return $http({
		// 	method: "PUT",
		// 	url: "api/user-items",
		// 	data: contents
		// }).success(function(){
		// 	CheckoutFactory.isVisible = false;
		// 	$rootScope.$emit('checkout:successful', contents);
		// }).error(function(){
		// 	CheckoutFactory.isVisible = false;
		// 	CheckoutFactory.blockVisible = false;
		// 	$rootScope.$emit('checkout:failed');
		// 	$location.url('/login');
		// });
		if (CheckoutFactory.canCheckout){
			$rootScope.$emit('checkout:successful', contents);
			CheckoutFactory.canCheckout = false;
		}
		// CheckoutFactory.isVisible = true;
	};
	//Hides the checkout
	CheckoutFactory.hide = function(){
		CheckoutFactory.isVisible = false;
	};

	//Shows the checkout
	CheckoutFactory.show = function(){
		CheckoutFactory.isVisible = true;
	};

	//Return CheckoutFactory object
	return CheckoutFactory;
}]);
/*
NGRepeat Watcher Directive
Written by: Spencer Brown, copyright 2014

//Description:
This directive watches an ng-repeat element and fires an event when it finishes loading. This is necessary to
know in order to perform DOM manipulation on the elements of the ng-repeat

//Components:
	-emits an event when the ngrepeat load is completed

//Map:
	-Usedby:
		-barTemplate.html
	-Listened for by:
		-barDirective.js
	-contains:
		-none
*/

angular.module('RepeatDRCT', []).directive('fnRepeatCompletionWatcher', function(){
	return{
		restrict: 'A',
		replace: false,
		transclude: false,
		link: function(scope, element, attrs){
			//If the last element in the ng-repeat, emit an event
			if (scope.$last){
				var eventName = attrs.fnContext + "RepeatLoaded";
				scope.$emit(eventName);
			}
		}
	}
});

/*
Homepage Controller
Written by: Spencer Brown, copyright 2015

//Description
This controller manages the homepage and connects to the campaign meta factory

//Components
	-References to:
		-campaignMetaFactory

//Map
	-Used by:
		-App Routing
	-Contains:
		-none
*/

angular.module('HomePageCTRL', ['MetaFCTR']).controller('HomepageController', [ 'CampaignsMetaFactory', function(MetaFactory){
	//Model connection
	this.model = MetaFactory;
}]);
/*
Campaigns Meta Factory
Written by: Spencer Brown, copyright 2014

//Description
This factory serves as the model for the nav bar. It will make a call
to the server to retrieve all necessary information about all existing campaigns.
Currently (V2) it will mostly retrieve campaign name and campaign link.

//Components
	-CampaignsMeta object (model)
		-Will contain a list of all the campaigns and their details
		-Will be returned by the factory
	-Functions
		-getAllCampaigns: Calls the API to get the campaign meta
		...Add more here if necessary...

//Map
Used by:
	-NavController.js
Contains:
	-CampaignsMeta model [All navigation information]
*/

angular.module('MetaFCTR', []).factory('CampaignsMetaFactory', ['$http', function($http){

	//Our model
	var CampaignsMeta = {
		allCampaigns: {}
	};

	//Retrieve all the campaigns
	CampaignsMeta.getAllCampaigns = function(){
		return $http({
			method: 'GET',
			url: 'api/all-campaigns'
		}).success(function(data){
			CampaignsMeta.allCampaigns = data;
			console.log(CampaignsMeta.allCampaigns);
		});
	};

	return CampaignsMeta;
}])
/*
Nav Bar Controller
Written by: Spencer Brown, copyright 2014
--Fun Fact: written while eating a steak in dorm room at UCT in Cape Town--\

//Description
This controller maintains communcation between the ProjectMetaFactory and the
fn-nav directive. Referred to as 'nav' by fn-nav. i.e. {{nav.foo}}

//Components
	Function:
		-loadCampaigns: Calls the CampaignsMetaFactory to retrieve the campaignss

//Map
Used by:
	-navDirective.js
Contains:
	-campaignMetaFactory.js
*/

angular.module('NavCTRL', ['MetaFCTR', 'AuthFCTR']).controller('NavController', ['CampaignsMetaFactory', 'AuthFactory', function(CampaignsMetaFactory, AuthFactory){
	//Set the campaigns variable to the Factory campaign
	this.campaigns = CampaignsMetaFactory.allCampaigns;
	this.auth = AuthFactory;

	//Reload the campaigns from server
	this.loadCampaigns = function(){
		CampaignsMetaFactory.getAllCampaigns();
	};

	//On initialization, load campaigns, binds for <IE9
	CampaignsMetaFactory.
		getAllCampaigns()
		.then(function(){
			this.campaigns = CampaignsMetaFactory.allCampaigns;
		}.bind(this));
}]);
/* 
Nav Bar Directive
Written by: Spencer Brown, copyright 2014

//Description
This directive holds the nav bar directive.
It handles the nav display and interactivity.

//Components
	-Nav Logo: links to homepage & contains logo image
	-Tabs:
		-Browse Campaigns: Contains links to all projects
		-Create Campaign: For creators **NOT IMPLEMENTED**
		-Search Campaigns: Search existing campaigns
		-Cart: Access to cart
		-Login/Register: Links to login page
//Map
Used by:
	-Index.html
Contains:
	-NavigationController: Communications with CampaignsMetaFactory
	-CartDirective: Manages the display of the cart
*/


angular.module('NavDRCT', ['NavCTRL']).directive('fnNav', function(){
	return {
		restrict: 'E',
		replace: true, //Fully replaces the fn-nav element
		transclude: false, //Currently set to false, can't forsee any reason that would change
		templateUrl: 'modules/nav/navTemplate.html', //Loads the html template
		controllerAs:'nav', //Refer to the controller as 'nav' so nav.foo
		controller: 'NavController' //This controller comes from the 'NavCTRL' module that is injected
		//No DOM manipulation yet. If needed, uncomment below
		// link: function($scope, iElm, iAttrs, controller) {
		// }
	};
});
/*
User Factory
Written by: Spencer Brown, copywrite 2014

//Description
This factory holds the model for the user. It makes a call to the server to pull the information.

//Components
	-User object - for info
	-Functions
		-CheckLoggedIn: Checks if the current user is logged in
		-logOut: Logs out the user
		-register

//Map
	-Used by: 
		-UserFormController - Transfers info from the iv
	-Contains:
		-none
*/

angular.module('UserFCTR', []).factory('UserFactory', ['$http', function($http){
	
	var UserFactory = {
		name: "",
		inventory: []
	};

	UserFactory.loadUserData = function(){
		return $http({
			method: 'GET',
			url: 'api/user-data'
		}).success(function(data){
			UserFactory['name'] =  data.details.fullname;
			UserFactory['inventory'] = data.details.items;
		});
	};

	return UserFactory;
}]);
/*
User Page Controller
Written by: Spencer Brown, copyright 2014

//Description
This controller manages the view of the user's page. The user's page lists the fanbases they belong to as well as their purchases. Eventually their badges as well.

//Components
	-getJson
	-postData
	
//Map
	-Used by:
		-LoginTemplate
		-RegistrationTemplate
	-Contains:
		-AuthFactory
*/

angular.module('UserPageCTRL', ['UserFCTR', 'AuthFCTR']).controller('UserPageController', ['$scope', 'UserFactory','AuthFactory', function($scope, UserFactory, AuthFactory){
	this.auth = AuthFactory;
	this.details = UserFactory;
	
	this.loadUserData = function(){
		UserFactory.loadUserData();
	}
	
	this.logout = function(){
		AuthFactory.logOut();
	};

	UserFactory.
		loadUserData().
		then(function(){
			this.user = UserFactory;
		}.bind(this));
}]);
