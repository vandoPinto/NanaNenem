// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic','ngCordova' ]);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if( ionic.Platform.isAndroid() )  { 
      initAd();

      //alert('criando as views dos banners')
      // display the banner at startup
      window.plugins.AdMob.createBannerView();
    
      // display the interstitial at startup
      window.plugins.AdMob.createInterstitialView();

      function initAd(){
        if ( window.plugins && window.plugins.AdMob ) {
          var ad_units = {
        ios : {
          banner: 'ca-app-pub-6869992474017983/4806197152',
          interstitial: 'ca-app-pub-6869992474017983/7563979554'
        },
        android : {
          banner: 'ca-app-pub-3773811061508464/9999165567',
          interstitial: 'ca-app-pub-3773811061508464/4171946208'
        },
        wp8 : {
          banner: 'ca-app-pub-6869992474017983/8878394753',
          interstitial: 'ca-app-pub-6869992474017983/1355127956'
        }
          };
          var admobid = "";
          if( /(android)/i.test(navigator.userAgent) ) {
            admobid = ad_units.android;
          } else if(/(iphone|ipad)/i.test(navigator.userAgent)) {
            admobid = ad_units.ios;
          } else {
            admobid = ad_units.wp8;
          }
            window.plugins.AdMob.setOptions( {
                publisherId: admobid.banner,
                interstitialAdId: admobid.interstitial,
                //adSize: 'SMART_BANNER',
                //width: 90, // valid when set adSize 'CUSTOM'
                //height: 90, // valid when set adSize 'CUSTOM'
                bannerAtTop: false, // set to true, to put banner at top
                overlap: false, // set to true, to allow banner overlap webview
                offsetTopBar: false, // set to true to avoid ios7 status bar overlap
                isTesting: false, // receiving test ad
                autoShow: true // auto show interstitial ad when loaded
            });
            registerAdEvents();
            
        } else {
            console.log( 'admob plugin not ready' );
        }
    }
    }  


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



});





app.controller('showBanner', function($scope, $cordovaAdMob, $ionicPlatform, $window) {
 
  $scope.cliqueBanner = function(){
      //alert('AdMob');
      window.plugins.AdMob.destroyBannerView();
      window.plugins.AdMob.createBannerView();
      window.plugins.AdMob.showAd(true,function(){},function(e){console.log(JSON.stringify(e));});
  }
cliqueBanner = $scope.cliqueBanner;
 $scope.showInterstitialAd = function(){
      //alert('admob interstitial')
      window.plugins.AdMob.destroyBannerView();
      window.plugins.AdMob.createInterstitialView();
      window.plugins.AdMob.showInterstitialAd(true,function(){},function(e){console.log(JSON.stringify(e));});
  }

});



app.controller('tagAudio',function($scope){
  $scope.musicas=[
      {
        "local":"sounds/Ciranda, Cirandinha.mp3",
        "artista":"Musicas para Bebês",
        "nomeMusica":"Ciranda, Cirandinha",
        "imagem":"img/1.jpg"
      },
      {
        "local":"sounds/Imagine.mp3",
        "artista":"The Beatles",
        "nomeMusica":"Imagine",
        "imagem":"img/2.jpg"
      },
      {
        "local":"sounds/Hey Jude.mp3",
        "artista":"The Beatles",
        "nomeMusica":"Hey Jude",
        "imagem":"img/3.jpg"
      },
      {
        "local":"sounds/Here I am to worship.mp3",
        "artista":"Michael W. Smith",
        "nomeMusica":"Here I am to worship",
        "imagem":"img/4.jpg"
      },

      {
        "local":"sounds/At the cross.mp3",
        "artista":"Hillsong United",
        "nomeMusica":"At the cross",
        "imagem":"img/5.jpg"
      },
      {
        "local":"sounds/Worthy is the Lamb.mp3",
        "artista":"Hillsong United",
        "nomeMusica":"Worthy is the Lamb",
        "imagem":"img/6.jpg"
      },
      {
        "local":"sounds/lemonade.mp3",
        "artista":"Beyoncé",
        "nomeMusica":"Lemonade",
        "imagem":"img/7.jpg"
      },
      {
        "local":"sounds/Die With You Single.mp3",
        "artista":"Beyoncé",
        "nomeMusica":"Die With You Single",
        "imagem":"img/8.jpg"
      },
      {
        "local":"sounds/All Night.mp3",
        "artista":"Beyoncé",
        "nomeMusica":"All Night",
        "imagem":"img/9.jpg"
      },
      {
        "local":"sounds/Words.mp3",
        "artista":"Bee Gees",
        "nomeMusica":"Words",
        "imagem":"img/10.jpg"
      },
      {
        "local":"sounds/How deep is your love.mp3",
        "artista":"Bee Gees",
        "nomeMusica":"How deep is your love",
        "imagem":"img/11.jpg"
      },
      {
        "local":"sounds/Too much heaven.mp3",
        "artista":"Bee Gees",
        "nomeMusica":"Too much heaven",
        "imagem":"img/12.jpg"
      },
      {
        "local":"sounds/Deus do Impossivel.mp3",
        "artista":"Aline Barros",
        "nomeMusica":"Deus do Impossivel",
        "imagem":"img/13.jpg"
      },
      {
        "local":"sounds/Tempo de mudar.mp3",
        "artista":"Aline Barros",
        "nomeMusica":"Tempo de mudar",
        "imagem":"img/14.jpg"
      },
      {
        "local":"sounds/Daddy.mp3",
        "artista":"Beyoncé",
        "nomeMusica":"Daddy",
        "imagem":"img/7.jpg"
      },
      {
        "local":"sounds/Sandcastles.mp3",
        "artista":"Beyoncé",
        "nomeMusica":"Sandcastles",
        "imagem":"img/8.jpg"
      },
      {
        "local":"sounds/Listen.mp3",
        "artista":"Beyoncé",
        "nomeMusica":"Listen",
        "imagem":"img/9.jpg"
      }
  ]
});
