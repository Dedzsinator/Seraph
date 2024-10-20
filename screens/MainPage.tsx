import React, { useState, useRef } from 'react';
import { View, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Card from '../app/components/ArtCard';
import BackToTopButton from '../app/components/BackToTopButton';

const artPieces = [
  {
    id: '1',
    title: 'Starry Night',
    artist: 'Vincent van Gogh',
    imageUrl: 'https://example.com/starry-night.jpg',
    creationDate: '1889',
    description: 'A famous painting by Vincent van Gogh.',
    price: 1000000,
  },
  {
    id: '2',
    title: 'The Persistence of Memory',
    artist: 'Salvador Dalí',
    imageUrl: 'https://example.com/persistence-of-memory.jpg',
    creationDate: '1931',
    description: 'A famous painting by Salvador Dalí.',
    price: 2000000,
  },
  // Add more art pieces
];

const HomeScreen = ({ navigation }) => {
  const scrollRef = useRef(null);

  const scrollToTop = () => {
    scrollRef.current.scrollToOffset({ offset: 0, animated: true });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ArtPieceDetail', { artPiece: item })}
    >
      <Card
        title={item.title}
        artist={item.artist}
        imageUrl={item.imageUrl}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView ref={scrollRef}>
        <FlatList
          data={artPieces}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
      <BackToTopButton onPress={scrollToTop} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
});

export default HomeScreen;