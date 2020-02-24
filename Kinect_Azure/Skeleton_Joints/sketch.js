/*
Mimi Yin NYU-ITP
Drawing skeleton joints.
*/

// IP Address of kinectron server
let IP = "172.19.139.244";

// Scale size of skeleton
let SCL = 0.5;

// Declare kinectron
let kinectron = null;


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
  //background(0);
}

function bodyTracked(body) {
  background(0);

  // Draw all the joints
  let joints = body.skeleton.joints;
  for (let j in joints) {
    let joint = joints[j];
    drawJoint(joint);
  }

  // Print which joint is selected
  noStroke();
  fill(255);
  textSize(18);
  text("RT/LFT to change joints. " + s + ": " + jointNames[s], 10, 20);
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
function drawJoint(joint) {

  //console.log("JOINT OBJECT", joint);
  let pos = scaleJoint(joint);

  //Kinect location data needs to be normalized to canvas size

  stroke(255);
  strokeWeight(5);
  point(pos.x, pos.y);
}
