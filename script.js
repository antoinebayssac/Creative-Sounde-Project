const startRecognitionButton = document.getElementById('startRecognition');
const stopRecognitionButton = document.getElementById('stopRecognition');

const words = [
  { id: 'word1', text: 'chat' },
  { id: 'word2', text: 'chien' },
  { id: 'word3', text: 'soleil' },
  { id: 'word4', text: 'lune' },
  { id: 'word5', text: 'étoile' },
];

if ('webkitSpeechRecognition' in window) {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'fr-FR';
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onresult = event => {
    const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();

    words.forEach(word => {
      const wordElement = document.getElementById(word.id);
      if (transcript.includes(word.text)) {
        wordElement.classList.add('animate');
      } else {
        wordElement.classList.remove('animate');
      }
    });
  };

  startRecognitionButton.addEventListener('click', () => {
    recognition.start();
    startRecognitionButton.disabled = true;
    stopRecognitionButton.disabled = false;
  });

  stopRecognitionButton.addEventListener('click', () => {
    recognition.stop();
    startRecognitionButton.disabled = false;
    stopRecognitionButton.disabled = true;
  });

} else {
  alert("La reconnaissance vocale n'est pas prise en charge par ce navigateur. Veuillez utiliser Google Chrome ou un autre navigateur compatible.");
  startRecognitionButton.disabled = true;
}
