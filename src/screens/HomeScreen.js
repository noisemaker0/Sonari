import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import AudioPlayer from '../components/AudioPlayer';
import { useAuth } from '../services/auth';

const sampleTrack = {
  id: '1',
  url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  title: 'Sample Song',
  artist: 'Sample Artist',
};

const HomeScreen = ({ navigation }) => {
  const { user } = useAuth();
  return (
    <View style={styles.container}>
      <AudioPlayer track={sampleTrack} />
      {user && user.isArtist && (
        <Button title="Upload Song" onPress={() => navigation.navigate('UploadSong')} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default HomeScreen;