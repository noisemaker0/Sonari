import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SearchScreen from '../screens/SearchScreen';

const mockStore = configureStore([]);

describe('SearchScreen', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      search: { results: [], loading: false, error: null }
    });
  });

  it('renders search bar', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <SearchScreen />
      </Provider>
    );

    expect(getByPlaceholderText('Search songs, artists, albums...')).toBeTruthy();
  });

  it('handles search input', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <SearchScreen />
      </Provider>
    );

    const searchInput = getByPlaceholderText('Search songs, artists, albums...');
    fireEvent.changeText(searchInput, 'test query');

    expect(searchInput.props.value).toBe('test query');
  });
});