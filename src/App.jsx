import { useState } from 'react';
import VowelGrid from './components/VowelGrid';
import TracingCanvas from './components/TracingCanvas';

function App() {
  const [selectedVowel, setSelectedVowel] = useState(null);

  return (
    <div className="min-h-screen bg-yellow-100">
      <h1 className="text-3xl font-bold text-purple-600 text-center pt-6">
        बाराखडी 🎓
      </h1>

      {selectedVowel ? (
        <div className="text-center mt-4">
          <p className="text-2xl text-gray-700">Trace: {selectedVowel.letter}</p>
          <TracingCanvas />
          <button
            onClick={() => setSelectedVowel(null)}
            className="mt-4 bg-purple-500 text-white px-6 py-3 rounded-xl text-lg"
          >
            ← Back
          </button>
        </div>
      ) : (
        <VowelGrid onSelect={setSelectedVowel} />
      )}
    </div>
  );
}

export default App;
