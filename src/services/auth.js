import { useMemo } from 'react';

export function useAuth() {
  // Mock user for now
  return useMemo(() => ({ user: { isArtist: true, id: 'mock-user-id' } }), []);
}