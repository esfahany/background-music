function modelReady() {
    // log when the model is rrady
    console.log("Model Loaded!");
}
const sentiment = ml5.sentiment('movieReviews', modelReady);

function runSpeechRecognition() {
    console.log("function starting");
    // get output div references
    var transcript_div = document.getElementById("transcript");
    var sentiment_div = document.getElementById("sentiment");
    // get action element reference
    var action = document.getElementById("action");
    // new speech recognition object
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    
    // This runs when the speech recognition service starts
    recognition.onstart = function() {
        action.innerHTML = "listening";
    };
    
    recognition.onspeechend = function() {
        action.innerHTML = "done";
        recognition.stop();
    }

    // This runs when the speech recognition service returns result
    var finalTranscript = "";
    recognition.onresult = function(event) {
        // console.log(event.results);
        var interimTranscript = "";
        for(var i=event.resultIndex; i < event.results.length; i++){
            var transcript = event.results[i][0].transcript;
            var confidence = event.results[i][0].confidence;
            if (event.results[i].isFinal){
                finalTranscript += transcript;
            }
            else{
                interimTranscript += transcript;
            }
            transcript_div.innerHTML = "<b>Text:</b> " + finalTranscript + interimTranscript + "<br/> <b>Speech to Text Confidence:</b> " + confidence*100+"%";
        }
        var sentiment_score = sentiment.predict(finalTranscript.slice(-20)).score;
        sentiment_div.innerHTML = "<b>Sentiment Score:</b>" + sentiment_score;
        // output.classList.remove("hide");
    };

    // start recognition
    recognition.start();

}

