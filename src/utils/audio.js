export function playVowelSound(letter) {
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(letter);
  utterance.lang = 'mr-IN';
  utterance.rate = 0.8;

  window.speechSynthesis.speak(utterance);
}
