var PLAY=1;
var END=0;
var gameState=1;

var sword,fruit ,monster,fruitGroup,enemyGroup, score,r,randomFruit;
var swordImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage ,mons , knifeSound ,position;

function preload(){

  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  weapon = loadImage("sword.png");
  gameOverImage = loadImage("gameover.png")
  knifeSound = loadSound("knifeSwooshSound.mp3");
  mons = loadAnimation("alien1.png","alien2.png")
  OverSound = loadSound("gameover.mp3");
}



function setup(){
    createCanvas(400,400);    
  
    fruitGroup = new Group();
    enemyGroup=createGroup();
       
     score = 0;
  
     sword = createSprite(100,100,10,10);
     sword.addImage("cutting",weapon);
     sword.scale = 0.5;
  

  

 }

function draw(){
background(rgb(100,200,100));
 
   if(gameState===PLAY){
     
      fruits();
      Enemy();
     
         sword.y=World.mouseY;
         sword.x=World.mouseX;
   
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score=score+1;
      knifeSound.play();
    }
     
      if(enemyGroup.isTouching(sword)){
        gameState=END;
        OverSound.play();
        
          gameOver = createSprite(200,100,250,150);
  gameOver.addImage(gameOverImage);
        
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        
        sword.addImage(gameOverImage);
        sword.x=200;
        sword.y=200;
        

      }
   }
     drawSprites();   
 

   
  
text("Score : "+ score,300,30);
}

function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving" ,mons);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(10+(score/10));
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
    
       monsposition=Math.round(random(1,2));
   if(monsposition==1){
     monster.velocityX = (10+(score/10));
     monster.x = 0;
   }
    else
      {
      if(monsposition==2){
         monster.velocityX= -(10+(score/10));
      monster.x = 400;
    }
      }
   
      
    }
  
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
    
    position=Math.round(random(1,2));
   if(position==1){
     fruit.velocityX = (5+(score/10));
     fruit.x = 0;
   }
    else
      {
      if(position==2){
         fruit.velocityX= -(5+(score/10));
      fruit.x = 400;
    }
      }
   
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}