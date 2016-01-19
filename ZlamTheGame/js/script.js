(function(){


var bwidth = $('.zlam').outerWidth(),
    bheight = $('.zlam').outerHeight();
    
var cwidth = $('.middle').outerWidth(),
    cheight = $('.middle').outerHeight();

var counter = 0,
    start = false,
    username,
    timer = 10;
    
var audiobg = document.getElementById("myAudio"),
    muted = false;

$(function(){
    if (window.location)
    setInterval(updateScoreBoard, 2000);  
    startMusic();
});

var startMusic = function() {
    muted = false;
    $('#btn_audio').html('Mute');
    audiobg.play();
    audiobg.autoplay = true;
    audiobg.loop = true;
    audiobg.volume = 0.3;
};

var stopMusic = function() {
    muted = true;
    $('#btn_audio').html('Unmute');
    audiobg.pause();
    audiobg.autoplay = false;
    audiobg.loop = false;
    audiobg.volume = 0;
};

var startGame = function() {
    if (start) {
        start = false;
        $('#btn_startstop').html('Start');
        timer = 10;
        $('#timer').removeClass('text-danger');
        $('.middle').css({'background' : '#4DB6AC'});
        $('.zlam').css({
            'left' : '40%',
            'bottom' : '40%',
            'transform': 'rotate(360deg)'
        });
        counter = 0;
        return true;
    }
    return false;
};

var stopGame = function() {
    if (!start) {
        if (!$('.right').is(':empty')){
            //if(!($('.right').html(''))) {
            $('.right').html('');
        }
        start = true;
        $('#score').html('Score: 0');
        $('#btn_startstop').html('Stop');
        return true;
    }
    return false;
};

$('#btn_startstop').on('click', function(){
    start ? startGame() : stopGame();
});

$('#btn_audio').on('click', function(){
    muted ? startMusic() : stopMusic();
});

setInterval(function(){
    if (start) {
        $('.zlam').css({
            'left' : Math.floor(Math.random()*(cwidth-bwidth)),
            'bottom': Math.floor(Math.random()*(cheight-bheight)),
            'transform': 'rotate(' + Math.floor(Math.random()*360)   + 'deg)',
            'transition' : '0.3s'
        });
    }
}, 300);

setInterval(function(){
    if (start) {
        timer-=1;
        if (timer == 0) {
            //alert('timer is 0');
            $('.right').html(
                '<h3>You scored: ' + counter + '</h3>'
                + '<h3>you want to try again?</h3>'
                + '<button class="btn" id="btn_again">Retry</button>'
            );
            var endScore = counter;
            $('#btn_startstop').trigger('click');

            if ( username = prompt('Thanks for playing! What is your username?') )
            {
                setScore(username, endScore);                
            }

            //start = false;
            //$('#btn_startstop').html('Start');
            //timer = 60;
            //counter = 0;
            //$('#timer').removeClass('text-danger');

        }
        if (timer <= 10 ) {
            $('#timer').addClass('text-danger');
        }
        $('#timer').html('Time: ' + (timer));
    } else {
        $('#timer').html('Time: ' + (timer));
    }

}, 1000);

$('.right').on('click', '#btn_again', function(){
    $('#btn_startstop').trigger('click');
});

$('.zlam').on('mouseover', function(){
    if (start) {

        setTimeout(function () {
            $('.zlam').css({
                'left': Math.floor(Math.random() * (cwidth - bwidth)),
                'bottom': Math.floor(Math.random() * (cheight - bheight)),
                'transform': 'rotate(' + Math.floor(Math.random() * 360) + 'deg)',
                'transition': '0.1s'
            });
            $('.middle').css({
                'background': '#' + Math.floor(Math.random() * 16777215).toString(16),
                'transition': '2s'
            })
        }, 0);
    }

});
$('.zlam').on('click', function(){
    if (start) {
        $('#score').html('Score: ' + (counter += 1));
        $('.zlam').css({
            'left': Math.floor(Math.random() * (cwidth - bwidth)),
            'bottom': Math.floor(Math.random() * (cheight - bheight)),
            'transform': 'rotate(' + Math.floor(Math.random() * 360) + 'deg)',
            'transition': '0.2s'
        });
        $('.middle').css({
            'background': '#' + Math.floor(Math.random() * 16777215).toString(16),
            'transition': '2s'
        })
    }
});


function setScore(username, score) {
    
    var highscores = JSON.parse(localStorage.getItem('zlamHighScore')) || [];

    var input = {
      username: username,
      score: score
    }

    highscores.push(input);
    localStorage['zlamHighScore'] = JSON.stringify(highscores);

}

function updateScoreBoard() {
    var highscores = JSON.parse(localStorage.getItem('zlamHighScore')) || [];

    highscores = JSLINQ(highscores).
                    OrderByDescending(function(item){
                      return item.score 
                    });

    var container = $('#zlamHighScore');
    container.empty();

    for (var i = 0 ; i < 10; i++)
    {
      container.append('<tr><td>'+ (i+1) +'</td><td>' + highscores.items[i].username + '</td><td>' + highscores.items[i].score + '</td></tr>');
    }
}


})();
