import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../../screens/MainPage'; // Make sure this path is correct
import AuctionScreen from '../../screens/AuctionScreen'; // Make sure this path is correct
import ArtPieceDetailScreen from '../../screens/ArtPieceDetailScreen'; // Make sure this path is correct
import ModeratorScreen from '../../screens/ModeratorScreen'; // Make sure this path is correct
import AdminUsersScreen from '../../screens/AdminUsersScreen'; // Make sure this path is correct
import AdminArtPiecesScreen from '../../screens/AdminArtPiecesScreen'; // Make sure this path is correct
import AdminAddArtPiecesScreen from '../../screens/AdminAddArtPiecesScreen'; // Make sure this path is correct
import AdminSQLScreen from '../../screens/AdminSQLScreen'; // Make sure this path is correct
import Header from '../components/Header'; // Make sure this path is correct

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerContent = ({ navigation }) => {
  return (
    <View style={styles.drawerContent}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.drawerItem}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Auction')}>
        <Text style={styles.drawerItem}>Auction</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Moderator')}>
        <Text style={styles.drawerItem}>Moderator</Text>
      </TouchableOpacity>
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
      {/* Add more drawer items here */}
    </View>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false, // Hide the default header
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Auction" component={AuctionScreen} />
      <Stack.Screen name="ArtPieceDetail" component={ArtPieceDetailScreen} />
      <Stack.Screen name="Moderator" component={ModeratorScreen} />
      <Stack.Screen name="AdminUsers" component={AdminUsersScreen} />
      <Stack.Screen name="AdminArtPieces" component={AdminArtPiecesScreen} />
      <Stack.Screen name="AdminAddArtPieces" component={AdminAddArtPiecesScreen} />
      <Stack.Screen name="AdminSQL" component={AdminSQLScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen
          name="Main"
          options={{
            header: ({ navigation }) => (
              <Header
                navigation={navigation}
                isLoggedIn={isLoggedIn}
                onLogin={() => setIsLoggedIn(true)}
                onProfilePress={() => console.log('Profile pressed')}
              />
            ),
          }}
        >
          {() => <MainStack />}
        </Drawer.Screen>
      </Drawer.Navigator>
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

export default App;