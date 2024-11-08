import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';

const DrawerContent = ({ navigation, userRole }) => {
  const handleLuckyDay = async () => {
    try {
      const response = await fetch("http://localhost:3000/query?query=SELECT ap.Title AS ArtPieceTitle, ap.Description AS ArtPieceDescription, ap.Category AS ArtPieceCategory, ap.ImageURL, CONCAT(up.FirstName, ' ', up.LastName) AS ArtistName FROM ArtPieces AS ap JOIN Users AS u ON ap.ArtistID = u.UserID JOIN UserProfiles AS up ON u.UserID = up.UserID ORDER BY NEWID() OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      if (result.length > 0) {
        const randomArtPiece = result[0];
        navigation.navigate('ArtPieceDetail', { artPiece: randomArtPiece });
      }
    } catch (error) {
      console.error('Error fetching random art piece:', error);
    }
  };

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
        <TouchableOpacity onPress={handleLuckyDay}>
          <Text style={styles.drawerItem}>I'm feeling lucky</Text>
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
    fontFamily: 'BLKCHCRY',
  },
});

export default DrawerContent;