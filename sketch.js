let objectDetector;

let video;
let objects = [];
let modelLoaded;

function setup() {
  createCanvas(640, 420);
  video = createCapture(VIDEO);
  video.size(640, 480);
  objectDetector = ml5.objectDetector('cocossd', modelReady);
}

function modelReady() {
  modelLoaded = true;
  document.querySelector("#model-feedback").style.visibility = "hidden";
  video.hide();
  objectDetector.detect(video, gotResult);// detecteer een eerste keer
}

function gotResult(err, results) {
  if (err) {
    console.log(err);
  }
  console.log(results)
  objects = results;
  objectDetector.detect(video, gotResult);// detecteer opnieuw  (want video input kan veranderd zijn)
}


function draw() {
  background(215);
  // enkel tekenen als model geladen werd
  image(video, 0, 0);
  if (modelLoaded) {
    //teken groene kader rond elk gevonden object
    for (let i = 0; i < objects.length; i++) {
      if (objects[i].confidence > 0.90) {
        noStroke();
        fill(0, 208, 133);
        // textSize(8);
        text(objects[i].label + " " + nfc(objects[i].confidence * 100.0, 2) + "%", objects[i].x + 8, objects[i].y + 12);
        noFill();
        strokeWeight(4);
        stroke(0, 208, 133);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      }
    }
  }
}