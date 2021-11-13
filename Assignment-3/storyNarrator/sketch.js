//Example of narrating a story
//Changed the speech accent, pitch and rate
//Added animations using the play library, the animation changes depending on which page the user is at
//Added counter, next button, and previous button functionality
//Used JQuery to grab elements from HTML

//Code includes play, sound and speech library
//play library referenced from https://molleindustria.github.io/p5.play/examples/index.html
//Base template referenced from Speech library https://github.com/IDMNYU/p5.js-speech/blob/master/examples/03callbacks.html
//Background music taken from https://www.youtube.com/watch?v= (No Copyright Music) Gymnopedie No. 3 by Wahneta Meixsell

var monster, animation;
var speech;
var bgMusic;
var setVoice = false;

var voiceText = [
	" ",
	"Cail the Frog works hard to please people. Communicating with clients, designing websites, code, you name it, Cail will perform his best.",
	"One day Cail was tasked with a new job. His boss asks him to work on a project that was initially meant for 3 people.",
	"The thrill of hearing this news soon turned to misery. He knows that accepting this task would burn him out, but he also doesn't want to dissapoint his boss. Cail is in a dilemma, what should he do?",
	"Cail gets overwhelmed and decides to give an excuse to his boss on the spot. He can tell that his boss doesn't buy the idea but leaves Cail alone.",
	"The feeling of disappointing his boss hurts him badly. He is distracted from work and his performance drops slowly but surely.",
	'"Are you okay? You seem out of it lately" His coworkers ask. Cail pondered for a while, and realized things were not okay.',
	'"Why can I not manage things properly?" Cail wondered.',
];
var counter = 0;

function preload() {
	bgMusic = loadSound("assets/gymnopedie-no-3.mp3");
}

function setup() {
	// graphics stuff:
	createCanvas(windowWidth, windowHeight);

	speech = new p5.Speech('Google UK English Female', speechLoaded); // new P5.Speech object
	speech.setPitch(1.1);
	//voice speed
	speech.setRate(0.9);

	//add different types of animation to change during the storyline
	monster = createSprite(width / 2, (height / 2) - 100);
	animation = monster.addAnimation('work', 'assets/Monster-work1.png', 'assets/Monster-work2.png');
	monster.addAnimation('happy', 'assets/Monster-happy1.png', 'assets/Monster-happy2.png');
	monster.addAnimation('okay', 'assets/Monster-okay1.png', 'assets/Monster-okay2.png');
	monster.addAnimation('sad', 'assets/Monster-sad1.png', 'assets/Monster-sad2.png');

	bgMusic.setVolume(0.2);
	bgMusic.play();
}

function draw() {
	//Remove comment to check the list of voices available
	//speech.listVoices();

	background(255, 250, 230);

	animate();

	if (counter <= 1) {
		//if it is in the first page hide the back button
		$("#backButton").hide();
	} else if (counter > 1) {
		//show back button after 1st page
		$("#backButton").show();
	} else {
		//make sure to not make the counter go to negative/undefined numbers
		counter = 0;
	}

	//statement to hide the next button  and show home in the last page
	if (counter == (voiceText.length - 1)) {
		$("#mainButton").hide();
		$("#home").show();
	} else {
		$("#mainButton").show();
		$("#home").hide();
	}

	//if statement to change animations - work, happy face, okay face to sad face
	if (counter == 0) {
		monster.changeAnimation('work');
	} else if (counter >= 1 && counter <= 2) {
		monster.changeAnimation('happy');
	} else if (counter >= 3 && counter <= 4) {
		monster.changeAnimation('okay');
	} else {
		monster.changeAnimation('sad');
	}

	console.log(counter);
	//check length of array
	console.log(voiceText.length);
}

function speechLoaded() {
	console.log("Loaded speech narration");
}

function previousPage() {
	//if the user presses the back button, then go to previous page and narrate that part
	counter--;
	//change the inner HTML based on the voiceText array
	$('#storyLine').html(voiceText[counter]);
	speech.stop();
	//vocalize the words
	speech.speak(voiceText[counter]);
}

function togglePage() {
	//if the user presses next, continue on to the next page
	counter++;

	//change HTML elements
	$("#title").hide();
	$('.description').css('margin-top', "40px");
	$("#mainButton").html("Next");

	//change description
	$('#storyLine').html(voiceText[counter]);
	//stop the current narration and continue onto the next
	speech.stop();
	speech.speak(voiceText[counter]);
	//console.log(voiceText[counter]);
}

function animate() {
	//load all animations * important
	drawSprites();
}

function playSound() {
	//mute background sound functionality
	if (bgMusic.isPlaying()) {
		bgMusic.pause();
		$("#volumeIcon").html("volume_off");
	} else {
		bgMusic.play();
		$("#volumeIcon").html("volume_up");
	}
}

function homePage() {
	counter = 0;
	speech.stop();

	$("#title").show();
	$('.description').css('margin-top', "0");
	$('#storyLine').html("The story of a wrong decision.");
	$("#mainButton").html("Start");

	bgMusic.stop();
	bgMusic.play();
	playSound();
}