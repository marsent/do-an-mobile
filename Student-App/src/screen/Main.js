import React from 'react';

import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import BubbleTabBar, {
  IBubbleTabConfig,
  IIconRenderer,
} from 'react-native-bubble-tabbar';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomTabBar from './MainStyle'

import TimeTable from '../components/TimeTable';
import Notification from '../components/Notification';
import OnlineExam from '../components/OnlineExam';
import AccountDetail from '../components/accountDetail';
import mainExam from '../components/OnlineExam/mainExam';

const TTStack = createStackNavigator();
const NTStack = createStackNavigator();
const OEStack = createStackNavigator();
const ADStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();


const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="TimeTable"
      activeColor="#fff"
      tabBar={({ state, descriptors, navigation }) =>
        <CustomTabBar
          state={state}
          descriptors={descriptors}
          navigation={navigation}
        />
      }
    >
      <Tab.Screen
        name="TimeTable"
        component={TTStackS}
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
        component={OEStackS}
        // options={{
        //   tabBarLabel: 'Kiểm tra',
        //   tabBarColor: '#3891E9',
        //   tabBarIcon: ({ color }) => (
        //     <Icons name="add-task" color={color} size={26} />
        //   ),          
        // }}
        options={({ navigation }) => {
          const { routes, index } = navigation.dangerouslyGetState();
          const { state: exploreState } = routes[index];
          let tabBarVisible = true;
          if (exploreState) {
            const { routes: exploreRoutes, index: exploreIndex } = exploreState;
            const exploreActiveRoute = exploreRoutes[exploreIndex];
            if (exploreActiveRoute.name === "MainExam") tabBarVisible = false;
          }
          return {
            tabBarVisible,
            tabBarLabel: 'Kiểm tra',
            tabBarColor: '#3891E9',
            tabBarIcon: ({ color }) => (
            <Icons name="add-task" color={color} size={26}/>
            ),
          };
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NTStackS}
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
        component={ADStackS}
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

export default MainTabScreen;

const TTStackS = ({navigation}) => (
    <TTStack.Navigator screenOptions={{
            headerStyle: {
            backgroundColor: '#3891E9',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold',
            },
            headerTitleAlign: 'center'
        }}>
            <TTStack.Screen name="TimeTable" component={TimeTable} options={{
            title:'Lịch học',
            tabBarVisible: false,
            }} />
    </TTStack.Navigator>
);
const OEStackS = ({navigation}) => (
  <OEStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#3891E9',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          },
          headerTitleAlign: 'center'
      }}>
          <OEStack.Screen name="OnlineExam" component={OnlineExam} options={{
          title:'Kiểm tra',
          }} />
          <OEStack.Screen name="MainExam" component={mainExam} options={{
          title:'Kiểm tra',
          }} />
  </OEStack.Navigator>
);
const NTStackS = ({navigation}) => (
  <NTStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#3891E9',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          },
          headerTitleAlign: 'center'
      }}>
          <NTStack.Screen name="Notification" component={Notification} options={{
          title:'Thông báo',
          }} />
  </NTStack.Navigator>
);
const ADStackS = ({navigation}) => (
  <ADStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#3891E9',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          },
          headerTitleAlign: 'center'
      }}>
          <ADStack.Screen name="AccountDetail" component={AccountDetail} options={{
          title:'Thông tin cá nhân',
          }} />
  </ADStack.Navigator>
);

