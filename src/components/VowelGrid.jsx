import vowels from "../data/vowels";

function VowelGrid({ onSelect }) {
  return (
    <div className="grid grid-cols-3 gap-4 p-6 max-w-md mx-auto">
      {vowels.map((vowel) => (
        <button
          key={vowel.id}
          onClick={() => onSelect(vowel)}
          className="bg-white rounded-2xl shadow-md p-6 text-5xl
                     hover:bg-purple-100 active:scale-95
                     transition-all duration-150"
        >
          {vowel.letter}
        </button>
      ))}
    </div>
  );
}

export default VowelGrid;
