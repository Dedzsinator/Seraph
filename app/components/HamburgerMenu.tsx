import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const HamburgerMenu = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(-250))[0];

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    Animated.timing(slideAnim, {
      toValue: menuVisible ? -250 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <TouchableOpacity onPress={toggleMenu} style={styles.hamburgerButton}>
        <Text style={styles.hamburgerText}>☰</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.menu, { transform: [{ translateX: slideAnim }] }]}>
        <Text style={styles.menuItem}>Menu Item 1</Text>
        <Text style={styles.menuItem}>Menu Item 2</Text>
        <Text style={styles.menuItem}>Menu Item 3</Text>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  hamburgerButton: {
    marginLeft: 15,
  },
  hamburgerText: {
    fontSize: 24,
    color: '#fff',
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 250,
    height: '100%',
    backgroundColor: '#333',
    padding: 20,
    zIndex: 1000,
  },
  menuItem: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 10,
  },
});

export default HamburgerMenu;