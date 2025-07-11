import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import AudioPlayer from '../components/AudioPlayer';

const sampleTrack = {
  id: '1',
  url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  title: 'Sample Song',
  artist: 'Sample Artist',
};

const HomeScreen = ({ navigation }) => (
  <View style={styles.container}>
    <AudioPlayer track={sampleTrack} />
    <Button title="Upload Song" onPress={() => navigation.navigate('UploadSong')} />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default HomeScreen;