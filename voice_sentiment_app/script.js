function runSpeechRecognition() {
    // get output div reference
    var output = document.getElementById("output");
    // get action element reference
    var action = document.getElementById("action");
    // new speech recognition object
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();

    /////// ml5 stuff
    // Create a new Sentiment method
    const sentiment = ml5.sentiment('movieReviews', modelReady);
        
    // When the model is loaded
    function modelReady() {
        // model is ready
        console.log("Model Loaded!");
    }

    // This runs when the speech recognition service starts
    recognition.onstart = function() {
        action.innerHTML = "<small>listening, please speak...</small>";
    };
    
    recognition.onspeechend = function() {
        action.innerHTML = "<small>stopped listening, hope you are done...</small>";
        recognition.stop();
    }

    

    // make the prediction
    // const prediction = sentiment.predict(text);
  
    // This runs when the speech recognition service returns result
    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript;
        // console.log(transcript);
        // console.log(typeof(transcript));
        var confidence = event.results[0][0].confidence;
        var sentiment_score = sentiment.predict(transcript).score;
        // console.log(sentiment_score.score);

        
        output.innerHTML = "<b>Text:</b> " + transcript + "<br/> <b>Speech to Text Confidence:</b> " + confidence*100+"%" + "<br/> <b>Sentiment Score:</b> " + sentiment_score;
        output.classList.remove("hide");

        
        
    };
  
     // start recognition
     recognition.start();
}

