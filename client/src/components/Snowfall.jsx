import React, { useEffect, useState } from 'react';

const Snowfall = ({ darkMode }) => {
    const [snowflakes, setSnowflakes] = useState([]);

    useEffect(() => {
        const count = 50;
        const newSnowflakes = Array.from({ length: count }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            animationDuration: 8 + Math.random() * 12,
            animationDelay: Math.random() * -10,
            opacity: Math.random() * 0.4 + 0.1,
            size: Math.random() * 3 + 1,
            drift: Math.random() * 40 - 20,
            blur: Math.random() * 2 + 1
        }));
        setSnowflakes(newSnowflakes);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <div className={`absolute inset-0 transition-all duration-1000 ${darkMode
                    ? 'bg-gradient-to-br from-[#0F111A] via-[#1a0b2e] to-[#0A0D14]'
                    : 'bg-gradient-to-br from-blue-50 via-purple-50/30 to-white'
                }`} />

            <div className={`absolute inset-0 opacity-30 transition-opacity duration-1000 ${darkMode ? 'mix-blend-overlay' : 'mix-blend-soft-light'}`}>
                <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] animate-pulse ${darkMode ? 'bg-purple-600/20' : 'bg-blue-300/30'}`} />
                <div className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] animate-pulse ${darkMode ? 'bg-blue-600/10' : 'bg-purple-300/20'}`} style={{ animationDelay: '1s' }} />
            </div>

            {snowflakes.map((flake) => (
                <div
                    key={flake.id}
                    className={`absolute rounded-full transition-all duration-1000 ${darkMode
                            ? 'bg-gradient-to-br from-white to-blue-100 shadow-[0_0_8px_rgba(255,255,255,0.4)]'
                            : 'bg-gradient-to-br from-blue-200 to-purple-200 shadow-[0_0_10px_rgba(147,197,253,0.4)]'
                        }`}
                    style={{
                        left: `${flake.left}%`,
                        top: `-10px`,
                        width: `${flake.size}px`,
                        height: `${flake.size}px`,
                        opacity: flake.opacity,
                        filter: `blur(${flake.blur}px)`,
                        animation: `fall ${flake.animationDuration}s linear infinite`,
                        animationDelay: `${flake.animationDelay}s`,
                        '--drift': `${flake.drift}px`
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
            opacity: var(--opacity);
          }
          90% {
            opacity: var(--opacity);
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