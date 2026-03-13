import { useState, useRef } from 'react';
import VowelGrid from './components/VowelGrid';
import TracingCanvas from './components/TracingCanvas';
import vowels from './data/vowels';
import { playVowelSound } from './utils/audio';
import { ChevronLeft, ChevronRight, Grid3x3 } from 'lucide-react';
import PikuCompanion from './components/PikuCompanion';

function App() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [pikuMood, setPikuMood] = useState('wave');
  const [screen, setScreen] = useState('welcome');
  const welcomeAudioRef = useRef(null);


  const selectedVowel = selectedIndex !== null ? vowels[selectedIndex] : null;

const handleStart = () => {
  const audio = new Audio('/audio/piku_welcome.mp3');
  welcomeAudioRef.current = audio;
  audio.play().catch(() => {});
  setScreen('grid');
};


const handleSelect = (vowel) => {
  if (welcomeAudioRef.current) {
    welcomeAudioRef.current.pause();
  }
  window.scrollTo(0, 0);
  const index = vowels.findIndex((v) => v.id === vowel.id);
  setSelectedIndex(index);
  playVowelSound(vowel.name);
  setPikuMood('watch');
};


  const handlePrev = () => {
    window.scrollTo(0, 0);
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
      playVowelSound(vowels[selectedIndex - 1].name);
      setPikuMood('watch');
    }
  };

  const handleNext = () => {
    window.scrollTo(0, 0);
    if (selectedIndex < vowels.length - 1) {
      setSelectedIndex(selectedIndex + 1);
      playVowelSound(vowels[selectedIndex + 1].name);
      setPikuMood('watch');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-orange-100">
      {screen === 'welcome' ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-5xl font-bold text-purple-600 mb-4">बाराखडी</h1>
          <PikuCompanion mood="wave" size={200} />
          <button
            onClick={handleStart}
            className="bg-orange-400 text-white px-8 py-4 rounded-2xl text-2xl font-bold shadow-lg mt-4"
          >
            Let's Start!
          </button>
        </div>
      ) : selectedVowel ? (
        <div className="text-center mt-0 px-6">
          <h1 className="text-4xl font-bold text-purple-600 text-center pt-1 mb-0">बाराखडी</h1>
          <div className="flex justify-center">
            <PikuCompanion mood={pikuMood} size={180} />
          </div>

          <TracingCanvas vowel={selectedVowel} onMoodChange={setPikuMood} />

          <div className="flex justify-center gap-3 mt-2">
            <button
              onClick={handlePrev}
              disabled={selectedIndex === 0}
              className="bg-orange-400 text-white px-5 py-3 rounded-xl text-lg
                         active:scale-95 transition-all
                         disabled:opacity-40 disabled:scale-100"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => { setSelectedIndex(null); setPikuMood('wave'); }}
              className="bg-purple-500 text-white px-5 py-3 rounded-xl text-lg
                         active:scale-95 transition-all"
            >
              <Grid3x3 size={24} />
            </button>
            <button
              onClick={handleNext}
              disabled={selectedIndex === vowels.length - 1}
              className="bg-green-500 text-white px-5 py-3 rounded-xl text-lg
                         active:scale-95 transition-all
                         disabled:opacity-40 disabled:scale-100"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-2">
          <h1 className="text-4xl font-bold text-purple-600 text-center pt-1 mb-0">बाराखडी</h1>
          <PikuCompanion mood="wave" size={150} />
          <VowelGrid onSelect={handleSelect} />
        </div>
      )}
    </div>
  );
}

export default App;
