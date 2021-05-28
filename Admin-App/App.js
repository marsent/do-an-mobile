
import React, { useState } from 'react';
import { View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';


// Import sreen
import Login from './src/screen/Login';
import AddNotification from './src/screen/AddNotification'
import StudentManagement from './src/screen/StudentManagement';
import LecturerManagement from './src/screen/LecturerManagement';
import ExamManagement from './src/screen/ExamManagement';

// Create drawer tabNav
const Drawer = createDrawerNavigator();

// import Context
import { TokenProvider } from './src/Context/TokenContext'
import ClassManagement from './src/screen/ClassManagement';

const App = () => {
  const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGFkYTcwYWVmMDdiYzZlNmU5ZjAyNmUiLCJwaG9uZSI6IjA4ODY0NjAzMTUiLCJpYXQiOjE2MjIwMTI5MzB9.pJRtnXL6mlWOeBoAaKjU2E2TNqmdGQoa7KWHyuaQKic');
  if (!token) return <Login token={token} setToken={setToken} />
  return (
    <NavigationContainer>
      <TokenProvider value={token}>
        <Drawer.Navigator
          initialRouteName="Quản lý sinh viên"
          drawerType='slide'
          drawerContent={props => <CustomDrawerContent {...props} setToken={setToken} />}
        >
          {/* <Drawer.Screen name="Home" component={Login} /> */}
          {/* <Drawer.Screen name="Thêm tài khoản" component={SetAccount} initialParams={{ token }} /> */}
          <Drawer.Screen name="Tạo thông báo" component={AddNotification}
          />
          <Drawer.Screen name="Thêm cuộc thi" component={ExamManagement} />
          <Drawer.Screen name="Quản lý sinh viên" component={StudentManagement} />
          <Drawer.Screen name="Quản lý giảng viên" component={LecturerManagement} />
          <Drawer.Screen name="Quản lý lớp học" component={ClassManagement} />
          <Drawer.Screen name="Quản lý đề thi" component={ExamManagement} />
        </Drawer.Navigator >
      </TokenProvider>
    </NavigationContainer >
  )
};
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Đăng xuất" onPress={() => props.setToken()}

      />
    </DrawerContentScrollView>
  );
}
export default App;