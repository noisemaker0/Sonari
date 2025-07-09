import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import TrackPlayer from 'react-native-track-player';

const PlayerControls = ({ isPlaying, onPlayPause, onNext, onPrevious, shuffle, repeat, onShuffle, onRepeat }) => {
  return (
    <View style={styles.container}>
      <IconButton icon="shuffle" onPress={onShuffle} iconColor={shuffle ? '#1DB954' : '#666'} />
      <IconButton icon="skip-previous" onPress={onPrevious} size={32} />
      <IconButton icon={isPlaying ? 'pause' : 'play'} onPress={onPlayPause} size={40} />
      <IconButton icon="skip-next" onPress={onNext} size={32} />
      <IconButton icon="repeat" onPress={onRepeat} iconColor={repeat ? '#1DB954' : '#666'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 16 },
});

export default PlayerControls;