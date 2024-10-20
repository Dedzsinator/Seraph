import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const reviews = [
  { id: '1', user: 'User1', review: 'Amazing art piece!', artPieceId: '1' },
  { id: '2', user: 'User2', review: 'Not my taste.', artPieceId: '2' },
  // Add more reviews
];

const ModeratorScreen = () => {
  const handleDeleteReview = (reviewId) => {
    console.log(`Delete review with ID: ${reviewId}`);
    // Implement delete review functionality
  };

  const handleBanUser = (userId) => {
    console.log(`Ban user with ID: ${userId}`);
    // Implement ban user functionality
  };

  const renderItem = ({ item }) => (
    <View style={styles.reviewContainer}>
      <Text style={styles.user}>{item.user}</Text>
      <Text style={styles.review}>{item.review}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleDeleteReview(item.id)} style={styles.button}>
          <Text style={styles.buttonText}>Delete Review</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleBanUser(item.user)} style={styles.button}>
          <Text style={styles.buttonText}>Ban User</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={reviews}
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
  reviewContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  user: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  review: {
    fontSize: 14,
    marginVertical: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
});

export default ModeratorScreen;