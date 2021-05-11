
import React, { useState } from 'react';
import { View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


// Import sreen
import Home from './src/screen/Home';
import Login from './src/screen/Login';
import ResetPassword from './src/screen/ResetPassword';
import SetAccount from './src/screen/SetAccount';
import AddNotification from './src/screen/AddNotification'

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const [token, setToken] = useState();
  // if (!token) return <Login token={token} setToken={setToken} />
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Khôi phục mật khẩu" >
        <Drawer.Screen name="Home" component={Login} />
        <Drawer.Screen name="Khôi phục mật khẩu" component={ResetPassword} />
        <Drawer.Screen name="Thêm tài khoản" component={SetAccount} />
        <Drawer.Screen name="Tạo thông báo" component={AddNotification} />
        {/* <Drawer.Screen name="Quản lý sinh viên" />
        <Drawer.Screen name="Quản lý giảng viên" />
        <Drawer.Screen name="Quản lý đề thi" /> */}
      </Drawer.Navigator >
    </NavigationContainer >
  )
};

export default App;