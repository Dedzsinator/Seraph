import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Install this package for icons

const Header = ({ isLoggedIn, onLogin, onProfilePress }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
        <Ionicons name="menu" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.title}>Seraph</Text>
      {isLoggedIn ? (
        <TouchableOpacity onPress={onProfilePress} style={styles.profilePic}>
          <Image
            source={{ uri: 'https://example.com/profile-pic.jpg' }} // Replace with actual profile image URL
            style={styles.image}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onLogin} style={styles.loginButton}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#333',
    elevation: 4, // For Android shadow
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  menuButton: {
    padding: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loginButton: {
    padding: 10,
  },
  loginText: {
    color: '#007BFF',
  },
});

export default Header;