import React, { useContext } from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { FlexibleTabBarComponent, withCustomStyle } from 'react-navigation-custom-bottom-tab-component/FlexibleTabBarComponent';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { KeyboardAvoidingView, View, Text, StyleSheet, TextInput, Button, TouchableOpacity, SafeAreaView,ScrollView,Modal, Alert, Pressable  } from 'react-native';

import TimeTable from './TimeTable';
import Notification from './Notification';
import OnlineExam from './OnlineExam';
import AccountDetail from './accountDetail';
import mainExam from './OnlineExam/mainExam';

const Stack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const TabS = () => (
    <Tab.Navigator
      initialRouteName="TimeTable"
      activeColor="#fff"
    >
      <Tab.Screen
        name="TimeTable"
        component={TimeTable}
        options={{
          tabBarLabel: 'TKB',
          tabBarColor: '#3891E9',
          tabBarIcon: ({ color }) => (
            <Icon name="calendar-outline" color={color} size={26} />
          ),
        }}
        
      />
      <Tab.Screen
        name="Exam"
        component={OnlineExam}
        options={{
          tabBarLabel: 'Kiểm tra',
          tabBarColor: '#3891E9',
          tabBarIcon: ({ color }) => (
            <Icons name="add-task" color={color} size={26} />
          ),          
        }}
        // listeners ={({navigation})=>({
        //   tabPress: (event) => {
        //     event.preventDefault();
        //     navigation.navigate('Exam', {screen:'OnlineExam'})
        //   }
        // })}
        // options={({ navigation }) => {
        //   const { routes, index } = navigation.dangerouslyGetState();
        //   const { state: exploreState } = routes[index];
        //   if (exploreState) {
        //     const { routes: exploreRoutes, index: exploreIndex } = exploreState;
        //     const exploreActiveRoute = exploreRoutes[exploreIndex];
        //     if (exploreActiveRoute.name === "MainExam") {Tab.barStyle.add({display: 'none'});Tab.forceUpdate();}; 
        //   };
        //   return {
        //     tabBarLabel: 'Kiểm tra',
        //     tabBarColor: '#3891E9',
        //     tabBarIcon: ({ color }) => (
        //       <Icons name="add-task" color={color} size={26} />
        //     ),
        //   };
        // }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notification}
        options={{
          tabBarLabel: 'Thông báo',
          tabBarColor: '#3891E9',
          tabBarIcon: ({ color }) => (
            <Icon name="notifications-outline" color={color} size={26} />
          ),
          
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountDetail}
        options={{
          tabBarLabel: 'Tài khoản',
          tabBarColor: '#3891E9',
          tabBarIcon: ({ color }) => (
            <Icon name="person-circle-outline" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
);

// export default MainTabScreen;

const StackS = ({navigation, route}) => (
  <Stack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#3891E9',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          },
          headerTitleAlign: 'center',
      }}
      >
          <Stack.Screen name="Tab" component={TabS}
            options={({route }) => { 
              const routeName = getFocusedRouteNameFromRoute(route);
              return { title: routeName };  
            }}      
          />
          <Stack.Screen name="MainExam" component={mainExam} options={{
            headerShown: false
          }}
          
          />
          
  </Stack.Navigator>
);

export default StackS;