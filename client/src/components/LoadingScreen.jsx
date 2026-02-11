import React, { useEffect, useState } from 'react';
import InstagramLogo from './InstagramLogo';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const loadingMessages = [
    "Analyzing your followers...",
    "Comparing follower lists...",
    "Identifying non-followers...",
    "Processing data...",
    "Almost ready..."
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsComplete(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    const messageInterval = setInterval(() => {
      setCurrentMessageIndex(prev => (prev + 1) % loadingMessages.length);
    }, 1500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [loadingMessages.length, onComplete]);

  return (
    <div className={`fixed inset-0 bg-black text-white flex items-center justify-center overflow-hidden z-50 transition-all duration-1000 ${isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-64 h-64 border border-white/5 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-xl w-full px-6 text-center">
        <div className="relative mb-12">
          <div className="w-48 h-48 border-4 border-transparent border-t-blue-500/30 border-r-purple-500/30 rounded-full animate-spin"></div>
          <div className="absolute inset-8 border-4 border-transparent border-b-purple-500/30 border-l-blue-500/30 rounded-full animate-spin-reverse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative animate-float">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-4 shadow-2xl">
                  <InstagramLogo className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 w-full max-w-md">
          {/* Project Name with Icon (Replacing "Analyzing your lists...") */}
          <div className="flex flex-col items-center justify-center gap-4 animate-fade-in-up">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-sm rounded-full animate-pulse"></div>
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg shadow-lg relative z-10">
                  <InstagramLogo className="w-6 h-6 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                FollowMate
              </h1>
            </div>
          </div>
          
          <div className="h-8 overflow-hidden">
            <div 
              className="transition-all duration-500 ease-in-out transform"
              style={{ transform: `translateY(-${currentMessageIndex * 2}rem)` }}
            >
              {loadingMessages.map((message, index) => (
                <p 
                  key={index}
                  className="text-lg font-medium h-8 flex items-center justify-center text-gray-300"
                >
                  {message}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex justify-between text-sm font-semibold uppercase tracking-wider">
              <span className="text-gray-400">Processing</span>
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-bold">{progress}%</span>
            </div>
            
            <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Branding with same icon style as header */}
       
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-spin {
          animation: spin 2s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 1.5s linear infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;