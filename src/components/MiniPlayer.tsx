
import React from 'react';
import { Play, Pause, SkipForward } from 'lucide-react';
import { usePlayer } from '@/contexts/PlayerContext';

interface MiniPlayerProps {
  onExpandClick: () => void;
}

export default function MiniPlayer({ onExpandClick }: MiniPlayerProps) {
  const { currentTrack, isPlaying, togglePlay, next } = usePlayer();

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border/50 pb-safe">
      <div className="flex items-center justify-between p-3">
        <div 
          className="flex items-center space-x-3 flex-1 min-w-0 cursor-pointer"
          onClick={onExpandClick}
        >
          <img
            src={currentTrack.coverArt}
            alt={currentTrack.title}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-foreground truncate">
              {currentTrack.title}
            </h3>
            <p className="text-xs text-muted-foreground truncate">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={togglePlay}
            className="control-button play w-10 h-10"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button
            onClick={next}
            className="control-button secondary w-10 h-10"
          >
            <SkipForward size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
