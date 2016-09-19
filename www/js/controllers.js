angular.module('starter.controllers', ['ngCordova'])

.controller('DashCtrl', function($scope,$cordovaNativeAudio ,$cordovaDeviceMotion, $timeout, $ionicPlatform) {

  $ionicPlatform.ready(function() {

    $cordovaNativeAudio.preloadSimple('Arriba', 'sounds/arriba.mp3')
          .then(function (msg) {

                }, function (error) {

                      alert(error);
                   });

    $cordovaNativeAudio.preloadSimple('Abajo', 'sounds/abajo.mp3')
          .then(function (msg) {

                }, function (error) {

                      alert(error);
                   });

    $cordovaNativeAudio.preloadSimple('Izquierda', 'sounds/izquierda.mp3')
          .then(function (msg) {

                }, function (error) {

                      alert(error);
                   });

    $cordovaNativeAudio.preloadSimple('Derecha', 'sounds/derecha.mp3')
          .then(function (msg) {

                }, function (error) {

                      alert(error);
                   });

    $cordovaNativeAudio.preloadSimple('Boca_Arriba', 'sounds/b_arriba.mp3')
          .then(function (msg) {

                }, function (error) {

                      alert(error);
                   });

    $cordovaNativeAudio.preloadSimple('Boca_Abajo', 'sounds/b_abajo.mp3')
          .then(function (msg) {

                }, function (error) {

                      alert(error);
                   });

    $scope.watch = $cordovaDeviceMotion.watchAcceleration({ frequency: 2000 });

    $scope.watch.then(
      null,
      function(error) {
      // An error occurred
      },
      function(result) {
        $scope.X = result.x;
        $scope.Y = result.y;
        $scope.Z = result.z;
        $scope.timeStamp = result.timestamp;
    });





  

  });//cierre ionicPlatform.ready

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
