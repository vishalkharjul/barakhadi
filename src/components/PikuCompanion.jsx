const media = {
  wave: { src: '/images/piku_wave_wbg.png', type: 'image' },
  watch: { src: '/images/piku_watch_wbg2.png', type: 'image' },
  celebrate: { src: '/images/piku_celebrate_wbg.png', type: 'image' },
  sad: { src: '/images/piku_sad_wbg.png', type: 'image' },
};

const animations = {
  wave: 'animate-float',
  watch: 'animate-sway',
  celebrate: 'animate-spin-celebrate',
  sad: 'animate-shake',
};

function PikuCompanion({ mood = 'wave', size = 80 }) {
  const current = media[mood];

  if (current.type === 'video') {
    return (
      <video
        src={current.src}
        autoPlay
        loop
        muted
        playsInline
        className="transition-all duration-300"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <img
      src={current.src}
      alt={`Piku ${mood}`}
      className={`${animations[mood]} transition-all duration-300`}
      style={{ width: size, height: size }}
    />
  );
}

export default PikuCompanion;
