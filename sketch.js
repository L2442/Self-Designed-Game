var mario, bg, tower, towerGroup;
var ob, obGroup, obImg;
var iTower, iTower2;
var cloud, cloudImg, cGroup;
var bush, bushImg, bGroup;
var iGround;

function preload(){
  bgImg = loadImage("/Images/bg1.jpg");
  m_running = loadAnimation("/Images/m1.png","/Images/m2.png","/Images/m3.png","/Images/m4.png","/Images/m5.png");
  obImg = loadImage("/Images/ob.png");
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

 iTower2 = createSprite(0,0,0,0);

 iGround = createSprite(mario.x, mario.y+90,height,5);
 iGround.velocityX = 5;
 iGround.visible = false;

 /*cloud = createSprite(500,100,202,0);
 cloud.addImage(cloudImg);
 cloud.scale=1.2;*/

 
 obGroup = new Group();
 towerGroup = new Group();  
 bGroup = new Group();
}

function draw(){
  background(rgb(94, 145, 254));

  camera.position.x = mario.x+500;
  camera.position.y = mario.y-150;
  mario.velocityX = 5;

  if (mario.x+300 > bg.x){
    bg.x = mario.x + bg.width/2-150;
  }
  mario.velocityY = 0;
  if(keyDown("SPACE")){
    mario.velocityY = -17;
  }
  mario.velocityY = mario.velocityY+4;
  mario.collide(iGround);
  mario.collide(iTower2);
  /*if(iTower.isTouching(mario)){

  }*/

  spawnBushes();
  spawnObstacles();
  spawnTowers();

  drawSprites();
}

function spawnBushes(){
  if(frameCount%120 === 0){
  bush = createSprite(mario.x+width,525,20,20);
  bush.x = Math.round(random(mario.x+width, mario.x+width+800));
  bush.addImage(bushImg);
  bush.scale = 0.55;
  mario.depth = bush.depth;
  mario.depth = mario.depth+1;
  bush.lifetime = width/bush.velocityX;
  bGroup.add(bush);
  }
}

function spawnObstacles(){
  if(frameCount%120 === 0){
    ob = createSprite(mario.x+width,height-150,20,20);
    ob.x = Math.round(random(mario.x+width, mario.x+width+800));
    ob.addImage(obImg);
    ob.scale = 0.15;
    ob.lifetime = width/ob.velocityX;
    obGroup.add(ob);
  }
  
}

function spawnTowers(){
  if(frameCount%120 === 0){
    tower = createSprite(mario.x+width, height-135,20,20);
    tower.addImage(towerImg);
    tower.x = Math.round(random(mario.x+width, mario.x+width+800));
    tower.depth = tower.depth;
    iTower = createSprite(tower.x-34, tower.y+10, 10, 100);
    iTower.collide(mario);
    iTower2 = createSprite(tower.x+3, tower.y-50, 80, 10);
    tower.scale = 1.5;
    tower.lifetime = width/tower.velocityX;
    towerGroup.add(tower);
  }
}