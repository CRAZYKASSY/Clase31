const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;

var bg_img;
var food;
var rabbit;

var button;
var bunny;
var blink,eat,sad;
var eatanimation;
var sadanimation;


function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');;
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eatanimation = loadAnimation ("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sadanimation = loadAnimation ("sad_1.png","sad_2.png","sad_3.png");
  eatanimation.looping = false;
  eatanimation.playing = true;
  sadanimation.looping = false;
  sadanimation.playing = true;

}

function setup() {
  createCanvas(500,700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;
  
  let options = {
    isStatic:true
   };
 
 ground2 = Bodies.rectangle (200,690,600,20,options);
 World.add (world,ground2);

  button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);
  

  blink.frameDelay = 20;
  eatanimation.frameDelay = 20;
  sadanimation.frameDelay = 20;

  bunny = createSprite(230,620,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation ("eating",eatanimation);
  bunny.addAnimation ("sad",sadanimation);
  bunny.changeAnimation ("blinking");
  
  rope = new Rope(12,{x:245,y:30});
  ground = new Ground(200,690,600,20);
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,490,690);

 if (fruit != null){
  image(food,fruit.position.x,fruit.position.y,70,70); 
 }

  rectMode (CENTER);
  rect (ground2.position.x, ground2.position.y,600,20);
  rope.show();
  Engine.update(engine);
  ground.show();

   drawSprites();

   if (collide (fruit,bunny)){
     bunny.changeAnimation ("eating");
   }
   if (collide (fruit,ground2)=== true){
    bunny.changeAnimation ("sad");
    
   }
}

function drop()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function collide (body,sprite){
 if (body!= null ){
   var distance = dist(body.position.x,body.position.y,sprite.position.x, sprite.position.y);
   if (distance <= 80){
     World.remove (world,fruit);
     fruit = null;
     return  true; 
   }
   else {
     return  false; 
   }
 }
}
