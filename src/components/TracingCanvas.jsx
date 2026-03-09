import { useRef, useEffect, useState } from 'react';
import { getVowelPath } from '../utils/fontLoader';
import confetti from 'canvas-confetti';
import { Trash2, CircleCheck } from 'lucide-react';






function TracingCanvas({ vowel }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const guidePathRef = useRef(null);
  const strokeWidthRef = useRef(8);
  const lastPosRef = useRef(null);       // stores last finger position
  const totalDistanceRef = useRef(0);     // running total like an odometer



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
    const canvas = canvasRef.current;
    const size = Math.min(window.innerWidth - 72, 350);
    canvas.width = size;
    canvas.height = size;

    async function setup() {
      const { path, strokeWidth } = await getVowelPath(vowel.letter, size);
      guidePathRef.current = path;
      strokeWidthRef.current = strokeWidth;

      const ctx = canvas.getContext('2d');
      drawGuide(ctx);

    }
    totalDistanceRef.current = 0;
    lastPosRef.current = null;

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
    const clipPath = new Path2D(guidePathRef.current.toPathData());
    ctx.clip(clipPath);

    ctx.lineCap = 'round';
    ctx.lineWidth = strokeWidthRef.current;
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

  if (lastPosRef.current) {
    const dx = pos.x - lastPosRef.current.x;
    const dy = pos.y - lastPosRef.current.y;
    totalDistanceRef.current += Math.sqrt(dx * dx + dy * dy);
  }
  lastPosRef.current = pos;

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
    drawGuide(ctx);
    totalDistanceRef.current = 0;
    lastPosRef.current = null;


  };

  const handleDone = () => {
    const canvas = canvasRef.current;
    const threshold = canvas.width * 1.0;
    

    if (totalDistanceRef.current < threshold) {
      return;  // not enough tracing, do nothing
    }

    confetti({
      particleCount: 250,
      spread: 80,
      origin: { y: 0.6 },
    });
  };



  return (
    <div className="relative">
      <div className="bg-white rounded-2xl shadow-lg p-3 mx-auto mt-4
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
      <div className="flex justify-center gap-3 mt-3">
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
