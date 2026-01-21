import React, { useState } from 'react';

declare global {
  interface Window {
    __bgAudio?: HTMLAudioElement;
  }
}

const MusicToggle: React.FC = () => {
  const [muted, setMuted] = useState(false);

  const toggle = () => {
    if (!window.__bgAudio) return;

    if (muted) {
      window.__bgAudio.volume = 0.18;
    } else {
      window.__bgAudio.volume = 0;
    }

    setMuted(!muted);
  };

  return (
    <button
      onClick={toggle}
      className="fixed top-4 right-4 z-20 p-3 bg-white/30 backdrop-blur-md rounded-full text-white hover:bg-white/50 transition-all duration-300 shadow-md"
    >
      {muted ? '🔈' : '🔊'}
    </button>
  );
};

export default MusicToggle;
