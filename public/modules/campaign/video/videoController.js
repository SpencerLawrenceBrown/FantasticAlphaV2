/**
* videoCTRL Module
*
* Description
*/
angular.module('VideoCTRL', []).controller('VideoController', [ '$scope', '$sce', function($scope, $sce){
	 $scope.onPlayerReady = function(API) {
                $scope.API = API;
            };

     $scope.config = {
        sources: [
            {src: $sce.trustAsResourceUrl("../../../assets/video/Adventure Time.mp4"), type: "video/mp4"}
            // {src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/videos/videogular.webm"), type: "video/webm"},
            // {src: $sce.trustAsResourceUrl("http://www.videogular.com/assets/videos/videogular.ogg"), type: "video/ogg"}
        ],
        theme: {
            url: "../../../css/video/videogular.css"
        },
        plugins:{
            poster:{
                url: "../../../assets/images/poster.jpg"
            }
        }
    };
}]);
