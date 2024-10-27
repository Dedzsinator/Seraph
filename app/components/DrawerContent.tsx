import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const DrawerContent = ({ navigation, userRole }) => {
  return (
    <DrawerContentScrollView>
      <View style={styles.drawerContent}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.drawerItem}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Auction')}>
          <Text style={styles.drawerItem}>Auction</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SQLTest')}>
          <Text style={styles.drawerItem}>SQL Test</Text>
        </TouchableOpacity>
        {userRole === 'moderator' && (
          <TouchableOpacity onPress={() => navigation.navigate('Moderator')}>
            <Text style={styles.drawerItem}>Moderator</Text>
          </TouchableOpacity>
        )}
        {userRole === 'admin' && (
          <>
            <TouchableOpacity onPress={() => navigation.navigate('AdminUsers')}>
              <Text style={styles.drawerItem}>Admin Users</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AdminArtPieces')}>
              <Text style={styles.drawerItem}>Admin Art Pieces</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AdminAddArtPieces')}>
              <Text style={styles.drawerItem}>Add Art Pieces</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AdminSQL')}>
              <Text style={styles.drawerItem}>Submit SQL</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    padding: 20,
  },
  drawerItem: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default DrawerContent;