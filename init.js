$(function(){
    startMusic();
    setInterval(function(){

      updateZlamBoard();
    }, 4000);

    setInterval(function(){
      updateClickerBoard();
    }, 4000);
});