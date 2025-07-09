import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { List, Text, Button } from 'react-native-paper';
import { useSelector } from 'react-redux';

const PlaylistScreen = ({ route }) => {
  const { playlistId } = route.params;
  const playlist = useSelector((state) => 
    state.playlists.playlists.find(p => p.id === playlistId)
  );

  const renderSong = ({ item }) => (
    <List.Item
      title={item.title}
      description={item.artist}
      left={() => <List.Icon icon="music" />}
      onPress={() => {/* TODO: Play song */}}
    />
  );

  if (!playlist) {
    return <Text>Playlist not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">{playlist.name}</Text>
      <Text variant="bodyMedium">{playlist.songs?.length || 0} songs</Text>
      <Button mode="contained" style={styles.playButton}>
        Play All
      </Button>
      <FlatList
        data={playlist.songs}
        renderItem={renderSong}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No songs in playlist</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  playButton: { marginVertical: 16 },
});

export default PlaylistScreen;