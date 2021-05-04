var mario, bg, ob, obImg, obGroup;

function preload(){
  bgImg = loadImage("/Images/bg.png");
  m_running = loadAnimation("/Images/m1.png","/Images/m2.png","/Images/m3.png","/Images/m4.png","/Images/m5.png");
  obImg = loadImage("/Images/ob.PNG");
}

function setup(){
 createCanvas(windowWidth, windowHeight);
 bg = createSprite(300,310,400,20);
 bg.addImage("bi",bgImg);
 bg.scale = 1.2;
 bg.x = bg.width /2;
 mario = createSprite(200,480,20,20);
 mario.addAnimation("run", m_running); 
 obGroup = new Group();  
}

function draw(){
  background("yellow");

  camera.position.x = mario.x+500;
  camera.position.y = mario.y-150;
  mario.velocityX = 5;

  if (mario.x > bg.x){
    bg.x = mario.x + bg.width/2-150;
  }

  drawSprites();
}