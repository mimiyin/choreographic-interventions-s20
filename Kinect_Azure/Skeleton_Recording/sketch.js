/*
Mimi Yin NYU-ITP
Recording Skeleton Data
*/

// IP Address of kinectron server
let IP = "localhost";

// Scale size of skeleton
let SCL = 0.25;

// Declare kinectron
let kinectron = null;

// Store recorded bodies in an array
let recordedBodies = [];

// Are we recording?
let RECORDING = false;
// Are we playing back?
let PLAYBACK = true;
// Current frame of playback
let cframe = 0;

function preload() {
  if (PLAYBACK) loadJSON('data.json', function(json){
    recordedBodies = json.recording;
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Get live data if not playing back from recorded data
  if (!PLAYBACK) {
    // Define and create an instance of kinectron
    kinectron = new Kinectron(IP);

    // Set kinect version to azure
    kinectron.setKinectType("azure");

    // Connect with application over peer
    kinectron.makeConnection();

    // Request all tracked bodies and pass data to your callback
    kinectron.startTrackedBodies(bodyTracked);
  }

  background(0);
}

function draw() {
  //background(0);

  // Playback data frame by frame
  if (PLAYBACK) {
    let cms = millis();
    let cbody = recordedBodies[cframe];
    while (cms > cbody.ts && cframe < recordedBodies.length - 1) {
      // Draw the body
      bodyTracked(cbody);
      // Move onto next frame
      cframe++;
      // Grab next body, if there is one
      cbody = recordedBodies[cframe];
    }

  }
}

function bodyTracked(body) {
  background(0);

  // Record body with timestamp
  if (RECORDING) {
    body.ts = millis();
    recordedBodies.push(body);
  }

  // Draw all the joints
  let joints = body.skeleton.joints;
  for (let j in joints) {
    let joint = joints[j];
    drawJoint(joint);
  }
}

// 0. Scale the joint position data to fit the screen
// 1. Move it to the center of the screen
// 2. Flip the x-value to mirror
// 3. Return it as an object literal
function scaleJoint(joint) {
  return {
    x: (-joint.cameraX * SCL) + width / 2,
    y: (joint.cameraY * SCL) + height / 2,
    z: (joint.cameraZ * SCL),
  }
}

// Draw skeleton
function drawJoint(joint) {

  //console.log("JOINT OBJECT", joint);
  let pos = scaleJoint(joint);

  //Kinect location data needs to be normalized to canvas size

  stroke(255);
  strokeWeight(5);
  point(pos.x, pos.y);
}

// Save data to file
function keyPressed() {
  if (RECORDING) saveJSON({recording: recordedBodies}, 'recorded_bodies.json');
}
