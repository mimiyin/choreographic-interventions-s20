/*
Mimi Yin NYU-ITP
Drawing lines with the selected joint in 4 modes.
Use LEFT/RIGHT arrow keys to change selected joint.
Use UP/DOWN arrow keys to change mode.
Press ENTER to erase.
*/

// IP Address of kinectron server
let IP = "192.168.0.136";

// Scale size of skeleton
let SCL = 0.5;

// Declare kinectron
let kinectron = null;

// Store a series of positions
let poses = [];

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
  kinectron = new Kinectron("10.17.201.104");

  // For Azure Kinect use "azure"
  kinectron.setKinectType("azure");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);

  // Start drawing with left hand
  s = kinectron.HANDLEFT;

  // Draw white background
  background(0);
}

function draw() {}

function bodyTracked(body) {

  background(0, 10);

  // Get the left hand joint
  let joint = body.skeleton.joints[s];

  // Calculate its x,y,z coordinates
  pos = scaleJoint(joint);

  // Add to positions
  poses.push(pos);

  // Remove the oldest mouse position after 50 frames
  if (poses.length > 50) poses.shift();

  fill(255, 64);
  noStroke();
  // Iterate through last 50 mouse positions
  for (let l = 0; l < poses.length; l++) {
    // Get the position
    let ppos = poses[l];

    // Throbbing
    let sz = sin(frameCount * 0.01) * l + l;

    // Easing
    ppos.x += (pos.x - ppos.x) * 0.01;
    ppos.y += (pos.y - ppos.y) * 0.01;

    // Draw an ellipse at this position
    ellipse(ppos.x, ppos.y, sz, sz);
  }

  // Print which joint is selected
  stroke(255);
  textSize(18);
  text("RT/LFT to change joints. " + s + ": " + jointNames[s], 10, 20);
}

// Draw each joint
function drawJoint(joint) {
  let pos = scaleJoint(joint);
  noStroke();
  fill(255);
  ellipse(pos.x, pos.y, 10, 10);
}

function keyPressed() {
  // Use RIGHT/LEFT arrow keys to change selected joint
  if(keyCode == LEFT_ARROW) {
      s--;
  }
  else if(keyCode == RIGHT_ARROW) {
      s++;
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
