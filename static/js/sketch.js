// P5.js content
// Shift + Option + F to reformat code 

const len = 784;
const total_data = 1000;
const canvas_width = 400;
const canvas_height = 400;


function passData() {
    let inputs = [];
    let img = get();
    img.resize(28, 28);
    img.loadPixels();

    // Turn pixels into byte array
    for (let i = 0; i < len; i++) {
        let bright = img.pixels[i * 4];
        inputs[i] = bright / 255.0;
    }

    // Call the python path for processing data
    $("#resultsDiv").load("/processdata", {
        input_data: JSON.stringify(inputs)
    });

}

function displayData(predictions){
    console.log(predictions);
}

// Setup function of the p5.js library, basically it runs this function on page load
function setup() {
    let canvas = createCanvas(canvas_width, canvas_height);
    canvas.background(0);
    canvas.parent("canvasDiv")

    // Logic for "guess when drawing on canvas"
    let mouseDown = false;
    canvas.mousePressed(function () {
        mouseDown = true;
    });

    canvas.mouseReleased(function () {
        mouseDown = false;
    });

    canvas.mouseMoved(function () {
        if (mouseDown) {
            passData();
            // guess();
        }
    });

    let clearButton = select('#clearButton');
    clearButton.mousePressed(function () {
        background(0);
    });
}

// Draw function of p5.js library, this function is run each frame to check for updates
function draw() {
    strokeWeight(16);
    stroke(255);
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}