//Base template taken from Mark Shufflebottom Interactive Media: Motion Week 5 Activity
//Flower image referenced from https://www.subpng.com/png-3r6zmr/
//Classes with particle systems referenced from Daniel Siffman - https://thecodingtrain.com/learning/nature-of-code/4.4-image-textures.html
//Added posenet, images, and random generation of images

let shapes = [];
let drawing = false;
let flower, flowerRight;
let timer;

let video;
let poseNet;
let poses = [];
let leftWrist, rightWrist;

let offsetX, offsetY;

function preload() {
    //Flower image referenced from https://www.subpng.com/png-3r6zmr/
    for (let i = 0; i < 6; i++) {
        shapes[i] = loadImage('img/flower' + (i + 1) + ".png");
    }
}

function setup() {
    createCanvas(1080, 720);
    //background(255);

    video = createCapture(VIDEO);
    video.size(width, height);

    // Create a new poseNet method with a single detection
    poseNet = ml5.poseNet(video, {
        outputStride: 8,
        quantBytes: 4
    }, modelReady);
    // This sets up an event that fills the global variable "poses"
    // with an array every time new poses are detected
    poseNet.on('pose', function (results) {
        poses = results;
    });
    // Hide the video element, and just show the canvas
    video.hide();

    flower = new Group(width / 2, height / 2);
    flowerRight = new Group(width / 2, height / 2);
}


function modelReady() {
    select('#status').html('Model Loaded');
}

function draw() {
    clear();
    //background(255);

    //Flip the camera
    translate(width, 0);
    scale(-1, 1);
    image(video, 0, 0, width, height);

    if (poses.length > 0) {
        const pose = poses[0].pose;

        // const leftAnkle = pose.leftAnkle;
        // const rightAnkle = pose.rightAnkle;

        leftWrist = pose.leftWrist;
        rightWrist = pose.rightWrist;

        //ellipse(rightWrist.x, rightWrist.y, 30, 30);
        //emitter.updatePosition(leftWrist.x, height-200);

        //Flowers folloing the left wrist of the user
        if (leftWrist.x > 0 && leftWrist.x < width && leftWrist.y > 0 && leftWrist.y < height) {
            flower.add(1);
            flower.updatePosition(leftWrist.x, leftWrist.y);
            flower.update();
            flower.show();
        }

        //Flowers folloing the right wrist of the user
        if (rightWrist.x > 0 && rightWrist.x < width && rightWrist.y > 0 && rightWrist.y < height) {
            flowerRight.add(1);
            flowerRight.updatePosition(rightWrist.x, rightWrist.y);
            flowerRight.update();
            flowerRight.show();
        }
        // fill(255, 255, 255);
        // ellipse(leftWrist.x, leftWrist.y, 60, 60);
    }
}

// Start of reference from Daniel Shiffman, added image variable and random number generator
class Flower {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.alpha = 255;
        //Pick a random image from 0 to 6
        this.rand = floor(random(0, 6));
        this.img = shapes[this.rand];
        this.sz = random(120, 160);
    }

    finished() {
        return this.alpha < 0;
    }

    update(x, y) {
        this.alpha -= 10;
    }

    show() {
        push();
        imageMode(CENTER);
        // translate(mouseX, mouseY);
        //Slowly fade the opacity of the image
        tint(255, this.alpha);
        image(this.img, this.position.x, this.position.y, this.sz, this.sz);
        pop();
    }
}

class Group {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.flowers = [];
    }

    add(num) {
        //Add a new flower(s)
        //Changed name of function and added frameCount to reduce speed of images being generated
        //frameCount referenced from https://forum.processing.org/two/discussion/13098/how-to-change-the-speed-of-random-images.html
        if (frameCount % 5 == 0) {
            for (let i = 0; i < num; i++) {
                this.flowers.push(new Flower(this.position.x, this.position.y));
            }
        }
    }

    updatePosition(x, y) {
        this.position.set(x, y);
    }

    update() {
        for (let flower of this.flowers) {
            flower.update();
        }

        //Delete the flower once alpha dissapears
        for (let i = this.flowers.length - 1; i >= 0; i--) {
            if (this.flowers[i].finished()) {
                this.flowers.splice(i, 1);
            }
        }
    }

    show() {
        for (let flower of this.flowers) {
            flower.show();
        }
    }
}
//End of reference