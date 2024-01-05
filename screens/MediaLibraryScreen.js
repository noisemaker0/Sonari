import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, Button, StyleSheet, Text } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

const MediaLibraryScreen = () => {
  const [media, setMedia] = useState([]);
  const [permission, setPermission] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setPermission(status === 'granted');
    })();
  }, []);

  const loadMedia = async () => {
    if (permission) {
      const media = await MediaLibrary.getAssetsAsync({
        mediaType: ['photo'],
        first: 10, // Number of images to load
      });
      setMedia(media.assets);
    } else {
      alert('Permission to access the gallery is required!');
    }
  };
  console.log('permission', permission)

  return (
    <View style={styles.container}>
      <Button title="Load Images from Gallery" onPress={loadMedia} />
      {permission ? (
        <ScrollView style={styles.gallery}>
          {media.map((item, index) => (
            <Image
              key={index}
              style={styles.image}
              source={{ uri: item.uri }}
            />
          ))}
        </ScrollView>
      ) : (
        <Text>No access to media gallery.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gallery: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  }
});

export default MediaLibraryScreen;
