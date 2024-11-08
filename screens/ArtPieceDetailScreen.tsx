import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, TouchableOpacity } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ArtPieceDetailScreen = ({ route, navigation }) => {
  const { artPiece } = route.params;

  // Log the entire artPiece object for debugging
  console.log('ArtPieceDetailScreen artPiece:', artPiece);

  const fadeAnimImage = useRef(new Animated.Value(0)).current;
  const fadeAnimTitle = useRef(new Animated.Value(0)).current;
  const fadeAnimArtist = useRef(new Animated.Value(0)).current;
  const fadeAnimDescription = useRef(new Animated.Value(0)).current;
  const [blurRadius, setBlurRadius] = useState(5);

  useEffect(() => {
    Animated.timing(fadeAnimImage, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeAnimTitle, {
      toValue: 1,
      duration: 500,
      delay: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeAnimArtist, {
      toValue: 1,
      duration: 500,
      delay: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeAnimDescription, {
      toValue: 1,
      duration: 500,
      delay: 1500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnimImage, fadeAnimTitle, fadeAnimArtist, fadeAnimDescription]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={30} color="#000" />
      </TouchableOpacity>
      <View style={styles.leftContainer}>
        <Animated.Image
          source={{ uri: artPiece.ImageURL }}
          style={[styles.image, { opacity: fadeAnimImage }]}
          blurRadius={blurRadius} // Apply blur effect for lazy loading
          onLoad={() => {
            // Remove blur effect after image is loaded
            setBlurRadius(0);
            Animated.timing(fadeAnimImage, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }).start();
          }}
          resizeMode="contain" // Ensure the image is always fitted
        />
      </View>
      <View style={styles.rightContainer}>
        <Animated.Text style={[styles.title, { opacity: fadeAnimTitle }]}>
          {artPiece.ArtPieceTitle}
        </Animated.Text>
        <Animated.Text style={[styles.artist, { opacity: fadeAnimArtist }]}>
          {artPiece.ArtistName}
        </Animated.Text>
        <Animated.Text style={[styles.description, { opacity: fadeAnimDescription }]}>
          {artPiece.ArtPieceDescription}
        </Animated.Text>
      </View>
    </ScrollView>
  );
};

ArtPieceDetailScreen.sharedElements = (route) => {
  const { artPiece } = route.params;
  return [`item.${artPiece.ArtistID}.photo`];
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  image: {
    width: '90%', // Make the image a bit smaller
    height: '90%', // Make the image a bit smaller
    resizeMode: 'contain', // Ensure the image is always fitted
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  artist: {
    fontSize: 18,
    color: '#888',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ArtPieceDetailScreen;