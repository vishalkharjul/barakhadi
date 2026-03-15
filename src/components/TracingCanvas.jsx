import { useRef, useEffect, useState } from 'react';
import { getVowelPath } from '../utils/fontLoader';
import confetti from 'canvas-confetti';
import { Trash2, CircleCheck } from 'lucide-react';
import strokeGuides from '../data/strokeGuides';







function TracingCanvas({ vowel,onMoodChange }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const guidePathRef = useRef(null);
  const strokeWidthRef = useRef(8);
  const lastPosRef = useRef(null);       // stores last finger position
  const totalDistanceRef = useRef(0);     // running total like an odometer
  const celebrateAudioRef = useRef(null);
  const hitCheckpointsRef = useRef(new Set());


  useEffect(() => {
  return () => {
    if (celebrateAudioRef.current) {
      celebrateAudioRef.current.pause();
    }
  };
}, []);




  const drawGuide = (ctx) => {
    if (!guidePathRef.current) return;

    ctx.save();
    ctx.strokeStyle = '#d1d5db';
    ctx.lineWidth = 3;
    ctx.setLineDash([8, 6]);
    ctx.fillStyle = 'rgba(209, 213, 219, 0.3)';

    const path2D = new Path2D(guidePathRef.current.toPathData());
    ctx.fill(path2D);
    ctx.stroke(path2D);
    ctx.restore();
  };



  useEffect(() => {
    if (celebrateAudioRef.current) {
      celebrateAudioRef.current.pause();
    }
    const canvas = canvasRef.current;
    const size = Math.min(window.innerWidth - 120, 260);

    canvas.width = size;
    canvas.height = size;

 async function setup() {
  const { path, strokeWidth } = await getVowelPath(vowel.letter, size);
  guidePathRef.current = path;
  strokeWidthRef.current = strokeWidth;

  const ctx = canvas.getContext('2d');

  // Load guide image
  const img = new Image();
  img.src = `/images/alphabets/${vowel.name}.png`;
  img.onload = () => {
    const padding = size * 0.15;
ctx.drawImage(img, -padding, -padding, size + padding * 2, size + padding * 2);

  };
  img.onerror = () => {
    // Fallback to dashed outline if no image exists
    drawGuide(ctx);
  };
}
totalDistanceRef.current = 0;
lastPosRef.current = null;
hitCheckpointsRef.current = new Set();


    setup();
  }, [vowel]);

  const getPosition = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    if (e.touches) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
  };

  const startDrawing = (e) => {
    if (!guidePathRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    const pos = getPosition(e);

    ctx.save();

    ctx.lineCap = 'round';
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#7c3aed';
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    lastPosRef.current = pos;
    setIsDrawing(true);
  };


const draw = (e) => {
  if (!isDrawing) return;
  const ctx = canvasRef.current.getContext('2d');
  const pos = getPosition(e);
  const canvas = canvasRef.current;

  if (lastPosRef.current) {
    const dx = pos.x - lastPosRef.current.x;
    const dy = pos.y - lastPosRef.current.y;
    totalDistanceRef.current += Math.sqrt(dx * dx + dy * dy);
  }
  lastPosRef.current = pos;

  // Check if near any checkpoint
  const guide = strokeGuides[vowel.name];
  if (guide) {
    const tolerance = canvas.width * 0.04;
    guide.checkpoints.forEach((cp, index) => {
      const cpX = cp.x * canvas.width;
      const cpY = cp.y * canvas.height;
      const dist = Math.sqrt((pos.x - cpX) ** 2 + (pos.y - cpY) ** 2);
      if (dist < tolerance) {
        hitCheckpointsRef.current.add(index);
      }
    });
  }

  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
};



  const stopDrawing = () => {
    if (isDrawing) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.restore();
    }
    setIsDrawing(false);
  };


const handleClear = () => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const img = new Image();
  img.src = `/images/alphabets/${vowel.name}.png`;
  img.onload = () => {
    const padding = canvas.width * 0.15;
ctx.drawImage(img, -padding, -padding, canvas.width + padding * 2, canvas.height + padding * 2);

  };
  img.onerror = () => {
    drawGuide(ctx);
  };

  totalDistanceRef.current = 0;
  lastPosRef.current = null;
  hitCheckpointsRef.current = new Set();

  if (celebrateAudioRef.current) {
    celebrateAudioRef.current.pause();
  }
};


const handleDone = () => {
  const guide = strokeGuides[vowel.name];

  if (guide) {
    const totalCheckpoints = guide.checkpoints.length;
    const hitCount = hitCheckpointsRef.current.size;
    const coverage = hitCount / totalCheckpoints;

    if (coverage < 1.0) {
      onMoodChange('sad');
      setTimeout(() => onMoodChange('watch'), 2000);
      return;
    }
  } else {
    // Fallback to distance check for vowels without guide data
    const canvas = canvasRef.current;
    const threshold = canvas.width * 1.0;
    if (totalDistanceRef.current < threshold) {
      onMoodChange('sad');
      setTimeout(() => onMoodChange('watch'), 2000);
      return;
    }
  }

  onMoodChange('celebrate');
  confetti({
    particleCount: 250,
    spread: 80,
    origin: { y: 0.6 },
  });
  const celebrateAudio = new Audio('/audio/piku_celebrate.mp3');
  celebrateAudioRef.current = celebrateAudio;
  celebrateAudio.play().catch(() => {});
};





  return (
    <div className="relative">
      <div className="bg-white rounded-2xl shadow-lg p-2 mx-auto mt-1
                      border-4 border-purple-200" style={{ width: 'fit-content' }}>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="rounded-xl touch-none block"
        />
      </div>
      <div className="flex justify-center gap-3 mt-1">
        <button
          onClick={handleClear}
          className="bg-red-400 text-white px-5 py-2 rounded-xl text-base
                    active:scale-95 transition-all"
        >
          <Trash2 size={20} />

        </button>
        <button
          onClick={handleDone}
          className="bg-green-500 text-white px-5 py-2 rounded-xl text-base
                    active:scale-95 transition-all"
        >
          <CircleCheck size={20} />

        </button>
      </div>

    </div>
  );

}

export default TracingCanvas;
