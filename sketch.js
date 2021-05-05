var mario, bg, ob, obImg, obGroup;
var cloud, cloudImg, cGroup;
var bush, bushImg, bGroup;

function preload(){
  bgImg = loadImage("/Images/bg1.jpg");
  m_running = loadAnimation("/Images/m1.png","/Images/m2.png","/Images/m3.png","/Images/m4.png","/Images/m5.png");
  obImg = loadImage("/Images/ob.PNG");
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

 cloud = createSprite(500,100,202,0);
 cloud.addImage(cloudImg);
 cloud.scale=1.2;

 bush = createSprite(700,525,20,20);
 bush.addImage(bushImg);
 bush.scale = 0.55;

 obGroup = new Group();  
 cGroup = new Group();
 bGroup = new Group();
}

function draw(){
  background("yellow");

  camera.position.x = mario.x+500;
  camera.position.y = mario.y-150;
  mario.velocityX = 5;

  if (mario.x+300 > bg.x){
    bg.x = mario.x + bg.width/2-150;
  }

  drawSprites();
}