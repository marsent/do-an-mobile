import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'

import AddExam from './AddExam'
import ExamList from './ExamList'


const Tab = createBottomTabNavigator();


export default ExamManagement = () => {
    return (
        <Tab.Navigator
            initialRouteName="Thêm mới"
            tabBarOptions={{
                activeTintColor: '#e91e63',
            }}
        >
            <Tab.Screen
                name="Thêm mới"
                component={AddExam}
                options={{
                    tabBarLabel: "Thêm mới",
                    tabBarIcon: ({ color, size }) => (
                        <Icon name='plus' color={color} size={20} />)

                }}
            />
            <Tab.Screen
                name="Danh sách"
                component={ExamList}
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