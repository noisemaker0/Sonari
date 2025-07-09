import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { List, Chip, Text } from 'react-native-paper';

const SearchResults = ({ results, onResultPress, filters = ['songs', 'artists', 'albums'] }) => {
  const renderResult = ({ item }) => (
    <List.Item
      title={item.title || item.displayName}
      description={item.artist || item.genre}
      left={() => <List.Icon icon={item.type === 'song' ? 'music' : item.type === 'artist' ? 'account' : 'album'} />}
      onPress={() => onResultPress(item)}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        {filters.map((filter) => (
          <Chip key={filter} style={styles.chip}>
            {filter}
          </Chip>
        ))}
      </View>
      <FlatList
        data={results}
        renderItem={renderResult}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No results found</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  filters: { flexDirection: 'row', padding: 16 },
  chip: { marginRight: 8 },
});

export default SearchResults;