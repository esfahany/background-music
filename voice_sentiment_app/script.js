function modelReady() {
    // log when the model is rrady
    console.log("Model Loaded!");
}
const sentiment = ml5.sentiment('movieReviews', modelReady);

function runSpeechRecognition() {
    // get output div references
    var lexical_analysis_div = document.getElementById("lexical_analysis_div");
    lexical_analysis_div.classList.remove("hide");
    var transcript_div = document.getElementById("transcript");
    var confidence_div = document.getElementById("confidence");
    var last_words_div = document.getElementById("last_words");
    var sentiment_div = document.getElementById("sentiment");

    // get action element reference
    var action = document.getElementById("action");
    action.classList.remove("hide");
    // new speech recognition object
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    
    // This runs when the speech recognition service starts
    recognition.onstart = function() {
        action.innerHTML = "microphone ON";
    };
    
    recognition.onspeechend = function() {
        action.innerHTML = "microphone OFF";
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
            transcript_div.innerHTML = "<b>Transcript:</b> " + finalTranscript + "<span style='color: red;'>" + interimTranscript + "</span>";
            confidence_div.innerHTML = "<b>Transcript Confidence:</b> " + (confidence*100).toFixed(2) +"%";
        }
        var most_recent_words = finalTranscript.split(" ").slice(-10).join(" ");
        console.log(most_recent_words);
        var sentiment_score = sentiment.predict(most_recent_words).score;
        last_words_div.innerHTML = "<b>Most Recent Comments: </b>" + "... " + most_recent_words;
        sentiment_div.innerHTML = "<b>Sentiment Score (0 = negative, 1 = positive): </b>" + sentiment_score.toFixed(5);
    };

    // start recognition
    recognition.start();

}

