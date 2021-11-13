// Use the Sound and Play library
// Made animation play when user hovers
// Added sound effect to loop while user hovers over a specific ghost

// Boo sound file referenced from
//https://freesound.org/people/eben-frostey/sounds/592619/
// Whistle sound file referenced from
//https://freesound.org/people/Robinhood76/sounds/66784/
// Laugh sound file referenced from
//Background image taken from 
// https://www.buzzfeed.com/ashleymcgetrick/adorable-free-phone-backgrounds?utm_term=.sqXoeM7n6J&sub=4149369_7954872&epik=dj0yJnU9VV9JOF9hY2xlaFA3eGQxUVZ6YWVVZUpkNGcyRmREQ1ImcD0wJm49UWdMMXRfUU5TNU5JLWs4MWVFbkxRQSZ0PUFBQUFBR0dOaFhR


var bg;
var ghost, ghostLeft, ghostRight;
var booSound, whistleSound, laughSound;
var shift = 400;

function preload() {
	bg = loadImage("assets/bg-art.jpg");

	ghost = loadAnimation('assets/ghost1.png', 'assets/ghost2.png');
	ghostLeft = loadAnimation('assets/ghost-left1.png', 'assets/ghost-left2.png');
	ghostRight = loadAnimation('assets/ghost-right1.png', 'assets/ghost-right2.png');

	booSound = createAudio("assets/cartoon-boo.wav");
	whistleSound = createAudio("assets/whistle.wav");
	laughSound = createAudio("assets/laugh.ogg");

}

function setup() {
	// graphics stuff:
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	animate();
	// why draw when you can talk?
}

function animate() {
	background(bg);

	//if the user hovers over thw center ghost play animation
	if ((mouseX >= (width / 2 - 125)) && (mouseX <= (width / 2 + 125)) && (mouseY >= height / 2 - 125) && (mouseY <= height / 2 + 125)) {
		ghost.play();

		booSound.noLoop();
		booSound.play();
	} else if ((mouseX >= (width / 2 - shift) - 125) && (mouseX <= (width / 2 - shift) + 125) && (mouseY >= height / 2 - 125) && (mouseY <= height / 2 + 125)) {
		//if the user hovers over the left ghost play animation
		ghostLeft.play();

		whistleSound.noLoop();
		whistleSound.play();
	} else if ((mouseX >= (width / 2 + shift) - 125) && (mouseX <= (width / 2 + shift) + 125) && (mouseY >= height / 2 - 125) && (mouseY <= height / 2 + 125)) {
		//if the user hovers over the right ghost play animation
		ghostRight.play();

		laughSound.noLoop();
		laughSound.play();
	} else {
		//stop animating
		ghost.stop();
		ghostLeft.stop();
		ghostRight.stop();

		//stop sound
		booSound.stop();
		whistleSound.stop();
		laughSound.stop();
	}

	animation(ghost, width / 2, height / 2);
	animation(ghostLeft, width / 2 - shift, height / 2);
	animation(ghostRight, width / 2 + shift, height / 2);
}