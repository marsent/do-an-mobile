
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
import Home from './src/screen/Home';
import Login from './src/screen/Login';
import ResetPassword from './src/screen/ResetPassword';
import SetAccount from './src/screen/SetAccount';
import AddNotification from './src/screen/AddNotification'
import AddExam from './src/screen/AddExam';
import StudentManagement from './src/screen/StudentManagement';
import LecturerManagement from './src/screen/LecturerManagement';
import ExamManagement from './src/screen/ExamManagement';
import Logout from './src/screen/Logout';
import { TouchableOpacity, Text } from 'react-native';

const Drawer = createDrawerNavigator();

const App = () => {
  const [token, setToken] = useState();
  if (!token) return <Login token={token} setToken={setToken} />
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Thêm tài khoản"
        drawerType='slide'
        drawerContent={props => <CustomDrawerContent {...props} setToken={setToken} />}
      >
        {/* <Drawer.Screen name="Home" component={Login} /> */}
        <Drawer.Screen name="Khôi phục mật khẩu" component={ResetPassword} />
        <Drawer.Screen name="Thêm tài khoản" component={SetAccount} initialParams={{ token }} />
        <Drawer.Screen name="Tạo thông báo" component={AddNotification} />
        <Drawer.Screen name="Thêm cuộc thi" component={AddExam} />
        <Drawer.Screen name="Quản lý sinh viên" component={StudentManagement} />
        <Drawer.Screen name="Quản lý giảng viên" component={LecturerManagement} />
        <Drawer.Screen name="Quản lý đề thi" component={ExamManagement} />
      </Drawer.Navigator >
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