// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordova' ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {


    if( ionic.Platform.isAndroid() )  { 
      initAd();

      alert('criando as views dos banners')
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
                bannerAtTop: false, // set to true, to put banner at top
                overlap: false, // set to true, to allow banner overlap webview
                offsetTopBar: false, // set to true to avoid ios7 status bar overlap
                isTesting: true, // receiving test ad
                autoShow: true // auto show interstitial ad when loaded
            });
            registerAdEvents();
            
        } else {
            alert( 'admob plugin not ready' );
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



})


.controller('banner', function($scope, ionicPlatform, $window){

  $scope.initAd = function(){
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
                bannerAtTop: false, // set to true, to put banner at top
                overlap: false, // set to true, to allow banner overlap webview
                offsetTopBar: false, // set to true to avoid ios7 status bar overlap
                isTesting: true, // receiving test ad
                autoShow: true // auto show interstitial ad when loaded
            });
            registerAdEvents();
            
        } else {
            alert( 'admob plugin not ready' );
        }
    }

})

.controller('showBanner', function($scope, $cordovaAdMob, $ionicPlatform, $window) {
 //alert("chamando banner");

 $scope.cliqueBanner = function(){
    window.plugins.AdMob.destroyBannerView();
    window.plugins.AdMob.createBannerView();
    window.plugins.AdMob.showAd(true,function(){},function(e){console.log(JSON.stringify(e));});

/*
  if( ionic.Platform.isAndroid() )  { 
       admobid = { // for Android
          banner: 'ca-app-pub-3773811061508464/9999165567' // Change this to your Ad Unit Id for banner...
       };

       if(window.AdMob) 
       {
        alert('Banner');
          AdMob.createBanner( {
             adId:admobid.banner, 
             position:AdMob.AD_POSITION.BOTTOM_CENTER, 
             autoShow:true,
             isTesting: true

          } );
      }
    }else{alert('Não é Android');}
    */ 
  }

   $scope.showInterstitialAd = function() {
    window.plugins.AdMob.destroyBannerView();
    window.plugins.AdMob.createInterstitialView();

    window.plugins.AdMob.showInterstitialAd(true,function(){},function(e){console.log(JSON.stringify(e));});

/*
    if( ionic.Platform.isAndroid() )  { 
    admobid2 = { // for Android
        admob_interstitial_key: 'ca-app-pub-3773811061508464/4171946208' // Change this to your Ad Unit Id for banner...
    };

     if(window.AdMob) 
     {
      alert('funcionando admob_interstitial_key');
        AdMob.createInterstitialView( {
          adId:admobid2.admob_interstitial_key,
          isTesting: true,
          autoShow: true
        } );

        AdMob.showInterstitialAd(
          true, 
          function(){},
          function(e){alert(JSON.stringify(e));}
        );
      }




     } else{
        alert('Não é Android admob_interstitial_key');
      } */

    }

   //$scope.showInterstitialAd(); 

   var listaMusicas=['audio/1.mp3','audio/2.mp3']

   //Player Musica
   $scope.nextList=function(){
   var faixaCont=2;
    
    controleAudio.removeChild(document.querySelector(".audioPlayer"));
    
    controleAudio.innerHTML = `<audio class="audioPlayer" controls autoplay>
        <source src="${listaMusicas[faixaCont-1]}" type="audio/mp3">
        Seu navegador não suporta o elemento áudio.
    </audio>
    <div class="button-next" onclick="nextList()">
            <a class="glyphicon glyphicon-step-forward"></a>
    </div>`;
    
    
    
    //source.setAttribute("src",listaMusicas[faixaCont-1]);
    
   
}

   


})


