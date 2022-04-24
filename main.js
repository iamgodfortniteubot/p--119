function preload(){
classifier = ml5.imageClassifier('DoodleNet');
}

function setup(){
canvas = createCanvas(280, 280);
canvas.center();
background("white");
canvas.mouseReleased(classifyCanvas);
synth = window.speechSynthesis;
}

function ClearCanvas(){
background("white");
}

function draw(){
strokeWeight(7);
stroke("black");
if(mouseIsPressed){
line(pmouseX, pmouseY, mouseX, mouseY);
}
}

function classifyCanvas(){
classifier.classify(canvas, got_results);
}

function got_results(error, results){
if(error){
console.error(error);
}
console.log(results);
document.getElementById("label").innerHTML = "Label:   "+ results[0].label;

document.getElementById("confidance").innerHTML = "Accuracy:   "+ Math.round(results[0].confidence * 100 )+ "%";

utterthis = new SpeechSynthesisUtterance(results[0].label);

synth.speak(utterthis);
}