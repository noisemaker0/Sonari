import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

const PlaylistCard = ({ playlist, onPress }) => {
  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Content>
        <Text variant="titleMedium">{playlist.name}</Text>
        <Text variant="bodyMedium">{playlist.songs?.length || 0} songs</Text>
        <Text variant="bodySmall">{playlist.isPublic ? 'Public' : 'Private'}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { margin: 8 },
});

export default PlaylistCard;