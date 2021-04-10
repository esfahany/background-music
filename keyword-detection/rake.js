// Implementation of https://github.com/waseem18/node-rake

const rake = require("node-rake")

// Source code already has some stopwords i.e common words that should not be included as keywords
// Added another custom list just in case we notice some words we'd like to ignore 
let fs = require("fs");
let rawStopwords = fs.readFileSync("keyword-detection/SmartStoplist.txt", "utf-8")
let myStopwords = rawStopwords.split("\n")
const opts = {stopwords: myStopwords};

// This could be the transcript of a person's speech
transcript = "So, our plan is to generate background music from a person's spotify playlist. The music generated would be based on the tone of speech\
            used in the conversation, the emotions encoded in words said, the actual words said and, maybe, the facial expressions of people having the\
            conversation!"

const keywords = rake.generate(transcript, opts)

console.log(keywords)


// FOR BROWSER
    // Does not work because of line 3 (const rake = require("node-rake"))
    // Apparently, require does not typically work on browsers but tools like browserify and reqirejs lets us use require in browser
    // However, I have been running into issues with both browserify and requirejs
// let transcript = document.getElementById("fakeTranscript")

// transcript.onsubmit = generate(transcript)

// generate = (transcript) => {
//     keywords = rake.generate(transcript, opts)
//     document.getElementById("keywords") = keywords
// }

