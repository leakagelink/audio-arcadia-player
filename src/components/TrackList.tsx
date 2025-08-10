
import React from 'react';
import { Play, Pause, MoreVertical } from 'lucide-react';
import { usePlayer, Track } from '@/contexts/PlayerContext';

interface TrackListProps {
  tracks: Track[];
  showHeader?: boolean;
}

export default function TrackList({ tracks, showHeader = true }: TrackListProps) {
  const { currentTrack, isPlaying, play, pause } = usePlayer();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTrackPress = (track: Track) => {
    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        pause();
      } else {
        play();
      }
    } else {
      play(track);
    }
  };

  return (
    <div className="space-y-2">
      {showHeader && (
        <div className="px-4 py-2">
          <h2 className="text-lg font-semibold text-foreground">Your Music</h2>
          <p className="text-sm text-muted-foreground">{tracks.length} songs</p>
        </div>
      )}
      
      {tracks.map((track, index) => {
        const isCurrentTrack = currentTrack?.id === track.id;
        const isCurrentlyPlaying = isCurrentTrack && isPlaying;
        
        return (
          <div
            key={track.id}
            onClick={() => handleTrackPress(track)}
            className={`music-card mx-4 ${isCurrentTrack ? 'border-primary bg-primary/5' : ''}`}
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={track.coverArt}
                  alt={track.title}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                {isCurrentTrack && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                    {isCurrentlyPlaying ? (
                      <Pause size={20} className="text-white" />
                    ) : (
                      <Play size={20} className="text-white" />
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className={`font-medium truncate ${
                  isCurrentTrack ? 'text-primary' : 'text-foreground'
                }`}>
                  {track.title}
                </h3>
                <p className="text-sm text-muted-foreground truncate">
                  {track.artist}
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground">
                  {formatTime(track.duration)}
                </span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    // TODO: Show track options
                  }}
                  className="control-button secondary w-8 h-8"
                >
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
