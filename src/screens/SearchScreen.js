import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Searchbar, List, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { searchContent } from '../store/searchSlice';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { results, loading } = useSelector((state) => state.search);

  const handleSearch = () => {
    if (query.trim()) {
      dispatch(searchContent(query));
    }
  };

  const renderResult = ({ item, type }) => (
    <List.Item
      title={item.title || item.displayName}
      description={item.artist || item.genre}
      left={() => <List.Icon icon={type === 'song' ? 'music' : type === 'artist' ? 'account' : 'album'} />}
      onPress={() => {/* TODO: Navigate to detail */}}
    />
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search songs, artists, albums..."
        onChangeText={setQuery}
        value={query}
        onSubmitEditing={handleSearch}
        style={styles.searchBar}
      />
      {loading ? (
        <Text>Searching...</Text>
      ) : (
        <FlatList
          data={results}
          renderItem={renderResult}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text>No results found</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  searchBar: { marginBottom: 16 },
});

export default SearchScreen;