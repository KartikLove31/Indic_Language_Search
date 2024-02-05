window.onload = function() {
    document.getElementById('icon1').addEventListener('click', function () {
        // Get the selected language from the dropdown box
        const dropdown = document.getElementById('languageDropdown');
        const userLanguage = dropdown.options[dropdown.selectedIndex].value;

        // Ask for user's permission to access the microphone
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(function (stream) {
            // Create a SpeechRecognition object
            const recognition = new webkitSpeechRecognition(); // for WebKit browsers
            // Set the language for recognition based on user selection
            recognition.lang = userLanguage.trim().toLowerCase();

            // Set the stream as the input source
            recognition.stream = stream;

            // Start recognition
            recognition.start();

            // Event triggered when the recognition starts
            recognition.onstart = function () {
              alert('Speak now...');
            };

            // Event triggered when the recognition ends
            recognition.onend = function () {
              alert('Speech recognition ended.');
              // Stop the media stream
              stream.getTracks().forEach(track => track.stop());
            };

            // Event triggered when a result is received
            recognition.onresult = function (event) {
              // Get the recognized text
              const result = event.results[0][0].transcript;
              alert('ASR Result: ' + result);

              // Call Bhashini ASR API
              callBhashiniASR(result);
            };

            // Event triggered when an error occurs
            recognition.onerror = function (event) {
              alert('Speech recognition error: ' + event.error);
            };
          })
          .catch(function (error) {
            alert('Error accessing the microphone: ' + error);
          });
    });

    document.getElementById('icon2').addEventListener('click', function () {
        alert('OCR functions');
    });

    document.getElementById('icon3').addEventListener('click', function () {
        // Popup a textarea for user input
        const userInput = prompt('Enter text for Text-to-Speech:');

        // Check if user entered something
        if (userInput !== null) {
            // Get the selected language from the dropdown box
            const dropdown = document.getElementById('languageDropdown');
            const selectedLanguage = dropdown.options[dropdown.selectedIndex].value;

            // Call the function to perform Text-to-Speech with user input
            textToSpeechWebAPI(userInput, selectedLanguage);
        }
    });

    document.getElementById('icon4').addEventListener('click', function () {
        alert('Neural Machine Translation');
    });

    document.getElementById('icon5').addEventListener('click', function () {
        alert('Future Addition');
    });

    document.getElementById('icon6').addEventListener('click', function () {
        alert('Future Addition');
    });
    // Repeat for other icons

    // Function to call Bhashini ASR API
    function callBhashiniASR(text) {
        // Replace "your_user_id", "your_ulca_api_key", and "your_inference_api_key" with actual values
        const userId = "5e6683b15b7d40b2aaa4a5b6c89d831a";
        const ulcaApiKey = "01ad063126-3c87-4762-a7c5-96a46f89d3a6";
        const inferenceApiKey = "UKD1n65ufJYvjCqBVynrgAVPdDG1wADWqpI0tcSSC8flx6ZwbtHGuEpfOJdXwiBx";

        // Initialize Bhashini library with authentication details
        bhashini.auth(userId, ulcaApiKey, inferenceApiKey);

        // Call ASR function
        bhashini.asr('sourceLang', text)
          .then(response => {
            // Handle the ASR result here
            alert('Bhashini ASR Result: ' + JSON.stringify(response));
          })
          .catch(error => {
            // Handle errors if any
            alert('Error calling Bhashini ASR: ' + error);
          });
    }

    // Function to perform Text-to-Speech
    function textToSpeechWebAPI(text, language) {
        // Create a SpeechSynthesisUtterance object
        const utterance = new SpeechSynthesisUtterance();
    
        // Set the text and language for the utterance
        utterance.text = text;
        utterance.lang = language;
    
        // Add the utterance to the queue and speak it
        speechSynthesis.speak(utterance);
    }
    
    

    // Function to play the generated audio
    function playAudio(audioContent) {
        const audio = new Audio('data:audio/wav;base64,' + audioContent);
        audio.play();
    }

    function playAudioWebAPI(audioContent) {
        // Decode the base64 audio content
        const audioData = atob(audioContent);
        const arrayBuffer = new ArrayBuffer(audioData.length);
        const view = new Uint8Array(arrayBuffer);
        
        for (let i = 0; i < audioData.length; i++) {
            view[i] = audioData.charCodeAt(i);
        }
    
        // Use the Web Audio API to play the audio
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioContext.decodeAudioData(arrayBuffer, function(buffer) {
            const source = audioContext.createBufferSource();
            source.buffer = buffer;
            source.connect(audioContext.destination);
            source.start(0);
        }, function(error) {
            console.error('Error decoding audio data: ', error);
        });
    }
};
