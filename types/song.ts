export interface Song {
  id: string;
  title: string;
  artistId: string;
  duration: number; // seconds
  audioUrl: string;
  coverArtUrl?: string;
  genres?: string[];
  explicit?: boolean;
  // Add more fields as needed
}