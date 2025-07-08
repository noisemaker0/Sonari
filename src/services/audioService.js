import TrackPlayer from 'react-native-track-player';

export const setupPlayer = async () => {
  await TrackPlayer.setupPlayer();
};

export const addTrack = async (track) => {
  await TrackPlayer.add(track);
};

export const play = async () => {
  await TrackPlayer.play();
};

export const pause = async () => {
  await TrackPlayer.pause();
};

export const destroyPlayer = async () => {
  await TrackPlayer.destroy();
};