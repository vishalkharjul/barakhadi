import { useRef, useEffect, useState } from 'react';
import { getVowelPath } from '../utils/fontLoader';


function TracingCanvas({ vowel }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const guidePathRef = useRef(null);
  const strokeWidthRef = useRef(8);


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
    canvas.width = 350;
    canvas.height = 350;

    async function setup() {
      const { path, strokeWidth } = await getVowelPath(vowel.letter, 350);
      guidePathRef.current = path;
      strokeWidthRef.current = strokeWidth;

      const ctx = canvas.getContext('2d');
      drawGuide(ctx);

    }
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
    setIsDrawing(true);
  };


  const draw = (e) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current.getContext('2d');
    const pos = getPosition(e);
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

  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className="bg-white rounded-2xl shadow-md mx-auto block mt-6 touch-none"
      />
      <button
        onClick={handleClear}
        className="mt-4 bg-gray-400 text-white px-6 py-3 rounded-xl text-lg"
      >
        Clear
      </button>
    </div>
  );
}

export default TracingCanvas;
