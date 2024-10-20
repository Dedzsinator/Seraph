import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AuctionScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Auction Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuctionScreen;