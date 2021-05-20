import React from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddStudent from './AddStudent';
import StudentList from './StudentList'
import Icon from 'react-native-vector-icons/FontAwesome'
const Tab = createBottomTabNavigator();
export default StudentManagement = () => {



    return (
        <Tab.Navigator
            initialRouteName="Thêm mới"
            tabBarOptions={{
                activeTintColor: '#e91e63',
            }}
        >
            <Tab.Screen
                name="Thêm mới"
                component={AddStudent}
                options={{
                    tabBarLabel: "Thêm mới",
                    tabBarIcon: ({ color, size }) => (
                        <Icon name='plus' color={color} size={20} />)

                }}
            />
            <Tab.Screen
                name="Danh sách"
                component={StudentList}
                options={{
                    tabBarLabel: "Danh sách",
                    tabBarIcon: ({ color, size }) => (
                        <Icon name='list' color={color} size={20} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}