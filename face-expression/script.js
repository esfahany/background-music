const video = document.getElementById('video')

// Use webcam
startVideo = () => {
    navigator.getUserMedia(
      { video: {} },
      stream => video.srcObject = stream,
      err => console.error(err)
    )
}

// Start the video only after getting the required models
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
    faceapi.nets.faceExpressionNet.loadFromUri('./models'),
]).then(startVideo)

// Function to get the expression with the highest confidence
function expressionResult(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

// When the webcam is on...
video.addEventListener('play', () => {
    setInterval(async () => {
        // Get facial expression labels from face-api
        const detections = await faceapi.detectAllFaces(video, 
            new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
            // Ignore if no face / expression is detected
            if (!detections.length) {
                return
            }
            // Make expressions the objects of all the expressions and their confidence levels
            let expressions = detections[0].expressions
            let expressionsResult =(Object.values(expressions));
            // Get the highest expression level
            let highestValue = (Math.max(...expressionsResult));
            // Find the expression with the highest expression level
            let result = expressionResult(expressions, highestValue)
            document.getElementById("expression").innerHTML = result;


            // Get the confidence of each expression and add it to the html
            expressionName = ["neutral", "happy", "sad", "angry", "fearful", "disgusted", "surprised"]
            let expressionValue=[];
            for (let index = 0; index < expressionName.length; index++) {
                const expressionIndex = expressionName[index];
                expressionValue[index] = expressions[expressionIndex];
            }
            var dominantEmotion = "";
            var maxValue = 0;
            for (let index = 0; index < expressionName.length; index++) {
                const name = expressionName[index];
                const value = expressionValue[index];
                let analysis = (name + " is " + value)
                if (maxValue<value){
                     dominantEmotion = name;
                     maxValue = value;
                }
                document.getElementById(name).innerHTML = analysis;
            }
            if (dominantEmotion !="neutral"){
                playSong(dominantEmotion);
            }
    // Checks the expressions every three seconds
    }, 3000)
})

function playSong(emotion){
     var songNumber = Math.floor(Math.random() * 15);
     var filepath = "Data/".concat(emotion,"/", songNumber.toString(songNumber), ".mp3");
     var audio = new Audio(filepath);
     audio.play()

}
