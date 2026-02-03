let donutX, donutY;
let flavorState = 0;
let score = 0;
let timer= 15;

function setup() {
  var myCanvas=createCanvas(400, 400);
  myCanvas.parent("game1");
  makeDonut();
  textFont("Arial Rounded MT Bold");
}

function draw() {
  background(0);

  //timer
   textAlign(CENTER, CENTER);
  fill("white");
  textSize(30);
  text("Time:"+ timer, 330, 40);
  
  //timer
  if (timer == 0){
    gameOverScreen();
        noLoop();
      }
    
   if (frameCount % 60 == 0 && timer > 0) { timer --;
  }
  
//donut
fill(donutColor);
circle(donutX, donutY, 90);
fill(0);
circle(donutX, donutY, 35);

fill(255);
textSize(35);
text("FLAVORS:" + score, 110, 35);
textSize(20);
text("Click the donut!", 110, 65);
}

function mousePressed(){
  let d = dist(mouseX, mouseY, donutX, donutY);
  if (d < 55){
    score = score + 1;
    changeFlavor();
    
    if(score % 1===0){
      donutX = random(80, width - 80);
      donutY = random(80, height - 80);
    }
  }
}

function makeDonut(){
  donutX = width / 2;
  donutY = height / 2;
  changeFlavor();
}

function changeFlavor(){
  
  if(flavorState === 0){
    donutColor = color(245, 230, 200); //vanilla
    flavorState = 1;
  }
  
  else if (flavorState === 1){
    donutColor = color(120, 80, 50); //chocolate
    flavorState =2;
  }
  else {
    donutColor = color(255, 170, 190); //strawberry
    flavorState = 0;
  }
  
}

function gameOverScreen(){
  background("black");
  fill("white");
  textAlign(CENTER, CENTER);
  textSize(50);
  text("GAME OVER", width /2, height /2 -20);
  textSize(20);
  text("final points:" + score, width /2, height / 2 + 15);
}