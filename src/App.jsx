import { useState } from 'react';
import VowelGrid from './components/VowelGrid';
import TracingCanvas from './components/TracingCanvas';
import vowels from './data/vowels';

function App() {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const selectedVowel = selectedIndex !== null ? vowels[selectedIndex] : null;

  const handleSelect = (vowel) => {
    const index = vowels.findIndex((v) => v.id === vowel.id);
    setSelectedIndex(index);
  };

  const handlePrev = () => {
    if (selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
  };

  const handleNext = () => {
    if (selectedIndex < vowels.length - 1) setSelectedIndex(selectedIndex + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-orange-100">
      <h1 className="text-3xl font-bold text-purple-600 text-center pt-6">
        बाराखडी
      </h1>

      {selectedVowel ? (
        <div className="text-center mt-4 px-6">
          <p className="text-6xl mb-2">{selectedVowel.letter}</p>
          <TracingCanvas vowel={selectedVowel} />
          <div className="flex justify-center gap-3 mt-4">
            <button
              onClick={handlePrev}
              disabled={selectedIndex === 0}
              className="bg-orange-400 text-white px-5 py-3 rounded-xl text-lg
                         active:scale-95 transition-all
                         disabled:opacity-40 disabled:scale-100"
            >
              ← Prev
            </button>
            <button
              onClick={() => setSelectedIndex(null)}
              className="bg-purple-500 text-white px-5 py-3 rounded-xl text-lg
                         active:scale-95 transition-all"
            >
              Grid
            </button>
            <button
              onClick={handleNext}
              disabled={selectedIndex === vowels.length - 1}
              className="bg-green-500 text-white px-5 py-3 rounded-xl text-lg
                         active:scale-95 transition-all
                         disabled:opacity-40 disabled:scale-100"
            >
              Next →
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
