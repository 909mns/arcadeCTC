let stars = [];
let starCount = 10;

let basketX;
let basketW = 90;
let basketY;

let score = 0;

  function setup() {
  var myCanvas = createCanvas(400, 400);
  myCanvas.parent("game2");
  textFont("monospace");
  basketY = height -35;
    
    for (let i = 0; i < starCount; i++){
      stars.push(makeStar());
    }
}

function draw() {
  background(0);
  
  basketX = constrain(mouseX,basketW / 2, width - basketW / 2);
  
  fill(255);
  textSize(18);
  text("POINTS:" + score, 10, 25);
  
  //basket
  noStroke();
  fill(255);
  rectMode(CENTER);
  rect(basketX, basketY, basketW, 18, 6);
  
  for(let i = 0; i < stars.length; i++){
    let s = stars[i];
    
    //move
    s.y += s.speed;
    
    //draw
    fill(s.col);
    circle(s.x, s.y, s.r);
    
    //catch
    let caught =
        s.y > basketY - 20 &&
        s.y < basketY + 10 &&
        s.x > basketX - basketW / 2 &&
        s.x < basketX + basketW / 2;
    
    if(caught) {
      score++;
      stars[i] = makeStar(); //reset
    }
    
      if(s.y > height + 20){
        gameOverScreen();
        noLoop();
      }
  }
}

function makeStar(){
  return{
    x: random(30, width - 50),
    y: random(-1200, -100),
    r: random(10, 18),
    speed: random(1, 2.0)+score*0.15,
    col: color(random(180,255), random(180, 255), random(180, 255))
      
  };
}
    
function gameOverScreen(){
  background(0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(28);
  text("GAME OVER", width /2, height /2 -20);
  textSize(16);
  text("final points:" + score, width /2, height / 2 + 15);
}
