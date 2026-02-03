let state = "WAIT"; 
let message = "Wait...";
let score = 0;

let changeAt = 0;
let startGoTime = 0;

let baseGoDuration = 500;
let minGoDuration = 120;
let goDuration = baseGoDuration;

let started = false;
let startButton;

function setup() {
  var myCanvas = createCanvas(400, 400);
  myCanvas.parent("game3");
  textFont("Arial Rounded MT Bold");
  textAlign(CENTER, CENTER);
  newRound();
  
    startButton = createButton("START");
  startButton.position(width / 2 +300, height / 2 -25);
  startButton.mousePressed(() => {
    started = true;
    startButton.hide();
    newRound();
  });
}

function draw() {

   if (!started) {
    background(30);
    fill(255);
    textSize(36);
    text("Red Light,\nGreen Light", width / 2, height / 2 - 40);
    return;
  }
  
  if (state === "WAIT" && millis() > changeAt) {
    state = "GO";
    message = "CLICK!";
    startGoTime = millis();
  }

  if (state === "GO" && millis() > startGoTime + goDuration) {
    state = "RESULT";
    score = 0;
    message = "Too slow!";
    setTimeout(newRound, 700);
  }

  // backgrouond
  if (state === "WAIT") background(200, 60, 60);
  else if (state === "GO") background(60, 200, 120);
  else background(255); // too slow background

  fill(0);
  textSize(22);
  text("SCORE: " + score, width / 2, 50);

  textSize(46);
  text(message, width / 2, height / 2);

  textSize(16);
  text("Click fast when it turns green.", width / 2, height - 50);
}

function mousePressed() {
  if (state === "RESULT") return;

  if (state === "WAIT") {
    state = "RESULT";
    score = 0;
    message = "Too early!";
    setTimeout(newRound, 700);

  } else if (state === "GO") {
    state = "RESULT";
    score++;
    message = "Nice!";
    setTimeout(newRound, 700);
  }
}

function newRound() {
  state = "WAIT";
  message = "Wait...";

  goDuration = baseGoDuration - score * 30;
  if (goDuration < minGoDuration) goDuration = minGoDuration;

  changeAt = millis() + random(500, 1000);
}