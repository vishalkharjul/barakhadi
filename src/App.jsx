import { useState } from 'react';
import VowelGrid from './components/VowelGrid';
import TracingCanvas from './components/TracingCanvas';
import vowels from './data/vowels';
import { playVowelSound } from './utils/audio';
import { ChevronLeft, ChevronRight, Grid3x3 } from 'lucide-react';



function App() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const selectedVowel = selectedIndex !== null ? vowels[selectedIndex] : null;

 const handleSelect = (vowel) => {
    const index = vowels.findIndex((v) => v.id === vowel.id);
    setSelectedIndex(index);
    playVowelSound(vowel.name);
  };

  const handlePrev = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
      playVowelSound(vowels[selectedIndex - 1].name);
    }
  };

 const handleNext = () => {
    if (selectedIndex < vowels.length - 1) {
      setSelectedIndex(selectedIndex + 1);
      playVowelSound(vowels[selectedIndex + 1].name);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-orange-100">
        <h1 className="text-2xl font-bold text-purple-600 text-center pt-3">

        बाराखडी
      </h1>

      {selectedVowel ? (
        <div className="text-center mt-2 px-6">
          <p className="text-5xl mb-1">{selectedVowel.letter}</p>
          <TracingCanvas vowel={selectedVowel} />
          <div className="flex justify-center gap-3 mt-4">
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
              onClick={() => setSelectedIndex(null)}
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
        <VowelGrid onSelect={handleSelect} />
      )}
    </div>
  );
}

export default App;
