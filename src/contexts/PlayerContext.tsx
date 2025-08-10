
import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverArt: string;
  audioUrl: string;
}

export type RepeatMode = 'off' | 'one' | 'all';

interface PlayerContextType {
  // State
  currentTrack: Track | null;
  queue: Track[];
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isLiked: boolean;
  repeatMode: RepeatMode;
  isShuffleOn: boolean;
  
  // Actions
  play: (track?: Track) => void;
  pause: () => void;
  togglePlay: () => void;
  seek: (time: number) => void;
  next: () => void;
  prev: () => void;
  setVolume: (volume: number) => void;
  toggleShuffle: () => void;
  setRepeatMode: (mode: RepeatMode) => void;
  toggleLike: () => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (trackId: string) => void;
  setQueue: (tracks: Track[]) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

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
  },
  {
    id: '4',
    title: 'Urban Nights',
    artist: 'City Beats',
    album: 'Metropolitan',
    duration: 187,
    coverArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundjay.com/misc/sounds/magic-chime-02.mp3'
  },
  {
    id: '5',
    title: 'Stellar Journey',
    artist: 'Cosmic Explorer',
    album: 'Space Odyssey',
    duration: 278,
    coverArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
    audioUrl: 'https://www.soundjay.com/misc/sounds/magic-chime-02.mp3'
  }
];

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(DEMO_TRACKS[0]);
  const [queue, setQueueState] = useState<Track[]>(DEMO_TRACKS);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.7);
  const [isLiked, setIsLiked] = useState(false);
  const [repeatMode, setRepeatModeState] = useState<RepeatMode>('off');
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  // Load saved preferences
  useEffect(() => {
    const savedVolume = localStorage.getItem('player-volume');
    const savedShuffle = localStorage.getItem('player-shuffle');
    const savedRepeat = localStorage.getItem('player-repeat');
    
    if (savedVolume) setVolumeState(parseFloat(savedVolume));
    if (savedShuffle) setIsShuffleOn(savedShuffle === 'true');
    if (savedRepeat) setRepeatModeState(savedRepeat as RepeatMode);
  }, []);

  // Setup Media Session API
  useEffect(() => {
    if ('mediaSession' in navigator && currentTrack) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title,
        artist: currentTrack.artist,
        album: currentTrack.album,
        artwork: [
          { src: currentTrack.coverArt, sizes: '300x300', type: 'image/jpeg' }
        ]
      });

      navigator.mediaSession.setActionHandler('play', () => play());
      navigator.mediaSession.setActionHandler('pause', () => pause());
      navigator.mediaSession.setActionHandler('nexttrack', () => next());
      navigator.mediaSession.setActionHandler('previoustrack', () => prev());
    }
  }, [currentTrack]);

  const play = (track?: Track) => {
    if (track && track.id !== currentTrack?.id) {
      setCurrentTrack(track);
      setCurrentTime(0);
    }
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const next = () => {
    if (!currentTrack) return;
    
    const currentIndex = queue.findIndex(track => track.id === currentTrack.id);
    let nextIndex;
    
    if (isShuffleOn) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else {
      nextIndex = (currentIndex + 1) % queue.length;
    }
    
    if (repeatMode === 'one') {
      // Stay on current track
      seek(0);
      play();
    } else {
      const nextTrack = queue[nextIndex];
      if (nextTrack) {
        play(nextTrack);
      }
    }
  };

  const prev = () => {
    if (!currentTrack) return;
    
    if (currentTime > 3) {
      seek(0);
      return;
    }
    
    const currentIndex = queue.findIndex(track => track.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
    const prevTrack = queue[prevIndex];
    
    if (prevTrack) {
      play(prevTrack);
    }
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
    localStorage.setItem('player-volume', newVolume.toString());
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleShuffle = () => {
    const newShuffle = !isShuffleOn;
    setIsShuffleOn(newShuffle);
    localStorage.setItem('player-shuffle', newShuffle.toString());
  };

  const setRepeatMode = (mode: RepeatMode) => {
    setRepeatModeState(mode);
    localStorage.setItem('player-repeat', mode);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    // TODO: Persist to backend/localStorage
  };

  const addToQueue = (track: Track) => {
    setQueueState(prev => [...prev, track]);
  };

  const removeFromQueue = (trackId: string) => {
    setQueueState(prev => prev.filter(track => track.id !== trackId));
  };

  const setQueue = (tracks: Track[]) => {
    setQueueState(tracks);
  };

  // Audio event handlers
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    if (repeatMode === 'one') {
      seek(0);
      play();
    } else if (repeatMode === 'all' || queue.length > 1) {
      next();
    } else {
      setIsPlaying(false);
    }
  };

  // Update audio volume when state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        queue,
        isPlaying,
        currentTime,
        duration,
        volume,
        isLiked,
        repeatMode,
        isShuffleOn,
        play,
        pause,
        togglePlay,
        seek,
        next,
        prev,
        setVolume,
        toggleShuffle,
        setRepeatMode,
        toggleLike,
        addToQueue,
        removeFromQueue,
        setQueue,
      }}
    >
      {children}
      <audio
        ref={audioRef}
        src={currentTrack?.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
