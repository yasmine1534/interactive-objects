//Iteration 1 of low fidelity prototype
//Smoke particles follows the X and Y pos of the mouse
//Color changes according to map constraints

// Particle Systems with Image Textures (Image Texture)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/pUhv2CA0omA
// https://thecodingtrain.com/learning/nature-of-code/4.4-image-textures.html

let emitter;
let img;

// let colors = [
//   color(),
//   color()
// ]

function preload() {
  img = loadImage('images/texture32.png');
  //img = loadImage("butterfly.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  emitter = new Emitter(width / 2, height / 2);
  background(0);
}

function draw() {
  clear();
  background(0);
  //blendMode(ADD);

  let force = createVector(0.1, 0);
  emitter.applyForce(force);

  // let dir = map(mouseX, 0, width, -0.1, 0.1);
  // let wind = createVector(dir, 0);
  // emitter.applyForce(wind);

  emitter.updatePosition(mouseX, mouseY);

  // fill(255, 255, 255);

  emitter.emit(4);
  emitter.show();
  emitter.update();
}