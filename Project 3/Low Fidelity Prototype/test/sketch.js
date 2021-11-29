//Iteration 1 of low fidelity prototype
//Smoke particles follows the user's left wrist
//Color changes according to the x and y pos of the user's hand

// Particle Systems with Image Textures (Image Texture)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/pUhv2CA0omA
// https://thecodingtrain.com/learning/nature-of-code/4.4-image-textures.html

let emitter;
let img;

let video;
let poseNet;
let poses = [];

let leftWrist;

// let colors = [
//   color(),
//   color()
// ]

function preload() {
  img = loadImage('images/texture32.png');
  //img = loadImage("butterfly.png");
}

function setup() {
  createCanvas(1080, 720);
  emitter = new Emitter(width / 2, height / 2);
  background(255);

  video = createCapture(VIDEO);
  video.size(width, height);
  
  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, {outputStride:8, quantBytes:4}, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  //clear();
  // background(0);
  //blendMode(ADD);

  translate(width,0);
  scale(-1, 1);
  image(video, 0, 0, width, height);
  

  let force = createVector(0.1, 0);
  emitter.applyForce(force);

  // let dir = map(mouseX, 0, width, -0.1, 0.1);
  // let wind = createVector(dir, 0);
  // emitter.applyForce(wind);

  if (poses.length > 0) {
    const pose = poses[0].pose;
    const nose = pose.nose;

    const leftAnkle = pose.leftAnkle;
    const rightAnkle = pose.rightAnkle;

    leftWrist = pose.leftWrist;
    const rightWrist = pose.rightWrist;

    
    //ellipse(rightWrist.x, rightWrist.y, 30, 30);
    //emitter.updatePosition(leftWrist.x, height-200);
    emitter.updatePosition(leftWrist.x, leftWrist.y);

    // fill(255, 255, 255);
    // ellipse(leftWrist.x, leftWrist.y, 60, 60);
  }

  emitter.emit(4);
  emitter.show();
  emitter.update();
}
