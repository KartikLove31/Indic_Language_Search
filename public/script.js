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
    
      // ... your existing code ...
    
      // Function to call Bhashini ASR API
      function callBhashiniASR(text) {
        // Replace "your_user_id", "your_ulca_api_key", and "your_inference_api_key" with actual values
        const userId = "your_user_id";
        const ulcaApiKey = "your_ulca_api_key";
        const inferenceApiKey = "your_inference_api_key";
    
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


    document.getElementById('icon2').addEventListener('click', function() {
        alert('OCR functions');
    });
    document.getElementById('icon3').addEventListener('click', function() {
        alert('Text to speech Test');
    });
    document.getElementById('icon4').addEventListener('click', function() {
        alert('Translation');
    });
    document.getElementById('icon5').addEventListener('click', function() {
        alert('Future Addition');
    });
    document.getElementById('icon6').addEventListener('click', function() {
        alert('Future Addition');
      });
    // Repeat for other icons
  }