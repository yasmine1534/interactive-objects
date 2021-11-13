// Created button to play and pause sound in function playSound()
// Added cSize and changed the ellipse to a stroke
// Loaded songs using arrays
// Added skip to next and previous song functionality

//All MP3 files, A Silent Voice soundtrack referenced from
//All rights reserved to the Kyoto Animation
//https://www.youtube.com/playlist?list=PLh7nidOa7uu1U5OzSa3snNJlincuIYNQd

//Amp and vol referenced from Daniel Shiffman - The Coding Train
//https://www.youtube.com/watch?v=jEwAMgcCgOA

var songFiles = ["assets/aSilentVoice-lit.mp3", "assets/aSilentVoice-van.mp3", "assets/aSilentVoice-lvs.mp3", "assets/aSilentVoice-bft.mp3", "assets/aSilentVoice-acc.mp3"];
//place to store songs later check
var songs = [];
var songIndex = 0;
//check which song is currently playing
var currentSong;
var amp, vol;

//grab variables from HTML
var soundButton = document.getElementById("soundButton");
var soundIcon = document.getElementById("soundIcon");

function preload() {
	for(let i = 0; i < songFiles.length; i++) {
		//load all song files
		songs[i] = loadSound(songFiles[i]);
	}
}

function setup()
{	
	createCanvas(windowWidth, windowHeight);
	background(240, 240, 240);
	amp = new p5.Amplitude();

	console.log("songs array: ", songs);
}

function draw()
{	
	let cSize = 1800;
	vol = amp.getLevel();
	fill(240, 240, 240);
	stroke(0);
	
	console.log("current index: " + songIndex);

	if (vol * cSize <= 200) {
		//if the size of the circle ring is small color it light blue
		stroke(154, 183, 206);
	} else if ((vol * cSize > 200) && (vol * cSize < 400)) {
		//if the size of the circle ring is mid range color it blue
		stroke(119, 147, 163);
	} else{
		//if the circle ring is bigger than the above then color it with dark blu
		stroke(71, 108, 126);
	}
	//draw the circle
	ellipse(width/2, height/2, vol * cSize, vol * cSize);
}

function playSong() {		
	currentSong = songs[songIndex];

	if (!currentSong.isPlaying()) {
		currentSong.play();
		
		//show the pause icon
		soundIcon.innerHTML = "pause";
		//change icon color to red
		soundIcon.style.color = "#E26A6A";
	} else {
		currentSong.pause();
		//show the play icon
		soundIcon.innerHTML = "play_arrow";
		//change icon color back to green
		soundIcon.style.color = "#6DC175";
		//background(240, 240, 240);
	}
}

function nextSong() {
	background(240, 240, 240);
	//stop the song that is currently playing
	currentSong.stop();

	//skip to the next song
	songIndex++;

	//if it reaches the end of the array, start from the beginning again
	if (songIndex > (songs.length - 1)) {
		songIndex = 0;
	}

	playSong();
}

function previousSong() {
	background(240, 240, 240);
	currentSong.stop();

	//skip to the previous song
	songIndex--;

	if (songIndex < 0) {
		songIndex = songs.length - 1;
	}

	playSong();
}