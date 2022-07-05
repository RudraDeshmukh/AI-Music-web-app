
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
scorerightwrist=0;
scoreleftwrist=0;
song1="";
song2="";

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelloaded);
    poseNet.on('pose',gotposes)
}

function modelloaded(){
    console.log("poseNet is initialized")
}

function draw(){
    image(video,0,0,600,500);
    fill("#FF0000")
    stroke("FF0000")
    if(scoreleftwrist > 0.2){
        circle(leftwristx,leftwristy,20)
        song1.play();
        song1.setVolume(1);
        song1.rate(1);
        document.getElementById("song_name").innerHTML="Music 1"
    }
    if(scorerightwrist > 0.2){
        circle(rightwristx,rightwristy,20)
        song2.play();
        song2.setVolume(1);
        song2.rate(1);
        document.getElementById("song_name").innerHTML="Music 2"
}
}


function gotposes(results){
    if(results.length > 0){
        console.log(results)
        leftwristx = results[0].pose.leftWrist.x
        leftwristy = results[0].pose.leftWrist.y
        rightwristx = results[0].pose.rightWrist.x
        rightwristy = results[0].pose.rightWrist.y

        console.log("left wrist x =" + leftwristx + " left wrist y = " + leftwristy)
        console.log("right wrist x =" + rightwristx + " right wrist y = " + rightwristy)

        scoreleftwrist=results[0].pose.keypoints[9].score
        scorerightwrist=results[0].pose.keypoints[10].score
    }

}