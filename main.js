    scoreleftWrist = 0;
    song1_status = "";
    song2_status = "";
    song1 = "";
    song2 = "";
    leftWristX = 0;
    leftWristY = 0;
    rightWristX = 0;
    rightWristY = 0;
    scorerightWrist = 0;

    function preload() 
    {
        song1 = loadSound("music.mp3");
        song2 = loadSound("music2.mp3");
    } 
    

function setup() 
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

    function gotPoses(results)
    {
        if(results.length > 0)
        {
            console.log(results);
            scoreleftWrist = results[0].pose.keypoints[9].score;
            scorerightWrist = results[0].pose.keypoints[10].score;
            console.log("scoreLeftWrist = " + scoreleftWrist );
            console.log("scorerightWrist = " + scorerightWrist  )

            leftWristX = results[0].pose.leftWrist.x;
            leftWristY = results[0].pose.leftWrist.y;
            console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
    
            rightWristX = results[0].pose.rightWrist.x;
            rightWristY = results[0].pose.rightWrist.y;
            console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
        }
    }
    
    function modelLoaded()
    {
        console.log('PoseNet is Initialized')
    }
    

function draw() 
{
    
    image(video, 0, 0, 600, 500);

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    

    if(scoreleftWrist > 0.2) 
    {
        fill("#0000ff");
        stroke("#0000ff");
        circle(leftWristX,leftWristY,20);

        if(song1_status == false)
        {
            
            song2.stop(); 
            song1.play();
            document.getElementById("song").innerHTML = "Playing - Harry Potter Theme Song";
            document.getElementById("note").innerHTML = "Move Your Right hand Wrist up to play Peter Pan song";
            
        }

    }

    if(scorerightWrist > 0.2)
    {   
             
        fill("#0000ff");
        stroke("#0000ff");
        circle(rightWristX,rightWristY,20);
        
        if(song2_status == false)
        {
            song1.stop();
            song2.play();            
            document.getElementById("song").innerHTML = "Playing - Peter Pan Song";
            document.getElementById("note").innerHTML = "Move Your Left hand Wrist up to play Harry Potter Theme song"
        }
    }    
}
