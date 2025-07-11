export interface User {
  id: string;
  email: string;
  role: 'listener' | 'artist' | 'admin';
  name: string;
  // Add more fields as needed
}