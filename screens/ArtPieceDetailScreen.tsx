import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';

const ArtPieceDetailScreen = ({ route }) => {
  const { artPiece } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SharedElement id={`item.${artPiece.id}.photo`}>
        <Image source={{ uri: artPiece.imageUrl }} style={styles.image} />
      </SharedElement>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{artPiece.title}</Text>
        <Text style={styles.artist}>{artPiece.artist}</Text>
        <Text style={styles.creationDate}>{artPiece.creationDate}</Text>
        <Text style={styles.description}>{artPiece.description}</Text>
        <Text style={styles.price}>${artPiece.price}</Text>
      </View>
    </ScrollView>
  );
};

ArtPieceDetailScreen.sharedElements = (route) => {
  const { artPiece } = route.params;
  return [`item.${artPiece.id}.photo`];
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  detailsContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  artist: {
    fontSize: 18,
    color: '#888',
    marginVertical: 5,
  },
  creationDate: {
    fontSize: 16,
    color: '#888',
    marginVertical: 5,
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
});

export default ArtPieceDetailScreen;