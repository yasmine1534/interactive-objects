/* 
October 2021 - Yasmine Samir Abdelrahman 
Switched the button to sound sensor, the shapes changes size based on the volume of the sensor
The Arduino file that's running is "threeSensorExample"
*/

let osc;

let playing = false;
let serial;
let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas
let splitter;
let diameter0 = 0,
    diameter1 = 0,
    diameter2 = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Get a list the ports available
  // You should have a callback defined to see the results
  serial.list();
  console.log("serial.list()   ", serial.list());

  //////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("COM5");
  /////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////
  // Here are the callbacks that you can register

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);

  // When we some data from the serial port
  serial.on('data', gotData);

  // When or if we get an error
  serial.on('error', gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
}

// We are connected and ready to go
function serverConnected() {
  console.log("Connected to Server");
}

// Got the list of ports
function gotList(thelist) {
  console.log("List of Serial Ports:");
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    console.log(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  console.log("Serial Port is Open");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  console.log(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine(); // read the incoming string
  trim(currentString); // remove any trailing whitespace
  if (!currentString) return; // if the string is empty, do no more
  console.log("currentString  ", currentString); // println the string
  latestData = currentString; // save it for the draw method
  console.log("latestData" + latestData); //check to see if data is coming in
  splitter = split(latestData, ','); // split each number using the comma as a delimiter
  //console.log("splitter[0]" + splitter[0]); 
  //button
  diameter0 = splitter[0]; //put the first sensor's data into a variable
  //potentiometer
  diameter1 = splitter[1];
  //light sensor
  diameter2 = splitter[2];
}

// We got raw data from the serial port
function gotRawData(thedata) {
  println("gotRawData" + thedata);
}

function draw() {
  let cx = (windowWidth / 2) - 400;
  let cy = windowHeight / 2;
  let cSize = diameter0 * 5;

  background(255, 255, 255);
  fill(0);
  textAlign(CENTER);
  text(latestData, windowWidth / 2, windowHeight - 50);
  ellipseMode(RADIUS);
  fill(255, 0, 0);
  noStroke();

  //button
  //console.log("diameter0  "  + diameter0);
  ellipse(cx, cy, cSize);

  //potentiometer
  //ellipseMode(RADIUS);
  rectMode(RADIUS);
  fill(0, 255, 0);
  //ellipse(200, 100, diameter1, diameter1);
  square((windowWidth / 2), windowHeight / 2, cSize*2, diameter0 * 0.1);


  //light sensor
  ellipseMode(RADIUS);
  fill(0, 0, 255);
  ellipse(((windowWidth / 2) + 400), windowHeight / 2, cSize);
}

function mouseClicked() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
    console.log("getAudioContext().state" + getAudioContext().state);
  }
};