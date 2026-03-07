const audioCache = {};  // like a Python dict: { "a": AudioObject, "aa": AudioObject, ... }

export function playVowelSound(name) {
  // Check cache first (just like checking a dict)
  if (!audioCache[name]) {
    audioCache[name] = new Audio(`/audio/${name}.mp3`);
  }
  
  const audio = audioCache[name];
  audio.currentTime = 0;  // rewind to start (in case it's still playing)
  audio.play();
}
