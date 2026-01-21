import React from 'react';
import LoveCard from './components/LoveCard';
import ParticleBackground from './components/ParticleBackground';
import MusicToggle from './components/MusicToggle';

const App: React.FC = () => {
  return (
    <div className="relative font-sans antialiased overflow-hidden min-h-screen">

      {/* Website gradient background */}
      <div className="absolute inset-0 z-[-4] bg-gradient-to-b from-[#1e2a4a] via-[#2a3a63] to-[#4a5583]" />

      {/* Pixel art background with cinematic upward fade */}
      <div
        className="absolute inset-0 z-[-3] bg-bottom bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: `
            linear-gradient(
              to top,
              rgba(30, 42, 74, 1) 0%,
              rgba(30, 42, 74, 0.85) 20%,
              rgba(30, 42, 74, 0.5) 35%,
              rgba(30, 42, 74, 0.15) 55%,
              rgba(30, 42, 74, 0) 75%
            ),
            url('/pixel-bg.webp')
          `
        }}
      />

      {/* Shooting Stars */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-[-2] pointer-events-none">
        <div className="shooting-star w-96 animate-shooting-star" style={{ top: '20%', left: '-50%', animationDelay: '0s', animationDuration: '5s' }}></div>
        <div className="shooting-star w-80 animate-shooting-star" style={{ top: '40%', left: '-50%', animationDelay: '1.2s', animationDuration: '4s' }}></div>
        <div className="shooting-star w-96 animate-shooting-star" style={{ top: '80%', left: '-50%', animationDelay: '3.5s', animationDuration: '6s' }}></div>
      </div>

      {/* Particle background */}
      <ParticleBackground />

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 text-center -translate-y-16">
        <LoveCard />
      </main>

      {/* Footer */}
      <footer className="absolute bottom-6 left-0 right-0 text-center text-white/30 text-xs tracking-wider z-10">
        Made with ❤️
      </footer>

      {/* Music toggle */}
      <MusicToggle />
    </div>
  );
};

export default App;
