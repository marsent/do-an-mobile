import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage';

// Import sreen
import Login from './src/screen/Auth/Login';
import AddNotification from './src/screen/Notification/AddNotification'
import StudentManagement from './src/screen/Student/StudentManagement';
import LecturerManagement from './src/screen/Lecture/LecturerManagement';
import ExamManagement from './src/screen/Exam/ExamManagement';
import ClassManagement from './src/screen/Class/ClassManagement';
import Home from './src/screen/Home'
import { createStackNavigator } from '@react-navigation/stack';

// Create drawer tabNav
const Stack = createStackNavigator();

// import Context
import { TokenProvider } from './src/Context/TokenContext'

const App = () => {

  const [token, setToken] = useState('');
  if (!token) return <Login token={token} setToken={setToken} />
  return (
    <NavigationContainer>
      <TokenProvider value={token} >
        <Stack.Navigator
          headerMode='none'
        >
          <Stack.Screen name='Home' component={Home} initialParams={{ setToken }} />
          <Stack.Screen name="Quản lý thông báo" component={AddNotification} />
          <Stack.Screen name="Quản lý sinh viên" component={StudentManagement} />
          <Stack.Screen name="Quản lý giảng viên" component={LecturerManagement} />
          <Stack.Screen name="Quản lý lớp học" component={ClassManagement} />
          <Stack.Screen name="Quản lý đề thi" component={ExamManagement} />
        </Stack.Navigator>
      </TokenProvider >
    </NavigationContainer >


  )
};


export default App;