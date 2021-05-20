import React, {useState} from 'react';
import Login from './src/components/Login';
import SetAccount from './src/components/SetAccount';
import TimeTable from './src/components/TimeTable';
import Notification from './src/components/Notification';
import OnlineExam from './src/components/OnlineExam';
import AccountDetail from './src/components/accountDetail';
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

import {TokenProvider} from './src/helpers/TokenContext';

const App = () => {
  const [token, setToken] = useState('');
  if (!token) return <Login token={token} setToken={setToken} />;
  return(
    <TokenProvider value={token}>
      <NavigationContainer>
        <MainTabScreen/>
      </NavigationContainer>
    </TokenProvider>
  )
};
export default App;
