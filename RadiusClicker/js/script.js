/**
 * Created by Jits on 18-1-2016.
 */
var totalcounter = 0,
    counter = 0,
    start = false,
    timer = 60;

var u_clickAmount = 0,
    u_clickPrice = 10,
    clickValue = 1;

var u_clickPercentAmount = 0,
    u_clickPercentPrice = 100;

var u_mouseAmount = 0,
    u_mousePrice = 50,
    f_mouseAmount = 0,
    f_mousePrice = 1,
    mouseValue = 1;

var u_keyboardAmount = 0,
    u_keyboardPrice = 250,
    f_keyboardAmount = 0,
    f_keyboardPrice = 25,
    keyboardValue = 5;

var u_studentAmount = 0,
    u_studentPrice = 1000,
    f_studentAmount = 0,
    f_studentPrice = 100,
    studentValue = 25;

var u_teacherAmount = 0,
    u_teacherPrice = 4000,
    f_teacherAmount = 0,
    f_teacherPrice = 400,
    teacherValue = 90;


var u_headmasterAmount = 0,
    u_headmasterPrice = 10000,
    f_headmasterAmount = 0,
    f_headmasterPrice = 1000,
    headmasterValue = 235;

var audiobg = document.getElementById("myAudio"),
    muted = false;

var startMusic = function() {
    muted = false;
     $('#btn_audio').html('Mute');
    if (audiobg)
    {
    audiobg.play();
    audiobg.autoplay = true;
    audiobg.loop = true;
    audiobg.volume = 0.3;
  }
};

var stopMusic = function() {
    muted = true;
    $('#btn_audio').html('Unmute');
    audiobg.pause();
    audiobg.autoplay = false;
    audiobg.loop = false;
    audiobg.volume = 0;
};

$('#btn_audio').on('click', function(){
    muted ? startMusic() : stopMusic();
});

var startGame = function() {
    if (start) {
        start = false;

        $('#btn_startstop').html('Start');
        timer = 60;
        $('#timer').removeClass('text-danger');
        counter = 0;
        totalcounter = 0;
        return true;
    }
    return false;
};

var stopGame = function() {
    if (!start) {
        u_clickAmount = 0;
        u_clickPrice = 10;
        $('#upgradeClick > .amount').html(u_clickAmount);
        $('#upgradeClick > .price').html(u_clickPrice);

        u_clickPercentAmount = 0;
        u_clickPercentPrice = 100;
        $('#upgradeClickPercent > .amount').html(u_clickPercentAmount);
        $('#upgradeClickPercent > .price').html(u_clickPercentPrice);

        u_mouseAmount = 0;
        u_mousePrice = 50;
        $('#upgradeMouse > .amount').html(u_mouseAmount);
        $('#upgradeMouse > .price').html(u_mousePrice);
        f_mouseAmount = 0;
        f_mousePrice = 5;
        $('#facilityMouse > .amount').html(f_mouseAmount);
        $('#facilityMouse > .price').html(f_mousePrice);

        u_keyboardAmount = 0;
        u_keyboardPrice = 250;
        $('#upgradeKeyboard > .amount').html(u_keyboardAmount);
        $('#upgradeKeyboard > .price').html(u_keyboardPrice);
        f_keyboardAmount = 0;
        f_keyboardPrice = 25;
        $('#facilityKeyboard > .amount').html(f_keyboardAmount);
        $('#facilityKeyboard > .price').html(f_keyboardPrice);

        u_studentAmount = 0;
        u_studentPrice = 1000;
        $('#upgradeStudent > .amount').html(u_studentAmount);
        $('#upgradeStudent > .price').html(u_studentPrice);
        f_studentAmount = 0;
        f_studentPrice = 100;
        $('#facilityStudent > .amount').html(f_studentAmount);
        $('#facilityStudent > .price').html(f_studentPrice);

        u_teacherAmount = 0;
        u_teacherPrice = 4000;
        $('#upgradeTeacher > .amount').html(u_teacherAmount);
        $('#upgradeTeacher > .price').html(u_teacherPrice);
        f_teacherAmount = 0;
        f_teacherPrice = 400;
        $('#facilityTeacher > .amount').html(f_teacherAmount);
        $('#facilityTeacher > .price').html(f_teacherPrice);


        u_headmasterAmount = 0;
        u_headmasterPrice = 10000;
        $('#upgradeHeadmaster > .amount').html(f_headmasterAmount);
        $('#upgradeHeadmaster > .price').html(f_headmasterPrice);
        f_headmasterAmount = 0;
        f_headmasterPrice = 1000;
        $('#facilityHeadmaster > .amount').html(f_headmasterAmount);
        $('#facilityHeadmaster > .price').html(f_headmasterPrice);


        if (!$('.right').is(':empty')){
            $('.right').html('');
        }
        start = true;
        $('#score').html('Score: 0');
        $('#totalScore').html('Total Score: 0');
        $('#btn_startstop').html('Stop');
        return true;
    }
    return false;
};

$('#btn_startstop').on('click', function(){
    start ? startGame() : stopGame();
});

setInterval(function(){
    if (start) {
        timer-=1;
        if (timer == 0) {
            $('.right').html(
                '<h3>You scored: ' + totalcounter + '</h3>'
                + '<h3>Please enter your name</h3>'
                + '<input type="text" id="name" name="name">'
                + '<button class="btn" id="btn_again">Submit Score</button>'
            );
            $('#btn_startstop').css('display', 'none');
            start = false;

        }
        if (timer <= 10 ) {
            $('#timer').addClass('text-danger');
        }
        $('#timer').html('Time: ' + (timer));
    } else {
        $('#timer').html('Time: ' + (timer));
    }

}, 1000);

setInterval(function(){
   if (start) {
       var cps = (mouseValue *  u_mouseAmount + mouseValue * f_mouseAmount) + (keyboardValue * u_keyboardAmount + keyboardValue * f_keyboardAmount) + (studentValue * u_studentAmount + studentValue * f_studentAmount) + (teacherValue * u_teacherAmount + teacherValue * f_teacherAmount) + (headmasterValue * u_headmasterAmount + headmasterValue * f_headmasterAmount);

       counter += cps;
       totalcounter += cps;

       $('#score').html('Score: ' + (counter));
       $('#totalScore').html('Total Score: ' + (totalcounter));
   }
}, 1000);

$('#radius').on('click', function(){
    if(start){
        var addition = clickValue + (Math.ceil((u_clickPercentAmount / 100) * (mouseValue + keyboardValue + studentValue + teacherValue + headmasterValue)));
        counter += addition;
        totalcounter += addition;

        $('#score').html('Score: ' + (counter));
        $('#totalScore').html('Total Score: ' + (totalcounter));
    }
});

$('#facilityMouse').on('click', '.button', function(){
    if(counter >= f_mousePrice){
        counter = counter - f_mousePrice;

        f_mousePrice = Math.ceil(f_mousePrice * 1.4);
        f_mouseAmount++;

        $('#facilityMouse > .amount').html(f_mouseAmount);
        $('#facilityMouse > .price').html(f_mousePrice);
    }
});

$('#facilityKeyboard').on('click', '.button', function(){
    if(counter >= f_keyboardPrice){
        counter = counter - f_keyboardPrice;

        f_keyboardPrice = Math.ceil(f_keyboardPrice * 1.4);
        f_keyboardAmount++;

        $('#facilityKeyboard > .amount').html(f_keyboardAmount);
        $('#facilityKeyboard > .price').html(f_keyboardPrice);
    }
});

$('#facilityStudent').on('click', '.button', function(){
    if(counter >= f_studentPrice){
        counter = counter - f_studentPrice;

        f_studentPrice = Math.ceil(f_studentPrice * 1.4);
        f_studentAmount++;

        $('#facilityStudent > .amount').html(f_studentAmount);
        $('#facilityStudent > .price').html(f_studentPrice);
    }
});

$('#facilityTeacher').on('click', '.button', function(){
    if(counter >= f_teacherPrice){
        counter = counter - f_teacherPrice;

        f_teacherPrice = Math.ceil(f_teacherPrice * 1.4);
        f_teacherAmount++;

        $('#facilityTeacher > .amount').html(f_teacherAmount);
        $('#facilityTeacher > .price').html(f_teacherPrice);
    }
});

$('#facilityHeadmaster').on('click', '.button', function(){
    if(counter >= f_headmasterPrice){
        counter -= f_headmasterPrice;

        f_headmasterPrice = Math.ceil(f_headmasterPrice * 1.4);
        f_headmasterAmount++;

        $('#facilityHeadmaster > .amount').html(f_headmasterAmount);
        $('#facilityHeadmaster > .price').html(f_headmasterPrice);
    }
});

$('#upgradeClick').on('click', '.button', function(){
   if(counter >= u_clickPrice) {
       counter -= u_clickPrice;

       clickValue += (1 + u_clickAmount);
       u_clickPrice = Math.ceil(u_clickPrice * 1.9);
       u_clickAmount++;

       $('#upgradeClick > .amount').html(u_clickAmount);
       $('#upgradeClick > .price').html(u_clickPrice);
    }
});

$('#upgradeClickPercent').on('click', '.button', function(){
    if(counter >= u_clickPercentPrice) {
        counter -= u_clickPercentPrice;

        u_clickPercentPrice = Math.ceil(u_clickPercentPrice * 1.9);
        u_clickPercentAmount++;

        $('#upgradeClickPercent > .amount').html(u_clickPercentAmount);
        $('#upgradeClickPercent > .price').html(u_clickPercentPrice);
    }
});

$('#upgradeMouse').on('click', '.button', function(){
    if(counter >= u_mousePrice){
        counter -= u_mousePrice;

        u_mousePrice = Math.ceil(u_mousePrice * 1.9);
        u_mouseAmount++;

        $('#upgradeMouse > .amount').html(u_mouseAmount);
        $('#upgradeMouse > .price').html(u_mousePrice);
    }
});

$('#upgradeKeyboard').on('click', '.button', function(){
    if(counter >= u_keyboardPrice){
        counter -= u_keyboardPrice;

        u_keyboardPrice = Math.ceil(u_keyboardPrice * 1.9);
        u_keyboardAmount++;

        $('#upgradeKeyboard > .amount').html(u_keyboardAmount);
        $('#upgradeKeyboard > .price').html(u_keyboardPrice);
    }
});

$('#upgradeStudent').on('click', '.button', function(){
    if(counter >= u_studentPrice){
        counter -= u_studentPrice;

        u_studentPrice = Math.ceil(u_studentPrice * 1.9);
        u_studentAmount++;

        $('#upgradeStudent > .amount').html(u_studentAmount);
        $('#upgradeStudent > .price').html(u_studentPrice);
    }
});

$('#upgradeTeacher').on('click', '.button', function(){
    if(counter >= u_teacherPrice){
        counter -= u_teacherPrice;

        u_teacherPrice = Math.ceil(u_teacherPrice * 1.9);
        u_teacherAmount++;

        $('#upgradeTeacher > .amount').html(u_teacherAmount);
        $('#upgradeTeacher > .price').html(u_teacherPrice);
    }
});

$('#upgradeHeadmaster').on('click', '.button', function(){
    if(counter >= u_headmasterPrice){
        counter -= u_headmasterPrice;

        u_headmasterPrice = Math.ceil(u_headmasterPrice * 1.9);
        u_headmasterAmount++;

        $('#upgradeHeadmaster > .amount').html(u_headmasterAmount);
        $('#upgradeHeadmaster > .price').html(u_headmasterPrice);
    }
});

$('.right').on('click', '#btn_again', function(){

    var name = $('#name').val();

    if ($.trim(name) == '') {
        var name = 'Nameless';
    }

    console.log(name + ' ' + totalcounter);

    setScore(name, totalcounter);

    $('#btn_startstop').css('display', 'inline');

    $('#btn_startstop').trigger('click');
    $('#btn_startstop').trigger('click');
});


function setScore(username, score) {
    
    var highscores = JSON.parse(localStorage.getItem('clickerHighScore')) || [];

    var input = {
      username: username,
      score: score
    }

    highscores.push(input);
    localStorage['clickerHighScore'] = JSON.stringify(highscores);

}

function updateClickerBoard() {
    var highscores = JSON.parse(localStorage.getItem('clickerHighScore')) || [];

    highscores = JSLINQ(highscores).
                    OrderByDescending(function(item){
                      return item.score 
                    });
    var container = $('#clickerHighScore');
    container.empty();

    for (var i = 0 ; i < 10; i++)
    {
      container.append('<tr><td>'+ (i+1) +'</td><td>' + highscores.items[i].username + '</td><td>' + highscores.items[i].score + '</td></tr>');
    }
}

