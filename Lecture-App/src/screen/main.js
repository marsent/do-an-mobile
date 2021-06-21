import React, {useState} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Image1 from '../asset/add.png';
import ListClass from '../components/ClassManagement/listClass';
import ListNoti from '../components/createNotification/listNoti';
import detail from '../components/accountDetail/index';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import classDetail from '../components/ClassManagement/listStudent';
import {
  Modal,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import CreateNotification from '../components/createNotification/createNotification';
// import CustomTabBar from './MainStyle';
const Tab = createMaterialBottomTabNavigator();
const LCStack = createStackNavigator();
const LNStack = createStackNavigator();
const ADStack = createStackNavigator();

const MainTabScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Xem lớp học"
        component={LCStacks}
        options={{
          tabBarLabel: 'Xem lớp học',
          tabBarColor: '#3891E9',
          tabBarIcon: ({color}) => (
            <Icon name="calendar-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Thông báo"
        component={LNStacks}
        options={{
          tabBarLabel: 'Thông báo',
          tabBarColor: '#3891E9',
          tabBarIcon: ({color}) => (
            <Icon name="notifications-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Thông tin"
        component={ADStacks}
        options={{
          tabBarLabel: 'Thông tin',
          tabBarColor: '#3891E9',
          tabBarIcon: ({color}) => (
            <Icon name="person-circle-outline" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const LCStacks = () => {
  return (
    <LCStack.Navigator>
      <LCStack.Screen name="Xem lớp học" component={ListClass} />
      <LCStack.Screen name="Xem chi tiết" component={classDetail} />
    </LCStack.Navigator>
  );
};
const LNStacks = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <LNStack.Navigator>
      <LNStack.Screen
        name="Thông báo"
        component={ListNoti}
        options={{
          headerTintColor: '#FEFEFE',
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}>
              <Image style={styles.image} source={Image1} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#4B75F2',
          },
        }}
      />
    </LNStack.Navigator>
  );
};
const ADStacks = () => {
  return (
    <ADStack.Navigator>
      <ADStack.Screen name="Thông tin" component={detail} />
    </ADStack.Navigator>
  );
};
const styles = StyleSheet.create({
  image: {
    height: 40,
    width: 40,
    marginRight: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
export default MainTabScreen;
