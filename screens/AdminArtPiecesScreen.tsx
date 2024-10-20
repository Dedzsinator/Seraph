import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const artPieces = [
  { id: '1', title: 'Starry Night', artist: 'Vincent van Gogh' },
  { id: '2', title: 'The Persistence of Memory', artist: 'Salvador Dalí' },
  // Add more art pieces
];

const AdminArtPiecesScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.artPieceContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.artist}>{item.artist}</Text>
    </View>
  );

  return (
    <FlatList
      data={artPieces}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  artPieceContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  artist: {
    fontSize: 14,
    marginVertical: 10,
  },
});

export default AdminArtPiecesScreen;