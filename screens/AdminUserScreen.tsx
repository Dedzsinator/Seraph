import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const users = [
  { id: '1', name: 'User1', email: 'user1@example.com' },
  { id: '2', name: 'User2', email: 'user2@example.com' },
  // Add more users
];

const AdminUsersScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.userContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
    </View>
  );

  return (
    <FlatList
      data={users}
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
  userContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    marginVertical: 10,
  },
});

export default AdminUsersScreen;