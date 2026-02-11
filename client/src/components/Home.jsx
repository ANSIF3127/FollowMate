import React, { useEffect, useState } from 'react';
import InstagramLogo from './InstagramLogo';
import { ArrowUpCircle, ShieldCheck, Lock, Upload, BarChart3 } from 'lucide-react';
import Snowfall from './Snowfall'; // ❄️ Imported from separate file

// Main Home Component
const Home = ({ onNavigate, darkMode, toggleTheme }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`min-h-screen font-sans transition-all duration-700 flex flex-col ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <Snowfall darkMode={darkMode} />

      <header className="relative px-6 py-5 flex items-center justify-between border-b border-slate-200 dark:border-slate-800/60 sticky top-0 bg-white/95 dark:bg-[#0F111A]/95 backdrop-blur-xl z-50 shadow-sm dark:shadow-none animate-slide-down">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-1.5 rounded-lg shadow-lg">
            <InstagramLogo className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">FollowMate</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="relative w-14 h-8 rounded-full bg-gradient-to-r from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700 transition-all duration-500"
            aria-label="Toggle Theme"
          >
            <span
              className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-gradient-to-br from-white to-slate-100 dark:from-slate-900 dark:to-slate-800 shadow-lg transform transition-all duration-500 flex items-center justify-center ${
                darkMode ? 'translate-x-6' : 'translate-x-0'
              }`}
            >
              {darkMode ? (
                <svg className="w-4 h-4 text-blue-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21.64 13.65A9 9 0 0110.35 2.36a7 7 0 1011.29 11.29z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 18a6 6 0 100-12 6 6 0 000 12zm0-14a1 1 0 011-1h0a1 1 0 01-1 1zm0 18a1 1 0 011 1h0a1 1 0 01-1-1zm8-9a1 1 0 011-1h0a1 1 0 01-1 1zM4 12a1 1 0 01-1-1h0a1 1 0 011 1zm13.66 6.66a1 1 0 011.41 0h0a1 1 0 01-1.41 0zM4.93 5.34a1 1 0 010-1.41h0a1 1 0 010 1.41zm13.73-1.41a1 1 0 010 1.41h0a1 1 0 010-1.41zM4.93 18.66a1 1 0 010-1.41h0a1 1 0 010 1.41z" />
                </svg>
              )}
            </span>
          </button>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        <section className="relative flex flex-col items-center justify-center py-20 px-6 overflow-hidden text-center">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {darkMode ? (
              <>
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
              </>
            ) : (
              <>
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
              </>
            )}
          </div>

          <div className="relative z-10 max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-500 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-blue-500/20 dark:border-blue-400/20 animate-fade-in-up">
              <ShieldCheck className="w-4 h-4" />
              100% Private • No Login Required
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Upload your data to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-shift">see unfollowers</span> safely.
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              No password sharing. No API risks. Simply export your profile data and upload the files to instantly identify who isn't following you back.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <button
                onClick={() => onNavigate('import')}
                className="py-4 px-10 rounded-2xl font-bold text-lg bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-xl shadow-purple-500/20 hover:scale-105 hover:shadow-purple-500/30 transition-all duration-300 transform flex items-center gap-3 w-full sm:w-auto justify-center group"
              >
                <ArrowUpCircle className="w-6 h-6 transition-transform group-hover:scale-110" />
                Upload Data to Start
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 pt-8 opacity-70 grayscale transition-all duration-500 hover:grayscale-0 hover:opacity-100 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`w-10 h-10 rounded-full border-2 ${darkMode ? 'border-[#0F111A]' : 'border-white'} bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 overflow-hidden animate-bounce-in`} style={{ animationDelay: `${i * 100}ms` }}>
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="user" className="w-full h-full" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Join 10,000+ users using the secure method
              </p>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-24 bg-white/50 dark:bg-white/5 border-y border-slate-200 dark:border-slate-800/50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Three Simple Steps</h2>
              <p className="text-slate-500 dark:text-slate-400">The safest way to analyze your account. No login credentials needed, ever.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Upload className="w-8 h-8" />,
                  title: "1. Export Data",
                  desc: "Request a data export from your social profile settings. It usually takes just a few minutes.",
                  color: "text-blue-500",
                  bg: "bg-gradient-to-br from-blue-500/10 to-blue-600/10"
                },
                {
                  icon: <ArrowUpCircle className="w-8 h-8" />,
                  title: "2. Upload Files",
                  desc: "Upload the JSON or HTML files containing your followers and following lists to our secure tool.",
                  color: "text-purple-500",
                  bg: "bg-gradient-to-br from-purple-500/10 to-purple-600/10"
                },
                {
                  icon: <BarChart3 className="w-8 h-8" />,
                  title: "3. See Results",
                  desc: "We process the data locally in your browser and show you exactly who isn't following you back.",
                  color: "text-pink-500",
                  bg: "bg-gradient-to-br from-pink-500/10 to-pink-600/10"
                }
              ].map((step, idx) => (
                <div 
                  key={idx} 
                  className={`bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800/60 p-8 rounded-2xl flex flex-col items-center text-center hover:-translate-y-2 transition-all duration-500 shadow-sm hover:shadow-xl animate-fade-in-up`}
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  <div className={`w-16 h-16 rounded-2xl ${step.bg} ${step.color} flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110`}>
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{step.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-purple-900/30 dark:from-surface-dark dark:to-purple-900/20 border border-slate-800 p-12 flex flex-col md:flex-row items-center justify-between gap-12 animate-scale-in">
              <div className={`absolute top-0 right-0 w-96 h-96 ${darkMode ? 'bg-blue-600/20' : 'bg-blue-400/25'} rounded-full blur-[100px] pointer-events-none animate-pulse`} />

              <div className="relative z-10 flex flex-col gap-6 max-w-xl">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                  Your data stays with you
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                  By using the data upload method, your account password is never required. We process your files locally and never store your personal data on our servers.
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-8">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center text-blue-500 animate-float">
                    <Lock className="w-8 h-8" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">No Login</span>
                </div>
                <div className="h-16 w-px bg-gradient-to-b from-transparent via-slate-800 to-transparent" />
                <div className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500/10 to-green-600/10 flex items-center justify-center text-green-500 animate-float" style={{ animationDelay: '500ms' }}>
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Secure</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 text-center px-6 bg-gradient-to-b from-white/50 to-blue-50/30 dark:from-white/5 dark:to-purple-900/10 border-t border-slate-200 dark:border-slate-800/50">
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Ready to see your profile insights?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Download your data, upload it here, and get results in seconds.
            </p>
            <button
              onClick={() => onNavigate('import')}
              className="py-4 px-10 rounded-2xl font-bold text-lg bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-xl shadow-purple-500/20 hover:scale-105 hover:shadow-purple-500/30 transition-all duration-300 inline-flex items-center gap-3 group"
            >
              <ArrowUpCircle className="w-6 h-6 transition-transform group-hover:scale-110" />
              Upload Data to Start
            </button>
            <p className="text-xs font-medium text-slate-500 flex items-center justify-center gap-2">
              <Lock className="w-3 h-3" />
              Private & Anonymous. No connection to your live account.
            </p>
          </div>
        </section>
      </main>

      <footer className="relative z-10 py-12 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-gradient-to-t dark:from-background-dark dark:to-[#0A0D14] text-center animate-fade-in-up">
        <p className="text-sm text-slate-500 dark:text-slate-600 mb-4">
          © 2026 FollowMate. All rights reserved. This tool processes data locally. <br></br>No affiliation with any social platform.
        </p>
      </footer>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-slide-down { animation: slide-down 0.4s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-scale-in { animation: scale-in 0.5s ease-out; }
        .animate-bounce-in { animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        .animate-gradient-shift { background-size: 200% auto; animation: gradient-shift 3s ease infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Home;