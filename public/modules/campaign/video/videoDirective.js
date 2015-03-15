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