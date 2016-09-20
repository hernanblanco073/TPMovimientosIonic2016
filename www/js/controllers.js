angular.module('starter.controllers', ['ngCordova'])

.controller('DashCtrl', function($scope,$cordovaNativeAudio ,$cordovaDeviceMotion, $timeout, $ionicPlatform, $window) {

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

    $scope.flagIzq = 0;
    $scope.flagDer = 0;
    $scope.flagArr = 0;
    $scope.flagAba = 1;
    $scope.flagBArr = 1; 
    $scope.flagBAba = 0;
    $scope.WHeight = $window.innerHeight;
    $scope.WWidth = $window.innerWidth;



    $scope.options = { 
      frequency: 50 // Measure every 100ms
    };

    $scope.movimiento = {
      x : null,
      y : null,
      z : null,
      timestamp : null
    }

    $scope.ImgOptions={
      x:0,
      y:0,
      width:100,
      height:100
    }

    $scope.watch = null;
    $scope.moveSpeed = 1.5;

    $scope.startWatching = function() {   

    $scope.watch = $cordovaDeviceMotion.watchAcceleration($scope.options);

    $scope.watch.then(
      null,
      function(error) {
        alert(error);
      },
      function(result) {

        if(result.x > 1){
              if(result.x > 5){
                $scope.movimiento.x = 3;     
              }
              else if(result.x > 3){


              if($scope.flagIzq == 0)
                {
                  $cordovaNativeAudio.play('Izquierda');
                  $scope.flagDer = 0;
                  $scope.flagIzq = 1;
                  //$scope.flagArr = 0;
                  //$scope.flagAba = 0;
                  //$scope.flagBArr = 0; 
                  //$scope.flagBAba = 0;
                }

                $scope.movimiento.x = 2;
              }else{
                $scope.movimiento.x = 1;
              }
            }else if(result.x < -1){
              if(result.x < -5){ 
                $scope.movimiento.x = -3;
              }
              else if(result.x < -3){

                if($scope.flagDer == 0)
                {
                  $cordovaNativeAudio.play('Derecha');
                  $scope.flagDer = 1;
                  $scope.flagIzq = 0;
                  //$scope.flagArr = 0;
                  //$scope.flagAba = 0;
                  //$scope.flagBArr = 0; 
                  //$scope.flagBAba = 0;
                } 

                $scope.movimiento.x = -2;
              }else{
                $scope.movimiento.x = -1;
              }
            }else{
              $scope.movimiento.x = 0;
            }

            if(result.y > 1){
              if(result.y > 5){
                $scope.movimiento.y = 3;
              }
              else if(result.y > 3){

                  if($scope.flagAba == 0)
                    {
                      $cordovaNativeAudio.play('Abajo');
                      //$scope.flagDer = 0;
                      //$scope.flagIzq = 0;
                      $scope.flagArr = 0;
                      $scope.flagAba = 1;
                      //$scope.flagBArr = 0; 
                      //$scope.flagBAba = 0;
                    }

                $scope.movimiento.y = 2;
              }else{
                $scope.movimiento.y = 1;
              }
            }else if(result.y < -1){
              if(result.y < -5){
                $scope.movimiento.y = -3;
              }
              else if(result.y < -3){

                  if($scope.flagArr == 0)
                    {
                      $cordovaNativeAudio.play('Arriba');
                      //$scope.flagDer = 0;
                      //$scope.flagIzq = 0;
                      $scope.flagArr = 1;
                      $scope.flagAba = 0;
                      //$scope.flagBArr = 0; 
                      //$scope.flagBAba = 0;
                    }
                $scope.movimiento.y = -2;
              }else{
                $scope.movimiento.y = -1;
              }
            }else{
              $scope.movimiento.y = 0;
            }

            if(result.z > 1){

              if($scope.flagBArr == 0)
                    {
                      $cordovaNativeAudio.play('Boca_Arriba');
                      $scope.flagBArr = 1; 
                      $scope.flagBAba = 0;
                    }
              $scope.movimiento.z = 1;
            }else if(result.z < -1){

              if($scope.flagBAba == 0)
                    {
                      $cordovaNativeAudio.play('Boca_Abajo');
                      $scope.flagBArr = 0; 
                      $scope.flagBAba = 1;
                    }
              $scope.movimiento.z = -1;
            }else{
              $scope.movimiento.z = 0;
            }

            $scope.ImgOptions.x += $scope.moveSpeed * $scope.movimiento.y;
            $scope.ImgOptions.y += $scope.moveSpeed * -$scope.movimiento.x;
            if($scope.ImgOptions.x < 0){
              $scope.ImgOptions.x = 0;
            }else if(($scope.ImgOptions.x + $scope.ImgOptions.height) > ($window.innerHeight - 90)){
              $scope.ImgOptions.x = ($window.innerHeight - 90 - $scope.ImgOptions.height);
            }
            if($scope.ImgOptions.y < 0){
              $scope.ImgOptions.y = 0;
            }else if(($scope.ImgOptions.y + $scope.ImgOptions.width) > ($window.innerWidth)){
              $scope.ImgOptions.y = ($window.innerWidth - $scope.ImgOptions.width);
            }

            $scope.movimiento.timestamp = result.timestamp; 
    });

    }


    $scope.stopWatching = function() {  
    $scope.watch.clearWatch();
    }   





  

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
