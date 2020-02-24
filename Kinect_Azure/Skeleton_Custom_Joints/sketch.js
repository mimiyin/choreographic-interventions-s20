/*
Mimi Yin NYU-ITP
Drawing skeleton with custom joints.
 */

 // IP Address of kinectron server
 let IP = "192.168.0.136";

 // Scale size of skeleton
 let SCL = 0.5;

// Declare kinectron
let kinectron = null;

// Custom list of joints
let custom;

// Keep track of selected custom joint index
let c = 0;

// Keep track of selected joint
let s;

// Directory of joints
let jointNames = [
  "PELVIS",
  "SPINE_NAVAL",
  "SPINE_CHEST",
  "NECK",
  "CLAVICLE_LEFT",
  "SHOULDER_LEFT",
  "ELBOW_LEFT",
  "WRIST_LEFT",
  "HAND_LEFT",
  "HANDTIP_LEFT",
  "THUMB_LEFT",
  "CLAVICLE_RIGHT",
  "SHOULDER_RIGHT",
  "ELBOW_RIGHT",
  "WRIST_RIGHT",
  "HAND_RIGHT",
  "HANDTIP_RIGHT",
  "THUMB_RIGHT",
  "HIP_LEFT",
  "KNEE_LEFT",
  "ANKLE_LEFT",
  "FOOT_LEFT",
  "HIP_RIGHT",
  "KNEE_RIGHT",
  "ANKLE_RIGHT",
  "FOOT_RIGHT",
  "HEAD",
  "NOSE",
  "EYE_LEFT",
  "EAR_LEFT",
  "EYE_RIGHT",
  "EAR_RIGHT"
];

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

  // Specify custom list of joints to cycle through
  custom = [PELVIS, HAND_LEFT, ELBOW_RIGHT];

  // Start out selecting first custom joint
  s = custom[c];

  background(0);
}

function draw() {
  //background(0);
}

function bodyTracked(body) {
  background(0);

  // Draw all the joints
  let joints = body.skeleton.joints;
  for(let j in joints) {
    let joint = joints[j];
    // j==custom[c] returns whether this joint is the selected joint
    drawJoint(joint, j == s);
  }

  // Print which joint is selected
  noStroke();
  fill(255);
  textSize(18);
  text("RT/LFT to change joints. " + s + ": " + jointNames[s], 10, 20);
}

function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    c++;
  } else if (keyCode == LEFT_ARROW) {
    c--;
  }

  // Wrap around
  c%=custom.length;
  if (c < 0) c = custom.length-1;

  // Update selected joint
  s = custom[c];
}

// Scale the joint position data to fit the screen
// 1. Move it to the center of the screen
// 2. Flip the x-value to mirror you
// 3. Return it as an object literal
function scaleJoint(joint) {
  return {
    x: (-joint.cameraX * SCL) + width / 2,
    y: (joint.cameraY * SCL) + height / 2,
  }
}

// Draw skeleton
function drawJoint(joint, isSelected) {

  //console.log("JOINT OBJECT", joint);
  let pos = scaleJoint(joint);

  //Kinect location data needs to be normalized to canvas size
  // Draw it big and red if it's the selected joint
  if (isSelected) {
    stroke(255, 0, 0);
    strokeWeight(50);
  } else {
    stroke(255);
    strokeWeight(5);
  }
  point(pos.x, pos.y);
}
