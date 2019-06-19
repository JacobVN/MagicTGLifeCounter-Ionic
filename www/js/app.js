
var app = angular.module('starter', ['ionic']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

app.controller ('LifeController', function($scope, $ionicModal, $timeout) {

  $scope.t1Life = 20;
  $scope.t2Life = 20;
  $scope.t1Poison = 0;
  $scope.t2Poison = 0;

  $scope.totalManual = 20;
  $scope.poison = false;
  $scope.coin = 'planeswalker';
  $scope.coinBackground = 'planeswalker';

  $scope.t1Color = 'generic';
  $scope.t1Icon = 'icon-generic';
  $scope.t2Color = 'generic';
  $scope.t2Icon = 'icon-generic';

  $scope.t1RollWin = false;
  $scope.t2RollWin = false;

  $scope.setT1Color = function(color){
    $scope.t1Color = color;
    $scope.t1Icon = 'icon-' + color;
  };

  $scope.setT2Color = function(color){
    $scope.t2Color = color;
    $scope.t2Icon = 'icon-' + color;
  };

  $scope.changeTotalLife = function(total){
    if (total === undefined) {
      total = $scope.totalManual;
    }
    $scope.t1Life = total;
    $scope.t2Life = total;
    $scope.t1Poison = 0;
    $scope.t2Poison = 0;

    $scope.closeLife();
  };

  $scope.setTotalManual = function(amount){
    $scope.totalManual = $scope.totalManual + amount;
  };

  $scope.setT1Life = function(amount){
    $scope.t1Life = $scope.t1Life + amount;
  };
  $scope.setT2Life = function(amount){
    $scope.t2Life = $scope.t2Life + amount;
  };

  $scope.showPoison = function(){
    if ($scope.poison === false){
      $scope.poison = true;
    } else {
      $scope.poison = false;
    }
  }
  $scope.setT1Poison = function(amount){
    if (($scope.t1Poison + amount) >= 0){
      $scope.t1Poison = $scope.t1Poison + amount;
    };
  };
  $scope.setT2Poison = function(amount){
    if (($scope.t2Poison + amount) >= 0){
      $scope.t2Poison = $scope.t2Poison + amount;
    };
  };

  // life modal
  $ionicModal.fromTemplateUrl('total-life.html', {
    scope: $scope
  }).then(function(lifeModal) {
    $scope.lifeModal = lifeModal;
  });

  $scope.openLife = function() {
    $scope.lifeModal.show();
  };
  $scope.closeLife = function() {
    $scope.lifeModal.hide();
  };

  // roll modal
  $ionicModal.fromTemplateUrl('roll.html', {
    scope: $scope
  }).then(function(rollModal) {
    $scope.rollModal = rollModal;
  });

  $scope.t1Num = 0;
  $scope.t2Num = 0;

  $scope.getNumber = function() {
    $scope.t1RollWin = false;
    $scope.t2RollWin = false;
    $scope.t1Num = 0;
    $scope.t2Num = 0;
    $timeout(genRandom, 100);
    $timeout(genRandom, 200);
    $timeout(genRandom, 300);
    $timeout(genRandom, 400);
    $timeout(genRandom, 500);
    $timeout(showWinner, 600);
  };

  var genRandom = function (){
    $scope.t1Num = (Math.ceil(Math.random() * 6));
    $scope.t2Num = (Math.ceil(Math.random() * 6));
    if($scope.t1Num === $scope.t2Num){
      genRandom();
    }
  };

  var showWinner = function (){
    if($scope.t1Num > $scope.t2Num){
      $scope.t1RollWin = true;
    }else if($scope.t1Num < $scope.t2Num){
      $scope.t2RollWin = true;
    }
  };

  $scope.openRoll = function() {
    $scope.rollModal.show();
  };
  $scope.closeRoll = function() {
    $scope.t1Num = 0;
    $scope.t2Num = 0;
    $scope.rollModal.hide();
    $scope.t1RollWin = false;
    $scope.t2RollWin = false;
  };

  // coin modal

  $ionicModal.fromTemplateUrl('coin.html', {
    scope: $scope
  }).then(function(coinModal) {
    $scope.coinModal = coinModal;
  });

  $scope.flipCoin = function() {
    $scope.coinBackground = 'planeswalker';
    $timeout(function(){$scope.coin = $scope.t2Color}, 0);
    $timeout(function(){$scope.coin = $scope.t1Color}, 100);
    $timeout(function(){$scope.coin = $scope.t2Color}, 200);
    $timeout(function(){$scope.coin = $scope.t1Color}, 300);
    $timeout(function(){$scope.coin = $scope.t2Color}, 400);
    $timeout(genCoin, 500);
  };

  var genCoin = function (){
    var coin = (Math.ceil(Math.random() * 2));
    if(coin === 1){
      $scope.coin = $scope.t1Color;
      $scope.coinBackground = $scope.t1Color;
    } else {
      $scope.coin = $scope.t2Color;
      $scope.coinBackground = $scope.t2Color;
    }
  };

  $scope.openCoin = function() {
    $scope.coinModal.show();
  };
  $scope.closeCoin = function() {
    $scope.coin = 'planeswalker';
    $scope.coinBackground = 'planeswalker';
    $scope.coinModal.hide();
  };

  // color modal
  $ionicModal.fromTemplateUrl('color-teams.html', {
    scope: $scope
  }).then(function(colorModal) {
    $scope.colorModal = colorModal;
  });

  $scope.openColor = function() {
    $scope.colorModal.show();
  };
  $scope.closeColor = function() {
    $scope.colorModal.hide();
  };

});
