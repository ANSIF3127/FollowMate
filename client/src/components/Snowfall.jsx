import React, { useEffect, useState } from 'react';

const Snowfall = ({ darkMode }) => {
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    // ❄️ Density: 120 in light mode, 90 in dark mode
    const count = darkMode ? 90 : 120;
    const newSnowflakes = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 5 + Math.random() * 10,
      animationDelay: Math.random() * -8,
      opacity: darkMode
        ? Math.random() * 0.6 + 0.2   // 0.2–0.8
        : Math.random() * 0.5 + 0.4,  // 0.4–0.9 – solid visibility
      size: Math.random() * 6 + 2,    // 2–8px
      drift: Math.random() * 60 - 30,
    }));
    setSnowflakes(newSnowflakes);
  }, [darkMode]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background gradient – unchanged */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ${
          darkMode
            ? 'bg-gradient-to-br from-[#0F111A] via-[#1a0b2e] to-[#0A0D14]'
            : 'bg-gradient-to-br from-blue-50 via-purple-50/30 to-white'
        }`}
      />

      {/* Glowing orbs – unchanged */}
      <div
        className={`absolute inset-0 opacity-30 transition-opacity duration-1000 ${
          darkMode ? 'mix-blend-overlay' : 'mix-blend-soft-light'
        }`}
      >
        <div
          className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] animate-pulse ${
            darkMode ? 'bg-purple-600/20' : 'bg-blue-300/30'
          }`}
        />
        <div
          className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] animate-pulse ${
            darkMode ? 'bg-blue-600/10' : 'bg-purple-300/20'
          }`}
          style={{ animationDelay: '1s' }}
        />
      </div>

      {/* ❄️ SNOWFLAKES – Warm golden glow in light mode, icy cyan in dark mode */}
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className={`absolute rounded-full transition-all duration-1000 ${
            darkMode
              ? 'bg-gradient-to-br from-cyan-200 via-white to-blue-100 shadow-[0_0_8px_rgba(34,211,238,0.6)]'
              : 'bg-gradient-to-br from-yellow-300 via-orange-200 to-amber-200 shadow-[0_0_12px_rgba(251,191,36,0.6)]'
          }`}
          style={{
            left: `${flake.left}%`,
            top: `-10px`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animation: `fall ${flake.animationDuration}s linear infinite`,
            animationDelay: `${flake.animationDelay}s`,
            '--drift': `${flake.drift}px`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-10px) translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) translateX(var(--drift));
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Snowfall;