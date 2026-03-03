import opentype from 'opentype.js';

let font = null;

async function loadFont() {
  if (font) return font;
  font = await opentype.load('/fonts/NotoSansDevanagari.ttf');
  return font;
}

export async function getVowelPath(letter, canvasSize = 350) {
  const loadedFont = await loadFont();

  const fontSize = canvasSize * 0.7;
  const path = loadedFont.getPath(letter, 0, 0, fontSize);
  const bbox = path.getBoundingBox();

  const offsetX = (canvasSize - (bbox.x2 - bbox.x1)) / 2 - bbox.x1;
  const offsetY = (canvasSize - (bbox.y2 - bbox.y1)) / 2 - bbox.y1;

  const centeredPath = loadedFont.getPath(letter, offsetX, offsetY, fontSize);
  const strokeWidth = fontSize * 0.16;
  
  return { path: centeredPath, strokeWidth };
}
