/*
Mimi Yin NYU-ITP
Controlling angle speed with the distance between joints.
*/

 // IP Address of kinectron server
 let IP = "192.168.0.136";

 // Scale size of skeleton
 let SCL = 0.5;

// Declare kinectron
let kinectron = null;

// Variables for circle
let a = 0;

// Joint indices by name
let PELVIS = 0;
let SPINE_NAVAL = 1;
let SPINE_CHEST = 2;
let NECK = 3;
let CLAVICLE_LEFT = 4;
let SHOULDER_LEFT = 5;
let ELBOW_LEFT= 6;
let WRIST_LEFT= 7;
let HAND_LEFT = 8;
let HANDTIP_LEFT = 9;
let THUMB_LEFT = 10;
let CLAVICLE_RIGHT = 11;
let SHOULDER_RIGHT = 12;
let ELBOW_RIGHT = 13;
let WRIST_RIGHT = 14;
let HAND_RIGHT = 15;
let HANDTIP_RIGHT = 16;
let THUMB_RIGHT = 17;
let HIP_LEFT = 18;
let KNEE_LEFT = 19;
let ANKLE_LEFT = 20;
let FOOT_LEFT = 21;
let HIP_RIGHT = 22;
let KNEE_RIGHT = 23;
let ANKLE_RIGHT = 24;
let FOOT_RIGHT = 25;
let HEAD = 26;
let NOSE = 27;
let EYE_LEFT = 28;
let EAR_LEFT = 29;
let EYE_RIGHT = 30;
let EAR_RIGHT = 31;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Define and create an instance of kinectron
  kinectron = new Kinectron(IP);

  // Set kinect version to azure
  kinectron.setKinectType("azure");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);

  background(0);
}

function draw() {
  //Nothing to see here
}

function bodyTracked(body) {
  background(0, 10);

  // Get all the joints off the tracked body and do something with them
  let joints = body.skeleton.joints;



  // Pick 2 joints to connect
  let start = scaleJoint(joints[EAR_RIGHT]);
  let end = scaleJoint(joints[HAND_LEFT]);

  // Draw a line
  stroke(255);
  line(start.x, start.y, end.x, end.y);
  let d = dist(start.x, start.y, start.z, end.x, end.y, end.z);

  // Map the distance to angle speed
  let aspeed = map(d, 0, width, 0, PI/2);
  // Inverse, non-linear mapping
  //let aspeed = 1/d;

  // Move the angle by the angle speed
  a+=aspeed;

  noStroke();
	// Calculate circular pathway
  let x = cos(a)*width/4 + width/2;
  let y = sin(a)*width/4 + height/2;
  ellipse(x, y, 5, 5);
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
