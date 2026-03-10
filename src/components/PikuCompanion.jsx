const images = {
  wave: '/images/piku_wave_wbg.png',
  watch: '/images/piku_watch_wbg.png',
  celebrate: '/images/piku_celebrate_wbg.png',
  sad: '/images/piku_sad_wbg.png',
};

const animations = {
  wave: 'animate-float',
  watch: 'animate-sway',
  celebrate: 'animate-spin-celebrate',
  sad: 'animate-shake',
};

function PikuCompanion({ mood = 'wave', size = 80 }) {
  return (
    <img
      src={images[mood]}
      alt={`Piku ${mood}`}
      className={`${animations[mood]} transition-all duration-300`}
      style={{ width: size, height: size }}
    />
  );
}

export default PikuCompanion;
