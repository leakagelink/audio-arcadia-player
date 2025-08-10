
import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { usePlayer } from '@/contexts/PlayerContext';
import TrackList from './TrackList';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { queue } = usePlayer();

  const filteredTracks = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return queue.filter(track =>
      track.title.toLowerCase().includes(query) ||
      track.artist.toLowerCase().includes(query) ||
      track.album.toLowerCase().includes(query)
    );
  }, [searchQuery, queue]);

  return (
    <div className="flex-1 p-4 pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold gradient-text mb-4">Search</h1>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Search songs, artists, albums..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-border/50 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          />
        </div>
      </div>

      {searchQuery.trim() ? (
        <div>
          {filteredTracks.length > 0 ? (
            <TrackList tracks={filteredTracks} showHeader={false} />
          ) : (
            <div className="text-center py-12">
              <Search className="mx-auto mb-4 text-muted-foreground" size={48} />
              <h3 className="text-lg font-medium text-foreground mb-2">No results found</h3>
              <p className="text-muted-foreground">
                Try searching for something else
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <Search className="mx-auto mb-4 text-muted-foreground" size={48} />
          <h3 className="text-lg font-medium text-foreground mb-2">Start searching</h3>
          <p className="text-muted-foreground">
            Find your favorite songs, artists, and albums
          </p>
        </div>
      )}
    </div>
  );
}
