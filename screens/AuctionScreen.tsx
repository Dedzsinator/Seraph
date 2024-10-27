import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';

const auctions = [
  {
    id: '1',
    title: 'Starry Night',
    artist: 'Vincent van Gogh',
    imageUrl: 'https://example.com/starry-night.jpg',
    endDate: '2023-12-31T23:59:59Z',
    active: true,
  },
  {
    id: '2',
    title: 'The Persistence of Memory',
    artist: 'Salvador Dalí',
    imageUrl: 'https://example.com/persistence-of-memory.jpg',
    endDate: '2023-11-30T23:59:59Z',
    active: true,
  },
  // Add more auctions
];

const AuctionScreen = () => {

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  selector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
  },
  list: {
    flexGrow: 1,
  },
  gridItem: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    alignItems: 'center',
  },
  fullItem: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  artist: {
    fontSize: 14,
    color: '#888',
    marginVertical: 5,
  },
  countdown: {
    fontSize: 14,
    color: '#FF0000',
    marginTop: 10,
  },
});

export default AuctionScreen;