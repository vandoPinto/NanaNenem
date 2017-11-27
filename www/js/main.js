$(window).ready(function () {

    i = 0;
    var loop = false;
    var tempoFechar=[1,5,10,15,20,30,60,'Desligado'];
    var contadorTempo = 0;
    var boolTimer = false;
    var myTimer;
    
    
    var playListCount = $(".playsong").size();

    console.log(playListCount);

    nowPlaying = $(".playsong");
    nowPlaying[i].load();

    var playing = false;

    $('.play').click(function () {
       // $('.play').toggleClass("hidden");
        console.log('playando áudio: '+i)
        nowPlaying[i].play();
        playing = true;
        callMeta();
    });

     $('.pause').click(function () {
        //$('.play').toggleClass("hidden");
        console.log('pausando áudio: '+i)
        nowPlaying[i].pause();
        playing = false;
        callMeta();
    });
    
    $(".next").click(function(){
       console.log("proxima "+ playListCount +" "+i)
        $.each($("audio.playsong"),function(){
        this.pause();
        });

        if ( i < playListCount-1 ) {
            
            ++i;
           
        }else{
            i=0;
        }

        nowPlaying[i].load();
        nowPlaying[i].play();
        console.log('tocando áudio '+i)
        callMeta();
    });

    $(".prev").click(function(){
        console.log("anterior "+ i+ " "+(playListCount-1));

        if ( i <= playListCount-1 && i > 0) {
            $.each($("audio.playsong"),function(){
            this.pause();
            });
            --i;
            nowPlaying[i].load();
            nowPlaying[i].play();
            console.log('tocando áudio '+i)
            callMeta();
        }
        
    
    });     

     $('.repeat').click(function () {
        $('.repeat').toggleClass("hidden");
        
        if(loop){
            loop=false;
            console.log('não repeat audio '+i)
        }else{
            loop = true;
            console.log('repeat audio '+i);
        }
    
    }); 


     $('.timer').click(function () {

        
        if(contadorTempo < (tempoFechar.length )){
            console.log(tempoFechar[contadorTempo]);
            
            

            if(tempoFechar[contadorTempo] == 'Desligado'){
                boolTimer = false;
                $('body').append('<div class="timerPopUp" id="popUpTimer">Timer: '+tempoFechar[contadorTempo]+'</div>');
                contadorTempo = 0;
                clearTimeout(myTimer);
            }else{
                $('body').append('<div class="timerPopUp" id="popUpTimer">Timer: '+tempoFechar[contadorTempo]+' min</div>');
                boolTimer = true;
                ligarTimer();
                contadorTempo++;                
            }
        }else{
            contadorTempo = 0;
        }

        setTimeout(() => {
          $('#popUpTimer').stop(true,true).fadeOut(200);
          setTimeout(() => {
            $('#popUpTimer').remove();
          },250)
        }, 1000);
            
    }); 

    function ligarTimer(){
        if(boolTimer){
            clearTimeout(myTimer);
            console.log('ligando Timer: '+(tempoFechar[contadorTempo]*60000) );
            myTimer = setTimeout(function() {
                if(tempoFechar[contadorTempo] != 'Desligado'){
                    //parar Musica
                    nowPlaying[i].pause();
                    playing = false;
                    callMeta();
                    console.log('desligando o timer se passaram'+tempoFechar[contadorTempo-1]+" min");
                }else{
                    clearTimeout(myTimer);
                    boolTimer = false;
                    console.log('Removendo timeout ja passou: '+tempoFechar[contadorTempo-1]+" min");
                }

                $('body').append('<div class="timerPopUp" id="popUpTimer">Fim do temporizador!</div>');
                    setTimeout(() => {
                      $('#popUpTimer').stop(true,true).fadeOut(200);
                      setTimeout(() => {
                        $('#popUpTimer').remove();
                      },250)
                    }, 1000);

            }, (tempoFechar[contadorTempo]*60000) );
        }
    }
      
    $("audio.playsong").bind('timeupdate', function () {

        var track_length = nowPlaying[i].duration;
        var secs = nowPlaying[i].currentTime;
        var progress = (secs / track_length) * 100;

        $('#progress').css({
            'width': progress + "%"

        });

        if(loop){
            console.log(secs, track_length)
            if(secs == track_length){
                console.log("rodar loop");
                nowPlaying[i].load();
                nowPlaying[i].play();
                console.log('tocando áudio '+i)
                callMeta();
            }
        }else{
            if(secs == track_length){
                console.log('vando '+i,playListCount-1)
                if(i < playListCount-1){
                    i++;  
                    console.log('mudando para proxima musica '+i);
                }else{
                    i = 0;
                    console.log('0mudando para proxima musica ',i);
                }
                nowPlaying[i].load();
                nowPlaying[i].play();
                console.log('tocando áudio '+i)
                callMeta();
                cliqueBanner();
            }
        }
        
    })

    $("audio.playsong").bind("timeupdate", function () {
        $("#current_time").html(formatTime(nowPlaying[i].currentTime))
    });
    $("audio.playsong").bind("durationchange", function () {
        $("#duration_time").html(formatTime(nowPlaying[i].duration))
    });

    function formatTime(seconds) {
        var seconds = Math.round(seconds);
        var minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        minutes = (minutes >= 10) ? minutes : "0" + minutes;
        seconds = (seconds >= 10) ? seconds : "0" + seconds;
        return minutes + ":" + seconds;
    }

    if ($("audio.playsong").src = "") {
        $("#current_time").html("--:--");
        $("#duration_time").html("--:--");
    }



    function callMeta() {
        var trackTitle = $(nowPlaying[i]).attr("data-songtitle");
        $(".songtitle").html("Musica: "+trackTitle);
        var trackArtist = $(nowPlaying[i]).attr("data-songartist");
        $(".songartist").html("Artista: "+trackArtist);
        var albumart = $(nowPlaying[i]).attr("data-albumart");
        $("img.albumart").attr("src", albumart);
         //$("img.albumart").css('background-image', albumart);
    }

});