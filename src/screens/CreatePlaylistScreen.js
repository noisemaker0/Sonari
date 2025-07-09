import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { createPlaylist } from '../store/playlistSlice';

const CreatePlaylistScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const dispatch = useDispatch();

  const handleCreate = () => {
    if (name.trim()) {
      dispatch(createPlaylist({ name, isPublic }));
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Create Playlist</Text>
      <TextInput
        label="Playlist Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <Button
        mode="outlined"
        onPress={() => setIsPublic(!isPublic)}
        style={styles.button}
      >
        {isPublic ? 'Public' : 'Private'}
      </Button>
      <Button mode="contained" onPress={handleCreate} style={styles.button}>
        Create Playlist
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { marginBottom: 16 },
  button: { marginBottom: 8 },
});

export default CreatePlaylistScreen;