import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import TrackPlayer, { usePlaybackState, useProgress } from 'react-native-track-player';
import { Button, Text } from 'react-native-paper';

const AudioPlayer = ({ track }) => {
  const playbackState = usePlaybackState();
  const progress = useProgress();
  const [isSetup, setIsSetup] = useState(false);

  useEffect(() => {
    async function setup() {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add(track);
      setIsSetup(true);
    }
    setup();
    return () => { TrackPlayer.destroy(); };
  }, [track]);

  const handlePlayPause = async () => {
    if (playbackState === 'playing') {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  return (
    <View style={styles.container}>
      <Text>{track.title}</Text>
      <Text>{Math.floor(progress.position)} / {Math.floor(progress.duration)} sec</Text>
      <Button mode="contained" onPress={handlePlayPause} disabled={!isSetup}>
        {playbackState === 'playing' ? 'Pause' : 'Play'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 16 },
});

export default AudioPlayer;