import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const DrawerContent = (props) => {
  const { userRole } = props;

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <DrawerItemList {...props} />
        {userRole === 'moderator' && (
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => props.navigation.navigate('Moderator')}
          >
            <Text>Moderator Panel</Text>
          </TouchableOpacity>
        )}
        {userRole === 'admin' && (
          <>
            <TouchableOpacity
              style={styles.drawerItem}
              onPress={() => props.navigation.navigate('AdminUsers')}
            >
              <Text>Admin Users</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.drawerItem}
              onPress={() => props.navigation.navigate('AdminArtPieces')}
            >
              <Text>Admin Art Pieces</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.drawerItem}
              onPress={() => props.navigation.navigate('AdminAddArtPieces')}
            >
              <Text>Add Art Pieces</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.drawerItem}
              onPress={() => props.navigation.navigate('AdminSQL')}
            >
              <Text>Admin SQL</Text>
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