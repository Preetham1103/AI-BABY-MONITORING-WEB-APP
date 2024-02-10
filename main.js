img = "";
status = "";
objects = [];
personDetected = false;

function preload()
{
    img = loadImage('baby.png');
    audio = loadSound("alert.mp3")
    
}

function setup()
{
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";

}

function modelLoaded()
{
    console.log("Model Loaded! ");
    status = true;
    objectDetector.detect(img, gotResults);
}

function draw()
{
    image(img, 0, 0, 640, 420);

    if(status != "")
    {
        personDetected = true;
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById('status').innerHTML = "Status : Object Dectected";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke('#ff0000');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(personDetected = true)
            {
            document.getElementById("baby").innerHTML = "Baby Found";
            audio.stop();
            }
            else{
            audio.play();
            document.getElementById("baby").innerHTML = "Baby Not Found";
            }
    

        }
        if(objects.length < 0)
        {
            audio.play();
            document.getElementById("baby").innerHTML = "Baby Not Found";
        }
    }
    
}

function gotResults(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;

}
