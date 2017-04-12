var player;
var one;
var two;
var three;
var four;

var walls;
var three;

var falling;
var block1;
var blocks = 0;

var score = 0;
var highscore = 0;
var wins = 0;

var gameOver=false;

var begin;
var instructions = "Use left & right arrows to move & press R to restart";
var showInstructions = true;

function setup() {
  createCanvas(600,600);

  player = createSprite(300, 500, 50, 50);
  player.friction=.95

  begin = millis();

  //walls
  one = createSprite(-5,-25, 1500,50);
  two = createSprite(-5, 5, 5, 1500);
  three = createSprite(-25,650,1500,5);
  four = createSprite(605,5,5,1500);

  walls = Group();
  walls.add(one);
  walls.add(two);
  walls.add(four);

  one.immovable=true;
  two.immovable=true;
  three.immovable=true;
  four.immovable=true;

  //blocks
  block1 = createSprite(random(600), -25, 50, 50);
  falling = Group();
  falling.add(block1);

}

function draw() {
  background(235);

  if(showInstructions){
      instuct();
  }
  textSize([20]);
  text("Highscore: "+highscore,25,50);
  text("Score: "+score,25,75);
  text("Wins: "+wins,25,100);

    drawSprites(); //create everything
    player.bounce(walls);

    falling.collide(three, respawn);
    falling.bounce(player);

    if(keyDown(37) && gameOver==false){//Left
      player.setSpeed(5,180);
}
    if(keyDown(39) && gameOver==false){ //Right
      player.setSpeed(5, 360);

}

  if(score>highscore){ //set highscore
    highscore=score;
  }

  if(score==200){ //allows the player to win the game
    for (var i = 0; i < falling.length ; i++){ //sets speed for falling blocks
        falling.get(i).visible=false;
        falling.get(i).remove();
      }
      gameOver=true;
      player.visible=false;
      textSize([50]);
      text("YOU ARE A WINNER",70,300);
      text("click R to play again!",90,350);
}
if(keyDown(82) && score==200){ //adds to win if you win
  wins=wins+1;
}

  if(player.collide(three)){ //displays text when player dies
    gameOver=true;
    score=0;
    player.visible=false;
    for (var i = 0; i < falling.length ; i++){ //sets speed for falling blocks
        falling.get(i).visible=false;
        falling.get(i).remove();
      }
    textSize([50]);
    text("GAME OVER",150,300);
    text("click R to restart",120,350);
}

  if(keyDown(82)){ //If R key is hit, game resets (score is set to 0)
    player.position.y=500;
    player.position.x=300;
    player.visible=true;
    for (var i = 0; i < falling.length ; i++){ //sets speed for falling blocks
        falling.get(i).visible=true;
        falling.get(i).remove();
      }
    addFalling();
    gameOver=false;
    score=true;
    score = 0;
  }


for (var i = 0; i < falling.length ; i++){ //sets speed for falling blocks
    falling.get(i).addSpeed(.03,90);
  }
}

function instuct() { //shos instructions
    if(keyIsPressed && millis()-begin < 3000){
        showInstructions = false;
    }
    text(instructions,200,300);
}

function respawn(spriteA, spriteB){ //respawn the falling blocks and add more blocks
  spriteA.position.y=-25;
  spriteA.velocity.y=0;
  falling.add(createSprite(random(600), random(-200) , 50, 50) );
  score = score + 1;
}

function addFalling(spriteA){
  falling.add(createSprite(random(600), random(-200) , 50, 50) );
}
