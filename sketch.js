var mario, bg, tower, towerGroup;
var ob, ob1, ob2, obGroup, obImg, iOb, IobGrp;
var bb, bbImg, bbGrp;
var iTower, iTowerGrp;
var cloud, cloudImg, cGroup;
var bush, bushImg, bGroup;
var iGround;
var randomNum;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var hitScore = 2;
var fc;

function preload(){
  bgImg = loadImage("/Images/bg1.jpg");
  bbImg = loadImage("/Images/ob.png");
  m_running = loadAnimation("/Images/m1.png","/Images/m2.png","/Images/m3.png","/Images/m4.png","/Images/m5.png");
  m_crash = loadImage("/Images/m1.png");
  obImg = loadAnimation("Images/BlueOb.png", "Images/blueob1.png");
  flatOb = loadImage("/Images/flatob.png");
  towerImg = loadImage("/Images/tower.PNG");
  cloudImg = loadImage("/Images/cloud.png");
  bushImg = loadImage("/Images/bush.png");
}

function setup(){
 createCanvas(windowWidth, windowHeight);
 bg = createSprite(600,330,400,20);
 bg.addImage("bi",bgImg);
 bg.scale =1.2;
 bg.x = bg.width /2;

 mario = createSprite(200,493,20,20);
 mario.addAnimation("run", m_running); 

 iGround = createSprite(mario.x, mario.y+90,height,5);
 iGround.visible = false;
 
 mario.setCollider("rectangle",0,0,mario.width, mario.height);
 mario.debug = true;

 hitScore = 2;
 
 obGroup = new Group();
 towerGroup = new Group(); 
 bbGrp = new Group(); 
 bGroup = new Group();
 iTowerGrp = new Group();
 iObGrp = new Group();
}




function draw(){
  background(rgb(94, 145, 254));

  camera.position.x = mario.x+500;
  camera.position.y = mario.y-150;


  if(gameState === PLAY){
  mario.velocityX = (5+score/120);
  iGround.velocityX = mario.velocityX;
  score = score+Math.round(getFrameRate()/60);
  if (mario.x+300 > bg.x){
    bg.x = mario.x + bg.width/2-150;
  }
  mario.velocityY = 0;
  if(keyDown("SPACE")){
    mario.velocityY = -20;
  }
  mario.velocityY = mario.velocityY+5;
  mario.collide(iGround);

  randomNum = Math.round(random(1,3));
  if(randomNum === 1){
    spawnObstacles();
  }

  if(randomNum === 2){
    spawnTowers();
  }

  if(randomNum === 3){
    spawnbb();
  }

  spawnBushes();
  mario.collide(towerGroup);
  mario.collide(iObGrp);
  }

  /*if(iTowerGrp.isTouching(mario) || obGroup.isTouching(mario)){
    hitScore = hitScore-1;
  }*/

  if (obGroup.isTouching(mario) || iTowerGrp.isTouching(mario) || bbGrp.isTouching(mario)) {
    fc = frameCount;
  }
  if (fc + 5 === frameCount) {
    hitScore = hitScore-1;
  }

  if(hitScore === 0){
    gameState = END;
  }

  if(gameState === END){
    mario.setVelocity(0,0);
    obGroup.velocityX = 0;
    iTowerGrp.velocityX = 0;
    iObGrp.velocityX = 0;
    towerGroup.velocityX = 0;
    bGroup.velocityX = 0;
    if(keyDown("R")){
      gameState = PLAY;
    }
  }

  drawSprites();
  textSize(20);
  fill("black");
  text("Score: "+score,mario.x+100,mario.y-200);
  text("Life: "+hitScore, mario.x-50, mario.y - 200);
}

function spawnBushes(){
  if(frameCount%140 === 0){
  bush = createSprite(mario.x+width,540,20,20);
  bush.addImage(bushImg);
  bush.scale = 0.4;
  mario.depth = bush.depth;
  mario.depth = mario.depth+1;
  bush.lifetime = width/bush.velocityX;
  bGroup.add(bush);
  }
}

function spawnObstacles(){
  if(frameCount%120 === 0){
    ob = createSprite(mario.x+width,height-100,20,20);
    ob.addAnimation("xyz",obImg);
    ob.scale = 3;
    ob1 = createSprite(mario.x+width, height-150,20,20);
    ob1.addAnimation("xyz", obImg);
    ob1.scale = 3;
    ob2 = createSprite(mario.x+width, height-200,20,20);
    ob2.addAnimation("xyz", obImg);
    ob2.scale = 3;
    iOb = createSprite(mario.x+width, height-250,30,10);
    ob.lifetime = width/ob.velocityX;
    iOb.lifetime = width/ob.velocityX;
    ob1.lifetime = width/ob.velocityX;
    ob2.lifetime = width/ob.velocityX;
    iObGrp.add(iOb);
    obGroup.add(ob1);
    obGroup.add(ob2);
    obGroup.add(ob);
  }
  
}

function spawnTowers(){
  if(frameCount%120 === 0){
    tower = createSprite(mario.x+width, height-135,20,20);
    tower.addImage(towerImg);
    tower.depth = tower.depth;
    iTower = createSprite(tower.x-34, tower.y+10, 10, 100);
    tower.scale = 1.5;
    tower.lifetime = width/tower.velocityX;
    iTower.lifetime = width/iTower.velocityX;
    towerGroup.add(tower);
    iTowerGrp.add(iTower);
  }
}

function spawnbb(){
  if(frameCount%190 === 0){
    bb = createSprite(mario.x+width, height-160,20,20);
    bb.addImage(bbImg);
    bb.scale = 0.2;
    bb.lifetime = width/bb.velocityX;
    bbGrp.add(bb);
  }
}