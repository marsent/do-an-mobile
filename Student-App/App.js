import React, {useState} from 'react';
import Login from './src/screen/Auth/Login';
import MainTabScreen from '././src/screen/Main';
import {Provider as PaperProvider} from 'react-native-paper';
import {BottomNavigation, Text, Appbar} from 'react-native-paper';
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { TokenProvider } from './src/Context/TokenContext'

const App = () => {
  const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGQ5NDJmMzczMDU2ZGIwZjlhYjI2MTAiLCJwaG9uZSI6IjA5ODg3NjU0MzIiLCJlbWFpbCI6IlRoZXRpZW4ya0BnbWFpLmNvbSIsImlhdCI6MTYyNTAyMzM3NX0._zmVPuAmLsEi1io2Tb0Y08HtrWdPvuKhnbo4Dy2NVUU');
  
  // if (!token) return <Login token={token} setToken={setToken} />;
  return(
    <TokenProvider value={token}>
      <NavigationContainer>
        <MainTabScreen/>
      </NavigationContainer>
    </TokenProvider>
    // <Login token={token} setToken={setToken} />
  )
};
export default App;
