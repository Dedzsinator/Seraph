import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';

const ArtCard = ({ item, index, navigation, layoutMode, cardHeight = 500, isAuction = false }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(-100)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [blurRadius, setBlurRadius] = useState(5);
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      delay: index * 100,
      useNativeDriver: true,
    }).start();

    Animated.timing(translateX, {
      toValue: 0,
      duration: 500,
      delay: index * 100,
      useNativeDriver: true,
    }).start();

    if (isAuction) {
      const interval = setInterval(() => {
        const endDate = new Date(item.EndDate);
        const now = new Date();
        const timeRemaining = Math.max(0, endDate - now);
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [fadeAnim, translateX, isAuction, item.EndDate, index]);

  const handleMouseEnter = () => {
    Animated.timing(scaleAnim, {
      toValue: 1.05,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleMouseLeave = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const description = isAuction ? item.AuctionDescription : item.ArtPieceDescription;
  const truncatedDescription = description.split(' ').slice(0, 10).join(' ') + '...';

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ArtPieceDetail', { artPiece: item })}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateX }, { scale: scaleAnim }], height: cardHeight }]}>
        <Image
          source={{ uri: item.ImageURL }}
          style={[styles.image, { height: cardHeight * 0.7 }]} // Adjust image height proportionally
          blurRadius={blurRadius} // Apply blur effect for lazy loading
          onLoad={() => {
            // Remove blur effect after image is loaded
            setBlurRadius(0);
          }}
        />
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{item.ArtPieceTitle}</Text>
        <Text style={styles.artist}>{item.ArtistName}</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{truncatedDescription}</Text>
          {isAuction && (
            <Text style={styles.countdown}>Time Remaining: {timeRemaining}</Text>
          )}
          <View style={styles.gradient} />
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    alignItems: 'center', // Center the content horizontally
    width: '100%', // Ensure the card takes full width
  },
  image: {
    width: '100%',
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center', // Center the title text
    fontFamily: 'BLKCHCRY', // Apply the custom font
  },
  artist: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
    textAlign: 'center', // Center the artist text
    fontFamily: 'BLKCHCRY', // Apply the custom font
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textAlign: 'center', // Center the description text
    fontFamily: 'BLKCHCRY', // Apply the custom font
  },
  descriptionContainer: {
    position: 'relative',
    width: '100%',
    marginTop: 5,
  },
  countdown: {
    fontSize: 14,
    color: '#FF0000',
    marginTop: 10,
    textAlign: 'center',
  },
  gradient: {
    position: 'absolute',
    left: '70%', // Adjust the start position of the gradient
    right: 0,
    top: 0,
    bottom: 0,
    height: '100%', // Ensure the gradient covers the entire height of the description
    backgroundColor: 'rgba(255, 255, 255, 0)', // Transparent at the top
    backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0), #f9f9f9)', // Gradient effect
  },
});

export default ArtCard;