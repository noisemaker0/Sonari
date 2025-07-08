import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { List, IconButton } from 'react-native-paper';

const SongList = ({ songs, onSongPress, onAddToPlaylist }) => {
  const renderSong = ({ item }) => (
    <List.Item
      title={item.title}
      description={item.artist}
      left={() => <List.Icon icon="music" />}
      right={() => (
        <IconButton
          icon="plus"
          onPress={() => onAddToPlaylist(item)}
        />
      )}
      onPress={() => onSongPress(item)}
    />
  );

  return (
    <FlatList
      data={songs}
      renderItem={renderSong}
      keyExtractor={(item) => item.id}
    />
  );
};

export default SongList;