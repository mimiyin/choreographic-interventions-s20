/*
Mimi Yin NYU-ITP
Drawing skeleton joints and bones.
 */

// IP Address of kinectron server
let IP = "192.168.0.136";

// Scale size of skeleton
let SCL = 0.5;

// Declare kinectron
let kinectron = null;

// Variables for start and end points of Distance
let start;
let end;

// Variables for circle
let a = 0;

// Joint indices by name
let PELVIS = 0;
let SPINE_NAVAL = 1;
let SPINE_CHEST = 2;
let NECK = 3;
let CLAVICLE_LEFT = 4;
let SHOULDER_LEFT = 5;
let ELBOW_LEFT = 6;
let WRIST_LEFT = 7;
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
  // Once there's data
  if (start && end) {
    // Draw a line
    stroke(255);
    line(start.x, start.y, end.x, end.y);
    let d = dist(start.x, start.y, end.x, end.y);

    // Map the distance to angle speed
    let aspeed = map(d, 0, width, 0, PI / 2);
    // Inverse, non-linear mapping
    //let aspeed = 1/d;

    a += aspeed;

    noStroke();
    // Calculate circular pathway
    let x = cos(a) * width / 4 + width / 2;
    let y = sin(a) * width / 4 + height / 2;
    ellipse(x, y, 5, 5);
  }
}

function bodyTracked(body) {
  background(0, 10);

  // Get all the joints off the tracked body and do something with them

  // Mid-line
  let pelvis = scaleJoint(body.joints[PELVIS]);
  let spineNaval = scaleJoint(body.joints[SPINE_NAVAL]);
  let spineChest = scaleJoint(body.joints[SPINE_CHEST]);
  let neck = scaleJoint(body.joints[NECK]);

  // Left Arm
  let clavicleLeft = scaleJoint(body.joints[CLAVICLE_LEFT]);
  let shoulderLeft = scaleJoint(body.joints[SHOULDER_LEFT]);
  let elbowLeft = scaleJoint(body.joints[ELBOW_LEFT_]);
  let wristLeft = scaleJoint(body.joints[WRISTLEFT]);
  let handLeft = scaleJoint(body.joints[HAND_LEFT]);
  let handTipLeft = scaleJoint(body.joints[HANDTIP_LEFT]);
  let thumbLeft = scaleJoint(body.joints[THUMB_LEFT]);

  // Right Arm
  let clavicleRight = scaleJoint(body.joints[CLAVICLE_LEFT]);
  let shoulderRight = scaleJoint(body.joints[SHOULDER_RIGHT]);
  let elbowRight = scaleJoint(body.joints[ELBOW_RIGHT]);
  let wristRight = scaleJoint(body.joints[WRIST_RIGHT]);
  let handRight = scaleJoint(body.joints[HAND_RIGHT]);
  let handTipRight = scaleJoint(body.joints[HANDTIP_RIGHT]);
  let thumbRight = scaleJoint(body.joints[THUMB_RIGHT]);

  // Left Leg
  let hipLeft = scaleJoint(body.joints[HIP_LEFT]);
  let kneeLeft = scaleJoint(body.joints[KNEE_LEFT]);
  let ankleLeft = scaleJoint(body.joints[ANKLE_LEFT]);
  let footLeft = scaleJoint(body.joints[FOOT_LEFT]);

  // Right Leg
  let hipRight = scaleJoint(body.joints[HIP_RIGHT]);
  let kneeRight = scaleJoint(body.joints[KNEE_RIGHT]);
  let ankleRight = scaleJoint(body.joints[ANKLE_RIGHT]);
  let footRight = scaleJoint(body.joints[FOOT_RIGHT]);

  // Head
  let head = scaleJoint(body.joints[HEAD]);
  let nose = scaleJoint(body.joints[NOSE]);
  let eyeLeft = scaleJoint(body.joints[EYE_LEFT]);
  let earLeft = scaleJoint(body.joints[EAR_LEFT]);
  let eyeRight = scaleJoint(body.joints[EYE_RIGHT]);
  let earRight = scaleJoint(body.joints[EAR_RIGHT]);

  // Pick 2 joints to connect
  if (body.skeleton.id == 0) start = footLeft;
  else end = head;
}

// Scale the joint position data to fit the screen
// 1. Move it to the center of the screen
// 2. Flip the y-value upside down
// 3. Return it as an object literal
function scaleJoint(joint) {
  return {
    x: (joint.cameraX * width / 2) + width / 2,
    y: (-joint.cameraY * width / 2) + height / 2,
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
