//Added different sprites - monster, shadow and teardop
//Monster follows the position of the mouse

//play library referenced from https://molleindustria.github.io/p5.play/examples/index.html
//Referenced the out of bonds idea from Speech library Example 5 Continuous Recognition https://github.com/IDMNYU/p5.js-speech

var monster, shadow, teardrop;

function setup()
{
	// graphics stuff:
	createCanvas(windowWidth, windowHeight);

	//create all animations here
	shadow = createSprite(width/2, height/2);
	shadow.addImage(loadImage('assets/monster-grey.png'));

	monster = createSprite(600, 200);
	monster.addAnimation('normal', 'assets/monster1.png', 'assets/monster2.png');

	teardrop = createSprite(width/2, height/2);
	teardrop.addAnimation('normal', 'assets/teardrop1.png', 'assets/teardrop2.png');
}

function draw()
{
	animate();
}

function animate() {
	background(240, 240, 240);

	//follow the position of mouseX and mouseY
	monster.position.x = mouseX;
	monster.position.y = mouseY;

	//use monster to push away teardrop
	monster.displace(teardrop);

	//if the monster overlaps the shadow and the user clicks using mouse, add an image over the shadow
	if(monster.overlap(shadow)) {
    	if(mouseIsPressed) {
			shadow.addImage(loadImage('assets/monster1.png'));
		}
	}

	//If the teardrop moves out of bonds (canvas width and height), then put it back into the canvas
	if (teardrop.position.x > width + 100) teardrop.position.x = 125;
	if (teardrop.position.x < -100) teardrop.position.x = width - 125;
	if (teardrop.position.y > height + 100) teardrop.position.y = 125;
	if (teardrop.position.y < -100) teardrop.position.y = height - 125;

	//load all animations
	drawSprites();
}


