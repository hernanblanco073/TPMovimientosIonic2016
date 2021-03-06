angular.module('starter.controllers', ['ngCordova'])

.controller('controlMovimiento', function($scope, $ionicPopup , $stateParams, $cordovaDeviceMotion, $cordovaMedia, $timeout, $ionicPlatform, $window) {


  $ionicPlatform.ready(function() {


    $scope.flagIzq = 0;
    $scope.flagDer = 0;
    $scope.flagArr = 0;
    $scope.flagAba = 1;
    $scope.flagBArr = 1; 
    $scope.flagBAba = 0;
    $scope.flagWatch = 0;



    $scope.options = { 
      frequency: 50
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
                  $stateParams.Media.Izquierda.play();
                  //$cordovaNativeAudio.play('Izquierda');
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
                  $stateParams.Media.Derecha.play();
                  //$cordovaNativeAudio.play('Derecha');
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
                      $stateParams.Media.Abajo.play();
                      //$cordovaNativeAudio.play('Abajo');
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
                      $stateParams.Media.Arriba.play();
                      //$cordovaNativeAudio.play('Arriba');
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
                      $stateParams.Media.BocaArriba.play();
                      //$cordovaNativeAudio.play('Boca_Arriba');
                      $scope.flagBArr = 1; 
                      $scope.flagBAba = 0;
                    }
              $scope.movimiento.z = 1;
            }else if(result.z < -1){

              if($scope.flagBAba == 0)
                    {
                      $stateParams.Media.BocaAbajo.play();
                      //$cordovaNativeAudio.play('Boca_Abajo');
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

    $scope.$on('$destroy', function(){
        $scope.stopWatching();
      })
  

  });//cierre ionicPlatform.ready

})



.controller('controlLogin', function($scope, $state, $ionicPopup) {

  $scope.Nombre;


  $scope.Logear = function(nombre){
    {
      console.log(nombre);
      if(nombre == "" || nombre == null)
      {
        $ionicPopup.alert({
          title: 'Error',
          template: "Debe ingresar su nombre"
          });
      }
      else
      {
        $ionicPopup.alert({
          title: 'Bienvenido',
          template: "Bienvenido ".concat(nombre)
          });
        $state.go('tab.movimiento');
      }
      
    }
  };
  
 })


.controller('controlGrabar', function($scope, $state, $cordovaMedia) {

  $scope.Media = {};

  $scope.Media.Izquierda = $cordovaMedia.newMedia('Izquierda.mp3');
  $scope.Media.Derecha = $cordovaMedia.newMedia('Derecha.mp3');
  $scope.Media.Arriba = $cordovaMedia.newMedia('Arriba.mp3');
  $scope.Media.Abajo = $cordovaMedia.newMedia('Abajo.mp3');
  $scope.Media.BocaArriba = $cordovaMedia.newMedia('BocaArriba.mp3');
  $scope.Media.BocaAbajo = $cordovaMedia.newMedia('BocaAbajo.mp3');


  $scope.GrabarIzq = function()
  {
    $scope.Media.Izquierda.startRecord();
  }
  $scope.StopIzq = function()
  {
    $scope.Media.Izquierda.stopRecord();
  }

  $scope.GrabarDer = function()
  {
    $scope.Media.Derecha.startRecord();
  }
  $scope.StopDer = function()
  {
    $scope.Media.Derecha.stopRecord();
  }

  $scope.GrabarArr = function()
  {
    $scope.Media.Arriba.startRecord();
  }
  $scope.StopArr = function()
  {
    $scope.Media.Arriba.stopRecord();
  }

  $scope.GrabarAba = function()
  {
    $scope.Media.Abajo.startRecord();
  }
  $scope.StopAba = function()
  {
    $scope.Media.Abajo.stopRecord();
  }

  $scope.GrabarBArr = function()
  {
    $scope.Media.BocaArriba.startRecord();
  }
  $scope.StopBArr = function()
  {
    $scope.Media.BocaArriba.stopRecord();
  }

  $scope.GrabarBAba = function()
  {
    $scope.Media.BocaAbajo.startRecord();
  }
  $scope.StopBAba = function()
  {
    $scope.Media.BocaAbajo.stopRecord();
  }

  $scope.Jugar = function()
  {
    $state.go('tab.movimiento', {Media : $scope.Media})
  }
  
 })



.controller('controlAbout', function($scope, $ionicLoading, $timeout) {

  $scope.$on('$stateChangeStart', 
             function(event, toState, toParams, fromState, fromParams){ 
    $ionicLoading.show();
  });

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    $timeout(function(){
      $ionicLoading.hide()
    },2000);
  });

  
});
