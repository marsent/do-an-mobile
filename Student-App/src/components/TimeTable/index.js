import React, { useState, Component, useEffect }from 'react'
import { KeyboardAvoidingView, View, Text, StyleSheet, TextInput, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import {Calendar
    , CalendarList
    , Agenda} from 'react-native-calendars';
import {addDays, format, getDate, isSameDay, startOfWeek, getDay} from 'date-fns';
import CalendarStrip from 'react-native-slideable-calendar-strip';
import { passwordValidator, retypePassValidator } from '../../helpers/passwordValidator';
import { usernameValidator } from '../../helpers/usernameValidator'
import { RadioButton, Card, Avatar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import WeekCalendar from './WeekCalendar';
export default function TimeTable() {
    const TimeTable_data = [
        {
            ID : "123",
            Name : "Domo 1",
            Start_time: "9h",
            End_time: "10h30",
            DOW: "1",
            NOP: 20,
            Start_date: "20/11/2021",
            End_date: "21/11/2021"
        },
        {
            ID : "456",
            Name : "Domo 2",
            Start_time: "9h",
            End_time: "10h30",
            DOW: "2",
            NOP: 20,
            Start_date: "20/11/2021",
            End_date: "21/11/2021"
        },
        {
            ID : "123",
            Name : "Domo 3",
            Start_time: "9h",
            End_time: "10h30",
            DOW: "3",
            NOP: 20,
            Start_date: "20/11/2021",
            End_date: "21/11/2021"
        },
        {
            ID : "456",
            Name : "Domo 4",
            Start_time: "9h",
            End_time: "10h30",
            DOW: "3",
            NOP: 20,
            Start_date: "20/11/2021",
            End_date: "21/11/2021"
        },
        {
            ID : "123",
            Name : "Domo 5",
            Start_time: "9h",
            End_time: "10h30",
            DOW: "4",
            NOP: 20,
            Start_date: "20/11/2021",
            End_date: "21/11/2021"
        },
        {
            ID : "456",
            Name : "Domo 5",
            Start_time: "9h",
            End_time: "10h30",
            DOW: "5",
            NOP: 20,
            Start_date: "20/11/2021",
            End_date: "21/11/2021"
        },
        {
            ID : "123",
            Name : "Domo 7",
            Start_time: "9h",
            End_time: "10h30",
            DOW: "6",
            NOP: 20,
            Start_date: "20/11/2021",
            End_date: "21/11/2021"
        },
        {
            ID : "456",
            Name : "Domo 8",
            Start_time: "9h",
            End_time: "10h30",
            DOW: "6",
            NOP: 20,
            Start_date: "20/11/2021",
            End_date: "21/11/2021"
        },

    ];
    const [date, setDate] = useState(new Date());

    return (
       <SafeAreaView style={styles.safe}>
           <View style={styles.headerView}>
                <Text style={styles.headerText}>Lịch học</Text>
            </View>
            <WeekCalendar date={date} onChange={(newDate) => setDate(newDate)} />
            {TimeTable_data.map((item, key)=>(
                <View key={key}>
                    {( Number(item.DOW) === date.getDay())  &&
                        <View key={key} style={styles.timetableText}>
                            <Text style={styles.TitleText}>{item.ID} </Text>
                            <Text style={styles.ContentText}>{item.Name} </Text>
                        </View>
                    }
                </View>
            ))}     
        </SafeAreaView>
    );
    
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
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
    timetableText:{
        marginHorizontal: '2.5%',
        borderWidth: .5,
        borderRadius: 10,
        padding: 10,
        marginVertical: '.5%',
        borderColor:'#BFBFBF',
    },
    TitleText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    ContentText: {
        fontSize: 14,
    },
});
