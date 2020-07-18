var trex,obstacle1,restart,ground,gameOver,invisibleGround,trexImage,groundImage,restartImage,cloudImage,gameoverImage,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,trexcollide,cloudGroup,obstacleGroup,score,gameState,bg,bgImage;

localStorage["highestScore"]=0;

function preload(){
  trexImage=loadAnimation("t1.png","t2.png","t3.png");
  groundImage=loadImage("ground2.png");
  gameoverImage=loadImage("game .png");
  restartImage=loadImage("reset.png");
  cloudImage=loadImage("3.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  trexcollide=loadImage("2.png");
  bgImage=loadImage("Space.jpg");
}
function setup() {
  createCanvas(600,200);
  bg=createSprite(300,100);
  bg.addImage("Space.jpg",bgImage);
  trex=createSprite(50,180);
  trex.addAnimation("run",trexImage);
  trex.addAnimation("trex_collided",trexcollide);
  ground=createSprite(300,180);
  ground.addImage("ground",groundImage);
  restart=createSprite(300,150);
  restart.addImage("restart",restartImage);
  gameOver=createSprite(300,100);
  gameOver.addImage("gameOver",gameoverImage);
  invisibleGround=createSprite(300,181,600,2);
  invisibleGround.visible=false;
  gameOver.scale=1.2;
  gameOver.visible=false;
  restart.scale=0.7;
  restart.visible=false;
  trex.scale=0.4;
  ground.x=ground.width/2; 
  bg.x=bg.width/2;
  obstacleGroup=new Group();
  cloudGroup=new Group();
  score=0;
  gameState = "play";
}

function draw() {
  background(180);
  if(gameState==="play"){
    ground.velocityX = -(10+score*3/100);
    bg.velocityX = -(10+score*3/100);
    
    if (ground.x < 0){
    ground.x = ground.width/2;
  }
    
    if (bg.x < 0){
    bg.x = bg.width/2;
  }
    
    console.log(trex.y);
  
  if(keyDown("space") && trex.y >= 151.8){
    trex.velocityY = -10 ;
  }
  
  trex.velocityY = trex.velocityY + 0.5;
  
  score=score+Math.round(getFrameRate()/60);
  
  spawnObstacles();
  spawnClouds();
  
   if(trex.isTouching(obstacleGroup)){
     gameState="end";
      }
      
      if(score % 100===0 && score > 0){
      }
      
      if(score>=99999){
        gameState="end";
      }
  }
  
  else if(gameState==="end"){
     bg.velocity=0;
     ground.velocityX = 0;
     obstacleGroup.setVelocityXEach(0);
     cloudGroup.setVelocityXEach(0);
    trex.scale=0.4
     trex.changeAnimation("trex_collided");
     cloudGroup.setLifetimeEach(2);
     obstacleGroup.setLifetimeEach(2);
     trex.velocityY=0;
     
     gameOver.visible=true;
     restart.visible=true;
  }
  
  if(mousePressedOver(restart)){
    reset();
  }
  
  trex.collide(invisibleGround);
  drawSprites();
  
  fill("white");
  textSize(25);
  text("Score: " + score,450,30);
  text("HighScore: " +localStorage["highestScore"], 10,30);
}

function spawnClouds(){
  
  if(frameCount % 60===0){
    var cloud=createSprite(620,50,20,20);
    cloud.addAnimation("cloud",cloudImage);
    cloud.velocityX= -(4+score/150);
    cloud.y=Math.round(random(60,140));
    cloud.depth=trex.depth;
    trex.depth++;
    cloud.scale=0.1;
    cloud.lifetime=620/4;
    cloudGroup.add(cloud);
    }
}

function spawnObstacles (){
  
  if(World.frameCount % 60===0){
    var obstacle=createSprite(620,165,20,20);
    obstacle.velocityX=-(10+score*3/100);
    obstacle.lifetime=620/6;
    var r=Math.round(random(1,6));
    switch(r){
      case 1:obstacle.addImage("obstacle",obstacle1);
        break;
      case 2:obstacle.addImage("obstacle",obstacle2);
        break;
      case 3:obstacle.addImage("obstacle",obstacle3);
        break;
      case 4:obstacle.addImage("obstacle",obstacle4);
        break;
      case 5:obstacle.addImage("obstacle",obstacle5);
        break;
      case 6:obstacle.addImage("obstacle",obstacle6);
        break;
    }
    obstacle.scale=0.5; 
    obstacleGroup.add(obstacle);
    }
}

function reset(){
  
  gameState="play";  
  gameOver.visible=false;
  restart.visible=false;  
  trex.changeAnimation("run",trexImage);  
  if(localStorage["highestScore"]<score){
   localStorage["highestScore"]=score;  
  }
  score=0;  
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
}
 