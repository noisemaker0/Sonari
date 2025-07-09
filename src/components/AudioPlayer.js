import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import TrackPlayer, { usePlaybackState, useProgress } from 'react-native-track-player';
import { Button, Text } from 'react-native-paper';
import PlayerControls from './PlayerControls';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaying, setShuffle, setRepeat } from '../store/playerSlice';
import { skipToNext, skipToPrevious } from '../services/queueService';

const AudioPlayer = ({ track }) => {
  const playbackState = usePlaybackState();
  const progress = useProgress();
  const [isSetup, setIsSetup] = useState(false);
  const dispatch = useDispatch();
  const { isPlaying, shuffle, repeat } = useSelector((state) => state.player);

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
      dispatch(setPlaying(false));
    } else {
      await TrackPlayer.play();
      dispatch(setPlaying(true));
    }
  };

  const handleNext = async () => {
    await skipToNext();
  };

  const handlePrevious = async () => {
    await skipToPrevious();
  };

  const handleShuffle = () => {
    dispatch(setShuffle(!shuffle));
  };

  const handleRepeat = () => {
    dispatch(setRepeat(!repeat));
  };

  return (
    <View style={styles.container}>
      <Text>{track.title}</Text>
      <Text>{Math.floor(progress.position)} / {Math.floor(progress.duration)} sec</Text>
      <PlayerControls
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
        shuffle={shuffle}
        repeat={repeat}
        onShuffle={handleShuffle}
        onRepeat={handleRepeat}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 16 },
});

export default AudioPlayer;