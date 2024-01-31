window.onload = function() {
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert('Your browser does not support speech recognition.');
        return;
    }
    
    let recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; // Set the language
    recognition.interimResults = false; // We want final results only
    recognition.maxAlternatives = 1; // We're only interested in the top result
    
    let overlay = document.getElementById('overlay');

    document.getElementById('icon1').addEventListener('click', function() {
        recognition.start();
        overlay.style.display = 'block'; // Show the overlay when recognition starts
    });
    
    
    recognition.addEventListener('result', function(event) {
        let transcript = event.results[0][0].transcript;
        alert('You said: ' + transcript);
        overlay.style.display = 'none'; // Hide the overlay when recognition ends
    });
    
    //--------------
    // OCR ICON 2
    // -------------

    let modal = document.getElementById('modal');

    document.getElementById('icon2').addEventListener('click', function() {
        modal.style.display = 'block';
    });

    document.getElementById('upload').addEventListener('change', function(event) {
        try {
          let file = event.target.files[0];
          // Handle the file here
        } catch (error) {
          console.error('An error occurred:', error);
        } finally {
          modal.style.display = 'none';
        }
      });
      
      document.getElementById('capture').addEventListener('click', function() {
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
          try {
            let video = document.createElement('video');
            video.srcObject = stream;
            video.play();
      
            let canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0);
      
            canvas.toBlob(function(blob) {
              let file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
              // Handle the file here
            });
      
            stream.getTracks().forEach(track => track.stop());
          } catch (error) {
            console.error('An error occurred:', error);
          } finally {
            modal.style.display = 'none';
          }
        });
      });
      
      

    document.getElementById('icon2').addEventListener('click', function() {
        alert('OCR functions');
    });

    // -------------
    // ICON 3
    // -------------

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
  