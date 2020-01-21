/*
Mimi Yin NYU-ITP
Drawing skeleton joints.
Selecting different joints.
 */

 // IP Address of kinectron server
 let IP = "192.168.0.136";

 // Scale size of skeleton
 let SCL = 0.5;

// Declare kinectron
let kinectron = null;

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

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Define and create an instance of kinectron
  kinectron = new Kinectron(IP);

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);

  // Start with the left hand
  s = kinectron.HANDLEFT;

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
    // j==s returns whether this joint is the selected joint
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
    s++;
  } else if (keyCode == LEFT_ARROW) {
    s--;
  }

  // Wrap around
  s%=jointNames.length;
  if (s < 0) s = jointNames.length-1;
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
