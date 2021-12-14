//Base template taken from Mark Shufflebottom Interactive Media: Motion Week 5 Activity
//Flower image referenced from https://www.subpng.com/png-3r6zmr/
//Classes with particle systems referenced from Daniel Siffman - https://thecodingtrain.com/learning/nature-of-code/4.4-image-textures.html
//Added posenet, images, and random generation of images

let shapes = [];
let drawing = false;
let flower, flowerRight;
let timer;

let offsetX, offsetY;

function preload() {
    //Flower image referenced from https://www.subpng.com/png-3r6zmr/
    for (let i = 0; i < 6; i++) {
        shapes[i] = loadImage('img/flower' + (i + 1) + ".png");
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    //background(255);

    flower = new Group(width / 2, height / 2);
    flowerRight = new Group(width / 2, height / 2);
}


function modelReady() {
    select('#status').html('Model Loaded');
}

function draw() {
    clear();
    //background(255);

    flower.add(1);
    flower.updatePosition(mouseX, mouseY);
    flower.update();
    flower.show();
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
        this.alpha -= 25;
    }

    show() {
        push();
        imageMode(CENTER);
        
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
            for (let i = 0; i < num; i++) {
                this.flowers.push(new Flower(this.position.x, this.position.y));
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