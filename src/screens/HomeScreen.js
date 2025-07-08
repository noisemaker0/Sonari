import React from 'react';
import { View, StyleSheet } from 'react-native';
import AudioPlayer from '../components/AudioPlayer';

const sampleTrack = {
  id: '1',
  url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  title: 'Sample Song',
  artist: 'Sample Artist',
};

const HomeScreen = () => (
  <View style={styles.container}>
    <AudioPlayer track={sampleTrack} />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default HomeScreen;