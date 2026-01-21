import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { LOVE_REASONS } from '../constants';

const LoveCard: React.FC = () => {
  const initialText = "Click the button 💗";

  const indices = useMemo(
    () => Array.from({ length: LOVE_REASONS.length }, (_, i) => i),
    []
  );

  const shuffle = (arr: number[]) => [...arr].sort(() => Math.random() - 0.5);

  const [order, setOrder] = useState<number[]>([]);
  const [pointer, setPointer] = useState(0);
  const [reason, setReason] = useState(initialText);
  const [anim, setAnim] = useState(false);
  const [pulse, setPulse] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setOrder(shuffle(indices));
  }, [indices]);

  const nextReason = useCallback(() => {
    let next = pointer;
    if (reason !== initialText) next++;

    if (next >= order.length) {
      setReason("And there are still a thousand more I haven’t learned how to say yet.");
      setPointer(0);
      setOrder(shuffle(indices));
      return;
    }

    setPointer(next);
    setReason(LOVE_REASONS[order[next]]);
  }, [pointer, order, reason, initialText, indices]);

  const handleClick = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/bg-music.mp3');
      audioRef.current.volume = 0.18;
      audioRef.current.loop = false;
    }

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});

    setAnim(true);
    setPulse(true);

    setTimeout(() => {
      nextReason();
      setAnim(false);
    }, 450);

    setTimeout(() => setPulse(false), 650);
  };

  return (
    <div className="w-full max-w-md md:max-w-lg p-10 md:p-12 bg-white/20 backdrop-blur-xl rounded-[2rem] border border-white/30">

      <h1 className="font-serif text-5xl md:text-6xl mb-10 text-white opacity-90">
        Why I Love You
      </h1>

      <div className="h-36 md:h-44 flex items-center justify-center mb-12">
        <p className={`text-xl md:text-2xl text-white/80 transition-all duration-500 ${anim ? 'opacity-0 -translate-y-4' : 'opacity-100'}`}>
          {reason}
        </p>
      </div>

      <button
        onClick={handleClick}
        className="px-10 py-3 bg-white/50 hover:bg-white/80 rounded-full text-slate-700 transition-all duration-300"
      >
        <span className="flex items-center gap-2">
          Tell me why
          <span className={`${pulse ? 'scale-125' : 'scale-100'} transition-transform duration-500`}>💗</span>
        </span>
      </button>
    </div>
  );
};

export default LoveCard;
