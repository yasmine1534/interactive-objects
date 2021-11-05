/* 
November 2021 - Yasmine Samir Abdelrahman
Base template taken from Interactive Obecct & Environments class posenet example
- Added preload function to load question image
- Recording position of leftWrist and rightWright
- When leftWrist fits inside the width and height of the video, show image and play sound
- Add delay using millis() for sound
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
let question, notify;
let timer = 0;
let playSound = false;

function preload() {
  question = loadImage("../images/question.png");
}

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

  notify = loadSound("../images/alert.wav");
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function mousePressed(){
  console.log(JSON.stringify(poses));
}

function draw() {
  image(video, 0, 0, width, height);
  let ms = millis();

  // stroke(255, 255, 255);
  // strokeWeight(2);

  noStroke();
  // noFill();

  // For one pose only (use a for loop for multiple poses!)
  if (poses.length > 0) {
    const pose = poses[0].pose;
      //console.log(pose);

    // Create a pink ellipse for the nose
    fill(213, 0, 143);
    const leftWrist = pose.leftWrist;
    ellipse(leftWrist.x, leftWrist.y, 30, 30);

    const rightWrist = pose.rightWrist;
    ellipse(rightWrist.x, rightWrist.y, 30, 30);

    //if the x and y position of the left wrirst fits the screen, show image and play sound
    if (((0 <= leftWrist.x) && (leftWrist.x <= width)) && ((0 < leftWrist.y) && (leftWrist.y <= height))) {
      //display image
      image(question, 0, 0, question.width/5, question.height/5);

      //For every 2 seconds, if sound hasn't been played yet, then play sound
      if ((!playSound) && (ms >= 2000+timer)) {
        notify.play();
        playSound = true;
        //reset timer
        timer = ms;
      }
    } else {
      //if left wrist isn't in screen, reset playSound to false
      playSound = false;
    }
    console.log(playSound);
    console.log(timer);

  }
}