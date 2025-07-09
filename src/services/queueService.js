import TrackPlayer from 'react-native-track-player';

export const addToQueue = async (track) => {
  await TrackPlayer.add(track);
};

export const removeFromQueue = async (index) => {
  await TrackPlayer.remove(index);
};

export const skipToNext = async () => {
  await TrackPlayer.skipToNext();
};

export const skipToPrevious = async () => {
  await TrackPlayer.skipToPrevious();
};

export const getQueue = async () => {
  return await TrackPlayer.getQueue();
};

export const getCurrentTrack = async () => {
  return await TrackPlayer.getCurrentTrack();
};