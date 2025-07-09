import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AudioPlayer from '../components/AudioPlayer';

const mockStore = configureStore([]);

// Mock react-native-track-player
jest.mock('react-native-track-player', () => ({
  usePlaybackState: () => 'paused',
  useProgress: () => ({ position: 0, duration: 180 }),
  setupPlayer: jest.fn(),
  add: jest.fn(),
  play: jest.fn(),
  pause: jest.fn(),
  destroy: jest.fn(),
}));

describe('AudioPlayer', () => {
  let store;
  const mockTrack = {
    id: '1',
    url: 'https://example.com/song.mp3',
    title: 'Test Song',
    artist: 'Test Artist',
  };

  beforeEach(() => {
    store = mockStore({
      player: { isPlaying: false, shuffle: false, repeat: false }
    });
  });

  it('renders track information', () => {
    const { getByText } = render(
      <Provider store={store}>
        <AudioPlayer track={mockTrack} />
      </Provider>
    );

    expect(getByText('Test Song')).toBeTruthy();
  });

  it('displays progress information', () => {
    const { getByText } = render(
      <Provider store={store}>
        <AudioPlayer track={mockTrack} />
      </Provider>
    );

    expect(getByText('0 / 180 sec')).toBeTruthy();
  });
});