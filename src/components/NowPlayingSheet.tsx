
import React from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle 
} from '@/components/ui/sheet';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Heart, 
  Shuffle, 
  Repeat, 
  MoreHorizontal,
  Volume2
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { usePlayer } from '@/contexts/PlayerContext';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

interface NowPlayingSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function NowPlayingSheet({ isOpen, onOpenChange }: NowPlayingSheetProps) {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isLiked,
    repeatMode,
    isShuffleOn,
    togglePlay,
    next,
    prev,
    seek,
    setVolume,
    toggleShuffle,
    setRepeatMode,
    toggleLike,
  } = usePlayer();

  if (!currentTrack) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch (error) {
      // Haptics not available, continue without
    }
    togglePlay();
  };

  const handleNext = async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Medium });
    } catch (error) {
      // Haptics not available, continue without
    }
    next();
  };

  const handlePrev = async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Medium });
    } catch (error) {
      // Haptics not available, continue without
    }
    prev();
  };

  const handleLike = async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch (error) {
      // Haptics not available, continue without
    }
    toggleLike();
  };

  const handleRepeat = () => {
    const modes: ['off', 'all', 'one'] = ['off', 'all', 'one'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setRepeatMode(nextMode);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent 
        side="bottom" 
        className="h-screen rounded-t-none border-none bg-gradient-to-br from-background via-secondary/50 to-background p-0"
      >
        <div className="flex flex-col h-full pt-8 px-6 pb-safe">
          {/* Header */}
          <SheetHeader className="flex-row items-center justify-between space-y-0 mb-8">
            <SheetTitle className="text-sm font-medium text-muted-foreground">
              Now Playing
            </SheetTitle>
            <button className="control-button secondary">
              <MoreHorizontal size={20} />
            </button>
          </SheetHeader>

          {/* Album Art */}
          <div className="flex-1 flex items-center justify-center mb-8">
            <div className="w-80 h-80 max-w-[90vw] max-h-[40vh] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={currentTrack.coverArt}
                alt={currentTrack.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Track Info */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2 px-4">
              {currentTrack.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-1">
              {currentTrack.artist}
            </p>
            <p className="text-sm text-muted-foreground/80">
              {currentTrack.album}
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8 px-2">
            <Slider
              value={[progress]}
              onValueChange={([value]) => seek((value / 100) * duration)}
              max={100}
              step={0.1}
              className="mb-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Main Controls */}
          <div className="flex items-center justify-center space-x-8 mb-8">
            <button
              onClick={toggleShuffle}
              className={`control-button ${isShuffleOn ? 'text-primary' : 'secondary'}`}
            >
              <Shuffle size={20} />
            </button>
            
            <button
              onClick={handlePrev}
              className="control-button secondary"
            >
              <SkipBack size={24} />
            </button>
            
            <button
              onClick={handlePlayPause}
              className="control-button play w-16 h-16"
            >
              {isPlaying ? <Pause size={28} /> : <Play size={28} />}
            </button>
            
            <button
              onClick={handleNext}
              className="control-button secondary"
            >
              <SkipForward size={24} />
            </button>
            
            <button
              onClick={handleRepeat}
              className={`control-button ${repeatMode !== 'off' ? 'text-primary' : 'secondary'} relative`}
            >
              <Repeat size={20} />
              {repeatMode === 'one' && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full text-[8px] flex items-center justify-center text-background font-bold">
                  1
                </span>
              )}
            </button>
          </div>

          {/* Additional Controls */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleLike}
              className={`control-button ${isLiked ? 'text-red-500' : 'secondary'}`}
            >
              <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
            </button>
            
            <div className="flex items-center space-x-3 flex-1 max-w-32 mx-8">
              <Volume2 size={16} className="text-muted-foreground" />
              <Slider
                value={[volume * 100]}
                onValueChange={([value]) => setVolume(value / 100)}
                max={100}
                step={1}
                className="flex-1"
              />
            </div>
            
            <div className="w-10" /> {/* Spacer for balance */}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
