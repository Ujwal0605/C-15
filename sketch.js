var ground,groundImage;
var trex ,trex_running;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
function preload(){
  trex_running = loadAnimation('trex1.png', 'trex3.png', 'trex4.png');
  trex_collided = loadAnimation('trex_collided.png')
groundImage = loadImage('ground2.png');
cloudImage = loadImage('cloud.png');
obstacle1 = loadImage('obstacle1.png');
obstacle2 = loadImage('obstacle2.png');   
obstacle3 = loadImage('obstacle3.png');
obstacle4 = loadImage('obstacle4.png');
obstacle5 = loadImage('obstacle5.png');
obstacle6 = loadImage('obstacle6.png');
gameOverImg = loadImage('gameOver.png');
restartImg = loadImage('restart.png');
}

function setup(){
  createCanvas(600,200)
  
trex = createSprite(50,160,20,50); 
trex.addAnimation('running', trex_running);
trex.addAnimation('collided', trex_collided)
edges=createEdgeSprites();
trex.scale=0.5;
trex.x= 50;
ground=createSprite(200,180,400,20)
ground.addImage('ground', groundImage)

invisibleGround=createSprite(200,190,400,10)
invisibleGround.visible=false
console.log("hello"+5)
var ran = random(10,16);
console.log(ran);
score = 0;
obstaclesGroup = new Group();
cloudsGroup = new Group();
trex.setCollider("circle",0,0,40);
trex.debug=true
gameOver=createSprite(300,100);
gameOver.addImage(gameOverImg);
restart=createSprite(300,140);
restart.addImage(restartImg)
gameOver.scale=0.5;
restart.scale=0.5;
}

function draw(){
  background("yellow")
text("Score: "+score,500,50);

if (gameState===PLAY){
  gameOver.visible=false;
  restart.visible=false
  ground.velocityX= -2;
  score = score+Math.round(frameCount/60);
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  if(keyDown('SPACE') && trex.y>160){
    trex.velocityY= -10
    }
    trex.velocityY=trex.velocityY+0.5
    spawnClouds();
spawnObstacles();
if (obstaclesGroup.isTouching(trex)){
  gameState=END;
}
}
else if(gameState===END){
  gameOver.visible=true;
  restart.visible=true;
  ground.velocityX= 0;
  obstaclesGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);
  trex.changeAnimation("collided",trex_collided);
  obstaclesGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);
  trex.velocityY=0;
}
  
console.log(trex.y)


trex.collide(invisibleGround);


  drawSprites();

}
function spawnClouds(){
  if(frameCount%60 === 0){
cloud = createSprite(600,100,40,10);
cloud.addImage(cloudImage)
cloud.y=Math.round(random(10,60));
cloud.scale = 0.4;
cloud.velocityX = -3;
cloud.lifetime = 187;
cloud.depth = trex.depth;
trex.depth=trex.depth+1;
cloudsGroup.add(cloud)
  }
}

function spawnObstacles(){
if(frameCount%60 === 0){
var obstacle = createSprite(600,165,10,40)
obstacle.velocityX = -6;
var rand = Math.round(random(1,6));
switch(rand){
  case 1: obstacle.addImage(obstacle1);
  break;
  case 2: obstacle.addImage(obstacle2);
  break;
  case 3: obstacle.addImage(obstacle3);
  break;
  case 4: obstacle.addImage(obstacle4);
  break;
  case 5: obstacle.addImage(obstacle5);
  break;
  case 6: obstacle.addImage(obstacle6);
  break;
  default:break;
}
obstacle.scale = 0.5;
obstacle.lifetime = 300;
obstaclesGroup.add(obstacle)
}

}