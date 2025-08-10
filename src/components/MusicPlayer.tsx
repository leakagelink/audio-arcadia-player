
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Shuffle, Repeat } from 'lucide-react';

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverArt: string;
  audioUrl: string;
}

const DEMO_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Midnight Dreams',
    artist: 'Luna Echo',
    album: 'Cosmic Waves',
    duration: 245,
    coverArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundjay.com/misc/sounds/magic-chime-02.mp3'
  },
  {
    id: '2',
    title: 'Electric Pulse',
    artist: 'Neon Synth',
    album: 'Digital Horizon',
    duration: 198,
    coverArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundjay.com/misc/sounds/magic-chime-02.mp3'
  },
  {
    id: '3',
    title: 'Ocean Breeze',
    artist: 'Ambient Waves',
    album: 'Serenity',
    duration: 312,
    coverArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundjay.com/misc/sounds/magic-chime-02.mp3'
  }
];

export default function MusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState<Track>(DEMO_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isLiked, setIsLiked] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * currentTrack.duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const nextTrack = () => {
    const currentIndex = DEMO_TRACKS.findIndex(track => track.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % DEMO_TRACKS.length;
    setCurrentTrack(DEMO_TRACKS[nextIndex]);
    setCurrentTime(0);
  };

  const prevTrack = () => {
    const currentIndex = DEMO_TRACKS.findIndex(track => track.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + DEMO_TRACKS.length) % DEMO_TRACKS.length;
    setCurrentTrack(DEMO_TRACKS[prevIndex]);
    setCurrentTime(0);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div className="h-screen bg-gradient-to-br from-background via-secondary/50 to-background flex flex-col">
      {/* Header */}
      <header className="p-6 border-b border-border/50">
        <h1 className="text-3xl font-bold gradient-text">Music Player</h1>
        <p className="text-muted-foreground mt-1">Discover your sound</p>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Track List */}
        <aside className="w-80 p-6 border-r border-border/50 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Now Playing</h2>
          <div className="space-y-3">
            {DEMO_TRACKS.map((track) => (
              <div
                key={track.id}
                onClick={() => {
                  setCurrentTrack(track);
                  setCurrentTime(0);
                }}
                className={`music-card ${currentTrack.id === track.id ? 'border-primary' : ''}`}
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={track.coverArt}
                    alt={track.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate">{track.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(track.duration)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Player Area */}
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-md w-full">
            {/* Album Art */}
            <div className="relative mb-8 group">
              <div className="w-80 h-80 mx-auto rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={currentTrack.coverArt}
                  alt={currentTrack.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Track Info */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">{currentTrack.title}</h2>
              <p className="text-muted-foreground">{currentTrack.artist}</p>
              <p className="text-sm text-muted-foreground/80">{currentTrack.album}</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="progress-bar mb-2" onClick={handleProgressClick}>
                <div
                  className="progress-fill"
                  style={{ width: `${(currentTime / currentTrack.duration) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(currentTrack.duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-4 mb-6">
              <button className="control-button secondary">
                <Shuffle size={16} />
              </button>
              <button onClick={prevTrack} className="control-button secondary">
                <SkipBack size={20} />
              </button>
              <button onClick={togglePlay} className="control-button play">
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              <button onClick={nextTrack} className="control-button secondary">
                <SkipForward size={20} />
              </button>
              <button className="control-button secondary">
                <Repeat size={16} />
              </button>
            </div>

            {/* Additional Controls */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`control-button ${isLiked ? 'text-red-500' : 'secondary'}`}
              >
                <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
              </button>
              
              <div className="flex items-center space-x-2">
                <Volume2 size={16} className="text-muted-foreground" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="volume-slider w-20"
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextTrack}
      />
    </div>
  );
}
