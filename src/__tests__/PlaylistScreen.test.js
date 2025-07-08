import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PlaylistScreen from '../screens/PlaylistScreen';

const mockStore = configureStore([]);

describe('PlaylistScreen', () => {
  let store;
  const mockPlaylist = {
    id: '1',
    name: 'Test Playlist',
    songs: [
      { id: '1', title: 'Song 1', artist: 'Artist 1' },
      { id: '2', title: 'Song 2', artist: 'Artist 2' },
    ],
  };

  beforeEach(() => {
    store = mockStore({
      playlists: { playlists: [mockPlaylist] }
    });
  });

  it('renders playlist information', () => {
    const { getByText } = render(
      <Provider store={store}>
        <PlaylistScreen route={{ params: { playlistId: '1' } }} />
      </Provider>
    );

    expect(getByText('Test Playlist')).toBeTruthy();
    expect(getByText('2 songs')).toBeTruthy();
  });

  it('displays playlist songs', () => {
    const { getByText } = render(
      <Provider store={store}>
        <PlaylistScreen route={{ params: { playlistId: '1' } }} />
      </Provider>
    );

    expect(getByText('Song 1')).toBeTruthy();
    expect(getByText('Song 2')).toBeTruthy();
  });
});