
var gamePattern=[];
var btn_colors=["red", "blue", "green", "yellow"];
var level=0;
var userClickedPattern = [];
var started = false;
function playAudio(sound){
    var audio = new Audio('sounds/'+sound+".mp3");
    audio.play();
}
function animatepress(currentColor){
    $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
$(".btn").click(function() {

  //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  //console.log(this)
    var userChosenColour = $(this).attr("id");
    playAudio(userChosenColour);  
  //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
    userClickedPattern.push(userChosenColour);
    animatepress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);//last index
    //console.log(userClickedPattern);
}
);
function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
function checkAnswer(currentLvl){
    
    if(userClickedPattern[currentLvl]==gamePattern[currentLvl]){
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            seq();
            userClickedPattern=[];
          }, 1000);
        }
    }
    else{
        playAudio('wrong');

        $('body').addClass('game-over');
        setTimeout(function () {
          $('body').removeClass('game-over');
          userClickedPattern=[];
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
        //$(document).keypress(startOver);
        console.log("wrong");
    }
}
function seq(){
    r_no = Math.floor(Math.random()*4);
    var randomChosenColor = btn_colors[r_no];
    gamePattern.push(randomChosenColor);
    playAudio(randomChosenColor);
    animatepress(randomChosenColor);
    $("#level-title").text("Level "+level);
    level++;
    // while(gamePattern==userClickedPattern){
    //     $("#level-title").text("Level "+level);
    //     level+=1;

    // }
    
    
    
}

$(document).keypress(function(){
  if(!started){
    seq();
    $("#level-title").text("Level "+level);
    started=true;
  }
});

