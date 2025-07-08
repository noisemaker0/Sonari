import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { List, Text } from 'react-native-paper';
import TrackPlayer from 'react-native-track-player';

const QueueManager = ({ queue, currentTrackIndex, onTrackPress }) => {
  const renderTrack = ({ item, index }) => (
    <List.Item
      title={item.title}
      description={item.artist}
      onPress={() => onTrackPress(index)}
      left={() => <List.Icon icon="music" />}
      style={index === currentTrackIndex ? styles.currentTrack : null}
    />
  );

  return (
    <View style={styles.container}>
      <Text variant="titleMedium">Queue</Text>
      <FlatList data={queue} renderItem={renderTrack} keyExtractor={(item) => item.id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  currentTrack: { backgroundColor: '#f0f0f0' },
});

export default QueueManager;