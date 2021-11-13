// Base template referenced from Daniel Shiffman The Coding Train
// Moved variables outside of function setup to work globally
// Added gotSpeech as a function outside of setup
// Changed createP to text
//Added a reset when y reaches to the height of the canvas

// Daniel Shiffman
// http://codingtrain
// http://patreon.com/codingtrain
// Code for: https://youtu.be/q_bXBcmfTJM

 // new P5.SpeechRec object

var continuous = true;
var interim = false;
var speechRec;
var y = 0;

	function setup()
	{
		// graphics stuff:
		createCanvas(800, 400);
		background(255, 255, 255);
		var language = navigator.language || 'en-US';
		speechRec = new p5.SpeechRec(language, gotSpeech);

		speechRec.start(continuous, interim);
	}

	function draw()
	{
		// why draw when you can talk?
	}

	function gotSpeech()
	{
		//background(255, 255, 255);
		if (speechRec.resultValue) {
			text(speechRec.resultString, 20, y);
			y += 75;
		  }

		  if (y > height) {
			//if text goes over the canvas height then reset to the top
			background(255, 255, 255);
			y = 0;
			console.log(y);
		}
	}
