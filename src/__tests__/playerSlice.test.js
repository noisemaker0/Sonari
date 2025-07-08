import playerReducer, { setTrack, setPlaying, setQueue } from '../store/playerSlice';

describe('playerSlice', () => {
  const initialState = {
    currentTrack: null,
    isPlaying: false,
    queue: [],
    currentTrackIndex: 0,
    shuffle: false,
    repeat: false,
  };

  it('should return initial state', () => {
    expect(playerReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle setTrack', () => {
    const track = { id: '1', title: 'Test Song' };
    const state = playerReducer(initialState, setTrack(track));
    expect(state.currentTrack).toEqual(track);
  });

  it('should handle setPlaying', () => {
    const state = playerReducer(initialState, setPlaying(true));
    expect(state.isPlaying).toBe(true);
  });

  it('should handle setQueue', () => {
    const queue = [
      { id: '1', title: 'Song 1' },
      { id: '2', title: 'Song 2' },
    ];
    const state = playerReducer(initialState, setQueue(queue));
    expect(state.queue).toEqual(queue);
  });
});