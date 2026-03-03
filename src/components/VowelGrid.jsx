import vowels from "../data/vowels";

const colors = [
  "bg-red-200", "bg-orange-200", "bg-amber-200",
  "bg-yellow-200", "bg-lime-200", "bg-green-200",
  "bg-teal-200", "bg-cyan-200", "bg-sky-200",
  "bg-blue-200", "bg-violet-200", "bg-pink-200",
];

function VowelGrid({ onSelect }) {
  return (
    <div className="grid grid-cols-3 gap-4 p-6 max-w-md mx-auto">
      {vowels.map((vowel, index) => (
        <button
          key={vowel.id}
          onClick={() => onSelect(vowel)}
          className={`${colors[index]} rounded-2xl shadow-md p-6 text-5xl
                     hover:scale-105 active:scale-95
                     transition-all duration-150 border-2 border-white`}
        >
          {vowel.letter}
        </button>
      ))}
    </div>
  );
}

export default VowelGrid;
