/*
Mimi Yin NYU-ITP
Drawing lines with the selected joint in 4 modes.
Use LEFT/RIGHT arrow keys to change selected joint.
Use UP/DOWN arrow keys to change mode.
Press ENTER to erase.
*/

// IP Address
let IP = "192.168.0.136";

// Scale size of skeleton
let SCL = 0.5;

// Declare kinectron
let kinectron = null;
// Keep track of selected joint
let j;
// Which drawing mode
let mode;
// Store current and previous positions of selected joint
let pos, ppos;

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

  // Set kinect version to azure
  kinectron.setKinectType("azure");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);

  // Initialize values
  mode = 0;

  // Start drawing with left hand
  j = kinectron.HANDLEFT;

  // Draw white background
  background(255);
}

function draw() {}

function bodyTracked(body) {
  // Get the left hand joint
  let joint = body.skeleton.joints[j];

  // Calculate its x,y,z coordinates
  pos = scaleJoint(joint);

  // If there is a previous position
  if (ppos) {
    let speed = dist(ppos.x, ppos.y, pos.x, pos.y);
    let sw = 1;

    // 3 ways to set strokeweight according to speed.
    if (mode == 1) {
      sw = speed / 10;
    }
    if (mode == 2) {
      sw = 10 / speed;
    }
    if (mode == 3) {
      sw = map(speed, 0, 100, 10, 0);
    }

    // Draw the line
    stroke(0);
    strokeWeight(sw);
    line(ppos.x, ppos.y, pos.x, pos.y);
  }

  // Store current location for next frame
  ppos = pos;

  // Print which joint is selected
  stroke(255);
  textSize(18);
  text("RT/LFT to change joints. " + j + ": " + jointNames[j], 10, 20);
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
  // ENTER to erase
  switch (keyCode) {
    case UP_ARROW:
      mode++;
      mode %= 4;
      break;
    case LEFT_ARROW:
      j--;
      break;
    case RIGHT_ARROW:
      j++;
      break;
    case ENTER:
      background(255);
      break;
  }

  // There are only 25 joints
  j = constrain(j, 0, 24);
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
