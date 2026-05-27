import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CustomVideoPlayerProps {
  url: string;
}

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({ url }) => {
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  
  const playerRef = useRef<ReactPlayer>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Intersection Observer to auto-play when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setPlaying(true);
            setHasStarted(true);
          } else if (!entry.isIntersecting && playing) {
            setPlaying(false);
          }
        });
      },
      { threshold: 0.5 } // Play when 50% visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [hasStarted, playing]);

  const handlePlayPause = () => {
    setPlaying(!playing);
    if (!hasStarted) setHasStarted(true);
  };

  const handleProgress = (state: { played: number }) => {
    setPlayed(state.played);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setPlayed(newValue);
    if (playerRef.current) {
      playerRef.current.seekTo(newValue);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (playing) {
        setShowControls(false);
      }
    }, 2500);
  };

  return (
    <div 
      ref={containerRef}
      className="w-full aspect-video bg-[#050505] border border-white/5 rounded-2xl sm:rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden group cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => playing && setShowControls(false)}
      onClick={handlePlayPause}
    >
      {/* Invisible overlay to block YouTube native clicks but let our clicks through */}
      <div className="absolute inset-0 z-10" />

      {/* ReactPlayer Container */}
      <div className="absolute inset-0 w-[300%] h-[300%] -top-[100%] -left-[100%] pointer-events-none opacity-0 transition-opacity duration-1000" style={{ opacity: hasStarted ? 1 : 0 }}>
        {/* We scale the iframe container to crop out the youtube logo if needed, but react-player does a good job. 
            Actually, let's keep it 100% and just use the overlay to block clicks. */}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <ReactPlayer
          ref={playerRef}
          url={url}
          width="100%"
          height="100%"
          playing={playing}
          controls={false}
          onProgress={handleProgress}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          config={{
            youtube: {
              playerVars: { 
                showinfo: 0, 
                modestbranding: 1, 
                rel: 0,
                disablekb: 1,
                iv_load_policy: 3,
                fs: 0
              }
            }
          }}
        />
      </div>

      {/* Custom Overlay & Controls */}
      <div className={`absolute inset-0 flex flex-col justify-between transition-opacity duration-500 z-20 ${showControls || !playing ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Top Header / Warning */}
        <div className="w-full p-6 bg-gradient-to-b from-black/80 to-transparent flex items-start">
           <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/40 backdrop-blur-md border border-white/10">
             <div className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
             <span className="text-[10px] font-bold tracking-widest uppercase text-white/90">Saiba o que é a NG</span>
           </div>
        </div>

        {/* Big Center Play/Pause Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence>
            {(!playing || showControls) && (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="w-20 h-20 sm:w-24 sm:h-24 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10 hover:bg-ngGold-500/20 hover:border-ngGold-500/50 transition-all shadow-[0_0_50px_rgba(0,0,0,0.5)]"
              >
                {playing ? (
                  <Pause className="w-10 h-10 text-white ml-0" fill="currentColor" />
                ) : (
                  <Play className="w-10 h-10 text-white ml-2" fill="currentColor" />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Control Bar */}
        <div className="w-full px-6 py-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center gap-4 mt-auto">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handlePlayPause();
            }}
            className="text-white hover:text-ngGold-500 transition-colors"
          >
            {playing ? <Pause className="w-6 h-6" fill="currentColor" /> : <Play className="w-6 h-6" fill="currentColor" />}
          </button>
          
          <div className="flex-1 relative flex items-center group/slider h-6" onClick={(e) => e.stopPropagation()}>
            <input
              type="range"
              min={0}
              max={1}
              step="any"
              value={played}
              onChange={handleSeek}
              className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer outline-none relative z-20"
              style={{
                background: `linear-gradient(to right, #C5A059 ${played * 100}%, rgba(255,255,255,0.2) ${played * 100}%)`
              }}
            />
            {/* Tailwind classes for the range thumb thumb styling is best done in index.css, 
                but for simplicity inline style gradient works perfectly for the track. */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomVideoPlayer;
