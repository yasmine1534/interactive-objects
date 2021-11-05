/* 
November 2021 - Yasmine Samir Abdelrahman
Base template taken from Interactive Obecct & Environments class posenet example
- Added the leftEar and rightEar position of posenet
- Added blush image
- Determined the x location of the left blush - which is the mid point of the user's left ear and left eye
- Lisewise for the right blush
- The y position of both blush iamges are then detemined by the y position of the nose
- Adjusted image mode to center
*/

// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];
let r, g, b;

function setup() {
  createCanvas(640, 480);
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

  r = random(0, 255);
  g = random(0, 255);
  b = random(0, 255);
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function mousePressed(){
  r = random(0,255);
  g = random(0,255);
  b = random(0,255);

  console.log("Random color is generated!");
}

function draw() {
  image(video, 0, 0, width, height);

  // stroke(255, 255, 255);
  // strokeWeight(2);

  //create transparent circles for now, only add color to points for testing purposes
  noStroke();
  // noFill();

  // For one pose only (use a for loop for multiple poses!)
  if (poses.length > 0) {
    const pose = poses[0].pose;
      // console.log(pose);

    // Create a pink ellipse for the nose
    //fill(213, 0, 143);
    fill(r, g, b);
    const nose = pose.nose;
    ellipse(nose.x, nose.y, 30, 30);
  }
}