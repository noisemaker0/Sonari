export interface Playlist {
  id: string;
  name: string;
  ownerId: string;
  songIds: string[];
  isPublic: boolean;
  coverArtUrl?: string;
  // Add more fields as needed
}