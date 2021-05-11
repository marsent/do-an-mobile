import React, { useState, Component, useEffect }from 'react'
import { KeyboardAvoidingView, View, Text, StyleSheet, TextInput, Button, TouchableOpacity, SafeAreaView,ScrollView } from 'react-native';
import CalendarStrip from 'react-native-slideable-calendar-strip';
import { passwordValidator, retypePassValidator } from '../../helpers/passwordValidator';
import { usernameValidator } from '../../helpers/usernameValidator'
import { RadioButton, Card, Avatar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
export default function Notification() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const notification_data = [
        {
            ID : "123",
            Name : "Domo 1",
            Content: "Content 1",
            Date_created:"01/01/2021",
            Update_date:"01/01/2021",
            Status:"1"
        },
        {
            ID : "321",
            Name : "Domo 2",
            Content: "Content 2",
            Date_created:"02/02/2021",
            Update_date:"02/02/2021",
            Status:"0"
        },
        {
            ID : "123",
            Name : "Domo 1",
            Content: "Content 1",
            Date_created:"01/01/2021",
            Update_date:"01/01/2021",
            Status:"1"
        },
        {
            ID : "321",
            Name : "Domo 2",
            Content: "Content 2",
            Date_created:"02/02/2021",
            Update_date:"02/02/2021",
            Status:"0"
        },
        {
            ID : "123",
            Name : "Domo 1",
            Content: "Content 1",
            Date_created:"01/01/2021",
            Update_date:"01/01/2021",
            Status:"1"
        },
        {
            ID : "321",
            Name : "Domo 2",
            Content: "Content 2",
            Date_created:"02/02/2021",
            Update_date:"02/02/2021",
            Status:"0"
        },
        {
            ID : "123",
            Name : "Domo 1",
            Content: "Content 1",
            Date_created:"01/01/2021",
            Update_date:"01/01/2021",
            Status:"1"
        },
        {
            ID : "321",
            Name : "Domo 2",
            Content: "Content 2",
            Date_created:"02/02/2021",
            Update_date:"02/02/2021",
            Status:"0"
        },
        {
            ID : "123",
            Name : "Domo 1",
            Content: "Content 1",
            Date_created:"01/01/2021",
            Update_date:"01/01/2021",
            Status:"1"
        },
        {
            ID : "321",
            Name : "Domo 2",
            Content: "Content 2",
            Date_created:"02/02/2021",
            Update_date:"02/02/2021",
            Status:"0"
        },
        {
            ID : "123",
            Name : "Domo 1",
            Content: "Content 1",
            Date_created:"01/01/2021",
            Update_date:"01/01/2021",
            Status:"1"
        },
        {
            ID : "321",
            Name : "Domo 2",
            Content: "Content 2",
            Date_created:"02/02/2021",
            Update_date:"02/02/2021",
            Status:"0"
        },
        {
            ID : "123",
            Name : "Domo 1",
            Content: "Content 1",
            Date_created:"01/01/2021",
            Update_date:"01/01/2021",
            Status:"1"
        },
        {
            ID : "321",
            Name : "Domo 2",
            Content: "Content 2",
            Date_created:"02/02/2021",
            Update_date:"02/02/2021",
            Status:"0"
        },
        {
            ID : "123",
            Name : "Domo 1",
            Content: "Content 1",
            Date_created:"01/01/2021",
            Update_date:"01/01/2021",
            Status:"1"
        },
        {
            ID : "321",
            Name : "Domo 2",
            Content: "Content 2",
            Date_created:"02/02/2021",
            Update_date:"02/02/2021",
            Status:"0"
        },
    ];
    /*list = () => {
        return TimeTable_data.map((element) => {
          return (
            <View style={{margin: 10}}>
                <text>{TimeTable_data.ID}</text>
                <text>{TimeTable_data.Name}</text>
            </View>
          );
        });
      };
    return (
        <view>
           
        </view>
    );*/
    //var SampleNameArray = [ "Pankaj", "Rita", "Mohan", "Amit", "Babulal", "Sakshi" ];
    return (
       <SafeAreaView style={styles.Container}>
            <View style={styles.headerView}>
                <Text style={styles.headerText}>Thông báo</Text>
            </View>
            <ScrollView style={styles.NotiView}>
            {notification_data.map((item, key)=>(
                <View key={key} style={styles.NotiText}>
                    <Text style={styles.TitleText}>{item.Name} </Text>
                    <Text style={styles.ContentText}>{item.Content} </Text>
                    <Text style={styles.Notification_date}>{item.Update_date} </Text>
                </View>
            ))}
            </ScrollView>
        </SafeAreaView>
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 5,
        alignItems: 'center'
    },
    headerText: {
        position: "relative",
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FEFEFE',
    },
    headerView: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '2.5%',
        backgroundColor: '#4B75F2',
    },
    NotiView:{
        position: 'relative',
        marginVertical: '2%'
    },
    NotiText:{
        marginHorizontal: '2.5%',
        borderWidth: .5,
        borderRadius: 10,
        padding: 10,
        marginVertical: '.5%',
        borderColor:'#BFBFBF',
    },
    TitleText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    ContentText: {
        fontSize: 14,
    },
    Notification_date:{
        fontSize: 10,
        color: '#262626',
    }
});


