import React, { useState, useEffect } from 'react';
import { RotateCcw, Home as HomeIcon, LayoutDashboard, UserMinus, Heart, BarChart3, Filter, Moon, Sun, Menu, X } from 'lucide-react';
import FileUpload from './components/FileUpload';
import Dashboard from './components/Dashboard';
import UserList from './components/UserList';
import LoadingScreen from './components/LoadingScreen';
import Home from './components/Home';
import InstagramLogo from './components/InstagramLogo';
import { parseJSON, parseHTML } from './utils/parser';
import { analyzeRelationships } from './utils/analyzer';

function App() {
  const [view, setView] = useState('loading');
  const [subView, setSubView] = useState('dashboard');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Mobile sidebar state
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Lock body scroll when sidebar is open on mobile
  useEffect(() => {
    if (mobileSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileSidebarOpen]);

  const handleLoadingComplete = () => {
    setIsLoadingComplete(true);
    setTimeout(() => {
      setView('home');
    }, 300);
  };

  useEffect(() => {
    if (!isLoadingComplete) {
      const timer = setTimeout(() => {
        handleLoadingComplete();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isLoadingComplete]);

  const processFile = async (file, format) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        try {
          let result = [];
          if (format === 'json') {
            result = parseJSON(content);
          } else {
            result = parseHTML(content);
          }
          resolve(result);
        } catch (err) {
          reject(err);
        }
      };
      reader.readAsText(file);
    });
  };

  const handleUpload = async (fileFollowers, fileFollowing, format) => {
    setLoading(true);
    setError(null);
    try {
      const [followers, following] = await Promise.all([
        processFile(fileFollowers, format),
        processFile(fileFollowing, format)
      ]);

      if (followers.length === 0 && following.length === 0) {
        throw new Error("No usernames found. Please check your files.");
      }

      const stats = analyzeRelationships(followers, following);
      setData(stats);
      setView('dashboard');
      setSubView('dashboard');
    } catch (err) {
      console.error(err);
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setData(null);
    setError(null);
    setView('import');
  };

  const handleFullReset = () => {
    setData(null);
    setError(null);
    setView('home');
  };

  const renderDashboardContent = () => {
    if (!data) return null;

    switch (subView) {
      case 'non-followers':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
              <button onClick={() => setSubView('dashboard')} className="hover:text-primary transition-colors">Dashboard</button>
              <span>/</span>
              <span className="text-slate-900 dark:text-white font-medium">Non-Followers</span>
            </div>
            <UserList
              users={data.notFollowingBack}
              title="Users Who Don't Follow Back"
              type="non-followers"
              fullPage={true}
            />
          </div>
        );
      case 'fans':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
              <button onClick={() => setSubView('dashboard')} className="hover:text-primary transition-colors">Dashboard</button>
              <span>/</span>
              <span className="text-slate-900 dark:text-white font-medium">Your Fans</span>
            </div>
            <UserList
              users={data.fans}
              title="Your Fans (You Don't Follow Back)"
              type="fans"
              fullPage={true}
            />
          </div>
        );
      default:
        return (
          <div className="space-y-8">
            <div className="animate-slide-up-fade">
              <Dashboard stats={data.stats} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="animate-slide-up-fade" style={{ animationDelay: '100ms' }}>
                <UserList
                  users={data.notFollowingBack.slice(0, 5)}
                  title="Recent Non-Followers"
                  type="non-followers"
                />
                {data.notFollowingBack.length > 5 && (
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => setSubView('non-followers')}
                      className="text-sm font-bold text-blue-500 hover:text-blue-400 hover:underline transition-all"
                    >
                      View all {data.notFollowingBack.length} users →
                    </button>
                  </div>
                )}
              </div>

              <div className="animate-slide-up-fade" style={{ animationDelay: '200ms' }}>
                <UserList
                  users={data.fans.slice(0, 5)}
                  title="Recent Fans"
                  type="fans"
                />
                {data.fans.length > 5 && (
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => setSubView('fans')}
                      className="text-sm font-bold text-blue-500 hover:text-blue-400 hover:underline transition-all"
                    >
                      View all {data.fans.length} users →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  if (view === 'loading') {
    return <LoadingScreen onComplete={handleLoadingComplete} darkMode={darkMode} />;
  }

  if (view === 'home') {
    return <Home onNavigate={setView} darkMode={darkMode} toggleTheme={toggleTheme} />;
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-sans text-slate-900 dark:text-white transition-colors duration-500 ease-in-out flex">
      {view === 'dashboard' && (
        <>
          {/* Desktop sidebar (md and up) */}
          <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-gradient-to-b dark:from-[#0F111A] dark:to-[#1a0b2e] hidden md:flex flex-col sticky top-0 h-screen z-20 shrink-0 animate-slide-in-left">
            <div className="p-6 flex items-center gap-3 cursor-pointer" onClick={handleFullReset}>
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg shadow-lg">
                <InstagramLogo className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-lg dark:text-white tracking-tight bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                FollowMate
              </span>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-6">
              <button
                onClick={() => setSubView('dashboard')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] ${subView === 'dashboard' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl shadow-purple-500/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'}`}
              >
                <LayoutDashboard className="w-5 h-5" />
                Dashboard
              </button>
              <button
                onClick={() => setSubView('non-followers')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] ${subView === 'non-followers' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl shadow-purple-500/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'}`}
              >
                <UserMinus className="w-5 h-5" />
                Non-Followers
              </button>
              <button
                onClick={() => setSubView('fans')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] ${subView === 'fans' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl shadow-purple-500/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'}`}
              >
                <Heart className="w-5 h-5" />
                Favorite Fans
              </button>
            </nav>
          </aside>

          {/* Mobile off-canvas sidebar */}
          {mobileSidebarOpen && (
            <div className="fixed inset-0 z-30 md:hidden" aria-hidden={!mobileSidebarOpen}>
              <div className="fixed inset-0 bg-black/40 animate-fade-in" onClick={() => setMobileSidebarOpen(false)} />
              <aside className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gradient-to-b dark:from-[#0F111A] dark:to-[#1a0b2e] border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-out animate-slide-in-left z-40`}>
                <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-3 cursor-pointer flex-1" onClick={() => { handleFullReset(); setMobileSidebarOpen(false); }}>
                    <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg shadow-lg">
                      <InstagramLogo className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-extrabold text-lg dark:text-white tracking-tight bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                      FollowMate
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/40 transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-6">
                  <button
                    onClick={() => { setSubView('dashboard'); setMobileSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] ${subView === 'dashboard' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl shadow-purple-500/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    Dashboard
                  </button>
                  <button
                    onClick={() => { setSubView('non-followers'); setMobileSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] ${subView === 'non-followers' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl shadow-purple-500/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    <UserMinus className="w-5 h-5" />
                    Non-Followers
                  </button>
                  <button
                    onClick={() => { setSubView('fans'); setMobileSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] ${subView === 'fans' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl shadow-purple-500/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    <Heart className="w-5 h-5" />
                    Favorite Fans
                  </button>
                </nav>
              </aside>
            </div>
          )}
        </>
      )}

      <div className="flex-1 flex flex-col min-h-screen relative overflow-x-hidden">
        <header className={`h-16 border-b border-slate-200 dark:border-slate-800/60 bg-white/80 dark:bg-gradient-to-r dark:from-[#0F111A]/80 dark:to-[#1a0b2e]/80 backdrop-blur-md sticky top-0 z-10 px-4 md:px-6 lg:px-8 flex items-center justify-between animate-fade-in ${view === 'import' ? 'bg-background-light/80' : ''}`}>
          
          {/* Mobile menu toggle */}
          {view === 'dashboard' && (
            <button
              onClick={() => setMobileSidebarOpen(true)}
              aria-label="Open menu"
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/40 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          {view === 'import' && (
            <div className="flex items-center gap-3 cursor-pointer" onClick={handleFullReset}>
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-1.5 rounded-lg shadow-lg">
                <InstagramLogo className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg dark:text-white tracking-tight hidden sm:inline">FollowMate</span>
            </div>
          )}
        {view === 'dashboard' && (
  <div className="flex items-center gap-2">
    <h2 className="font-bold text-lg dark:text-white hidden md:block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
      Analysis Dashboard
    </h2>
    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
  </div>
)}

          <div className="flex items-center gap-2 md:gap-4 ml-auto">
            {view === 'dashboard' && (
              <div className="text-xs text-slate-500 hidden sm:block">
                <span className="flex items-center gap-1">
                 
                  
                </span>
              </div>
            )}

            <button
              onClick={handleRefresh}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20 dark:shadow-purple-500/20 active:scale-95 flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">{view === 'import' ? 'Reset Upload' : 'Refresh Data'}</span>
              <span className="sm:hidden">{view === 'import' ? 'Reset' : 'Refresh'}</span>
            </button>
          </div>

          <div className="ml-2 md:ml-4">
            <button
              onClick={toggleTheme}
              className="relative w-12 md:w-14 h-8 rounded-full bg-gradient-to-r from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-700 transition-all duration-500"
              aria-label="Toggle Theme"
            >
              <span
                className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-gradient-to-br from-white to-slate-100 dark:from-slate-900 dark:to-slate-800 shadow-lg transform transition-all duration-500 flex items-center justify-center ${darkMode ? 'translate-x-4 md:translate-x-6' : 'translate-x-0'}`}
              >
                {darkMode ? (
                  <Moon className="w-4 h-4 text-blue-300" />
                ) : (
                  <Sun className="w-4 h-4 text-yellow-500" />
                )}
              </span>
            </button>
          </div>
        </header>

        <main className={`flex-1 ${view === 'import' ? 'flex flex-col items-center justify-center p-4 md:p-6' : 'p-4 md:p-6 lg:p-8'}`}>
          {view === 'import' && (
            <>
              {!loading ? (
                <div className="animate-fade-in-up">
                  <FileUpload onUpload={handleUpload} />
                </div>
              ) : (
                <div className="text-center z-10 animate-fade-in">
                  <div className="relative mx-auto mb-8">
                    <div className="w-24 h-24 border-4 border-blue-500/30 border-t-transparent rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 border-4 border-purple-500/30 border-l-transparent rounded-full animate-spin-reverse"></div>
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold dark:text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Analyzing Data...
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400">Processing your files locally for privacy.</p>
                </div>
              )}
            </>
          )}

          {view === 'dashboard' && renderDashboardContent()}

          {error && view === 'import' && (
            <div className="mt-8 p-4 bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 rounded-xl max-w-2xl text-center animate-shake">
              <p className="font-bold">Error Processing Files</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;