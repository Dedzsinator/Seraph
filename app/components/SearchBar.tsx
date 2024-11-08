import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchBar = ({ placeholder, onSearch }) => {
  const [query, setQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const widthAnim = useRef(new Animated.Value(0)).current; // Initial width value
  const opacityAnim = useRef(new Animated.Value(0)).current; // Initial opacity value

  useEffect(() => {
    // Animate the width and opacity of the search bar
    Animated.timing(widthAnim, {
      toValue: isVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.timing(opacityAnim, {
      toValue: isVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Clear the query when the search bar is closed
    if (!isVisible) {
      setQuery('');
      onSearch('');
    }
  }, [isVisible, widthAnim, opacityAnim, onSearch]);

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  const handleChangeText = (text) => {
    setQuery(text);
    onSearch(text);
  };

  const toggleSearchBar = () => {
    setIsVisible(!isVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleSearchBar} style={styles.iconButton}>
        <Icon name={isVisible ? "close" : "search"} size={30} color="#000" />
      </TouchableOpacity>
      <Animated.View style={[styles.searchContainer, { width: widthAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '80%'],
      }) }, { opacity: opacityAnim }]}>
        {isVisible && (
          <>
            <TextInput
              style={styles.input}
              placeholder={placeholder}
              value={query}
              onChangeText={handleChangeText}
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
                <Icon name="clear" size={20} color="#000" />
              </TouchableOpacity>
            )}
          </>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  iconButton: {
    marginRight: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'BLKCHCRY', // Apply the custom font
  },
  clearButton: {
    marginLeft: 10,
  },
});

export default SearchBar;