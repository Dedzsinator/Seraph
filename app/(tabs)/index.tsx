import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../../screens/MainPage'; // Make sure this path is correct
import AuctionScreen from '../../screens/AuctionScreen'; // Make sure this path is correct
import ArtPieceDetailScreen from '../../screens/ArtPieceDetailScreen'; // Make sure this path is correct
import ModeratorScreen from '../../screens/ModeratorScreen'; // Make sure this path is correct
import AdminUsersScreen from '../../screens/AdminUserScreen'; // Make sure this path is correct
import AdminArtPiecesScreen from '../../screens/AdminArtPiecesScreen'; // Make sure this path is correct
import AdminAddArtPiecesScreen from '../../screens/AdminAddArtPiecesScreen'; // Make sure this path is correct
import AdminSQLScreen from '../../screens/AdminSQLScreen'; // Make sure this path is correct
import SQLTestScreen from '../../screens/SQLTestScreen'; // Make sure this path is correct
import DrawerContent from '../components/DrawerContent';
import Header from '../components/Header'; // Make sure this path is correct
import LoginScreen from '../../screens/LoginScreen'; // Make sure this path is correct
import RegisterScreen from '../../screens/RegisterScreen'; // Make sure this path is correct

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MainStack = ({ userRole }) => {
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
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="SQLTest" component={SQLTestScreen} />
      {userRole === 'moderator' && (
        <Stack.Screen name="Moderator" component={ModeratorScreen} />
      )}
      {userRole === 'admin' && (
        <>
          <Stack.Screen name="AdminUsers" component={AdminUsersScreen} />
          <Stack.Screen name="AdminArtPieces" component={AdminArtPiecesScreen} />
          <Stack.Screen name="AdminAddArtPieces" component={AdminAddArtPiecesScreen} />
          <Stack.Screen name="AdminSQL" component={AdminSQLScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('user'); // Default role is 'user'

  return (
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} userRole={userRole} />}>
        <Drawer.Screen
          name="Main"
          options={{
            header: ({ navigation }) => (
              <Header
                navigation={navigation}
                isLoggedIn={isLoggedIn}
                onLogin={() => navigation.navigate('Login')}
                onProfilePress={() => console.log('Profile pressed')}
              />
            ),
          }}
        >
          {() => <MainStack userRole={userRole} />}
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