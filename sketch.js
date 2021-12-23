let cronos;
let cronos_Dec;
var digitData;
var ticMin;
var glitch;




function preload(){
  cronos = loadModel('obj/Cronos_02a.obj');
  cronos_Dec = loadModel('obj/Cronos_02a_dec.obj');
  digitData = loadSound('sound/digitSound01.mp3');
  ticMin = loadSound('sound/ticMin.mp3');
  glitch = loadSound('sound/glitch.mp3');
}



function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  digitData.play();
  digitData.setVolume(0.1);
  

 
}

function draw() {
  background(0);
  when();
  ambientLight(100);
  translate(0,0,-500);
  ambientLight(100);
  noStroke();
  let d = new Date();

  let hr = d.getHours();
  let min = d.getMinutes();
  let sec = d.getSeconds();
  let mill = d.getMilliseconds();

  let dhr = hr;
  let dmin = min;
  let dsec = sec;

  sec += mill/1000;
  min += sec/60;
  hr += min/60;

  
  if (dsec < 10) {
    dsec = "0" + dsec;
  }
  if (dmin < 10) {
    dmin = "0" + dmin;
  }
  if (dhr % 12 == 0) {
    dhr = "12";
  }
  else if ((dhr % 12) < 10) {
    dhr = "0" + (dhr % 12);
  }
 
  push();
  fill(0);
  let minAngle = map(min, 0, 60, 0, 360);      //minute
  let secAngle = map(sec, 0, 60, 0, 360);       //second
  translate(20,0,-625);
  rotateZ(minAngle*10);
  model(cronos_Dec);
  pop();
  
  push();
  fill(0,0,random(200,240));
  
  translate(0,0,-650);
  rotateZ(minAngle);
  model(cronos);
  pop();

  push();
  fill(0,random(150,200),0);
  let hourAngle = map(hr % 12, 0, 12, 0, 360);    //hour
  translate(-50,0,-700);
                        
  rotateZ(hourAngle);
  model(cronos); 
  pop();
  
  
}

function when() {
  
  let s = second();
  let ms = millis();
  let m = minute();
  if (m == 0 && s==0) {
    digitData.pause();
    glitch.play();
    glitch.playMode('untilDone');
    digitData.play(1);
  }
  else if (s == 0) {
    digitData.pause();
    ticMin.play(1);
    ticMin.playMode('untilDone');
    digitData.play(1);
    
  }  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
} 

function mousePressed() {
  //save();
}

  
