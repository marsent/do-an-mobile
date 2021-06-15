import React, { useState, Component, useEffect, useContext }from 'react'
import { KeyboardAvoidingView, View, Text, StyleSheet, TextInput, Button, TouchableOpacity, SafeAreaView,ScrollView,Modal, Alert, Pressable  } from 'react-native';
import CalendarStrip from 'react-native-slideable-calendar-strip';
import { passwordValidator, retypePassValidator } from '../../helpers/passwordValidator';
import { usernameValidator } from '../../helpers/usernameValidator'
import { RadioButton, Card, Avatar, IconButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import TokenContext from '../../helpers/TokenContext';
import {ExamProvider} from '../../helpers/ExamContext';
import {addDays, format, getDate, isSameDay, startOfWeek, parseJSON} from 'date-fns';

export default function MainExam({route, navigation}){
    // const edata = [
    //     {
    //         ID : "123",
    //         name : "Domo 1",
    //     },
    //     {
    //         ID : "456",
    //         name : "Domo 2",
    //     },
    //     {
    //         ID : "123",
    //         name : "Domo 3",
    //     },
    //     {
    //         ID : "456",
    //         name : "Domo 4",
    //     }
    // ];
    const [modalVisible, setModalVisible] = useState(false);
    const [a,setA]=getA(data);
    const {data} = route.params;
    return (
      <SafeAreaView style={styles.Container}>
           <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TouchableOpacity
                                    style={[styles.closebutton]}
                                    onPress={() => {setModalVisible(!modalVisible)}}>
                                    <Icon name="md-close" size={23} color='#BFBFBF' />
                            </TouchableOpacity>
                            <Listmap list={a}/>                            
                        </View>
                    </View>
            </Modal>
        
            <ScrollView style={styles.NotiView}>
                {data.questions.map((item, i)=>(
                    // <TouchableOpacity  onPress={() => {
                    //     a[i] = item.answer;
                    //     setA(a);
                    //     Alert.alert(a.toString());
                    // }}>
                    <View key={i} style={styles.NotiText}>
                        <Text style={styles.TitleText}>Câu {i+1}: {item.question} </Text>
                        {/* <Text style={styles.Notification_date}>{format(parseJSON(item.updatedAt),'Pp')} </Text> */}
                        {item.selection.map((selection, j)=>(<View key={j}>
                                {/* <View style={[styles.viewRadio]}>
                                    <RadioButton value={selection} />
                                    <Text style={{ fontFamily: 'Inter'}}>{selection}</Text>
                                </View> */}
                                    <RadioButton.Group onValueChange={value => {const b=a; b[i]=value; setA(b)}} value={a}>
                                        <View style={[styles.viewRadio]}>
                                            <RadioButton value={selection} />
                                            <Text>{selection}</Text>
                                        </View>
                                    </RadioButton.Group>
                            </View>       
                        ))}
                    </View> 
                    // </TouchableOpacity>
                ))}
                <TouchableOpacity
                style={[styles.button]}
                onPress={() => {setModalVisible(!modalVisible)}}>
                <Text style={styles.textStyle}>Làm bài</Text>
                </TouchableOpacity>
                <Listmap list={a}/>
            </ScrollView>
            
            
        </SafeAreaView>
        // <View>
        //     <Text>{data.name}</Text>
        //     <Text>{route.name}</Text>
        // </View>
    );
    function Listmap({list=[]}){
        return(list.map((item, i)=><Text key={i} style={styles.TitleText}>{item} </Text>))   
    };
}

export const getA = (list=[]) => {
    const final = [];
  
    for (let i = 0; i < list.length; i++) {
      final.concat(null);
    }
    return final;
};

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
        marginVertical: '2%',
    },
    NotiText:{
        marginHorizontal: '2.5%',
        // borderWidth: .5,
        borderRadius: 10,
        padding: 10,
        marginVertical: '.5%',
        // borderColor:'#BFBFBF',
        backgroundColor: '#FEFEFE',
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
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22
    },
    modalView: {
        // margin: 20,
        backgroundColor: "white",
        borderRadius: 15,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '75%',
        paddingBottom: 38,
    },
    button: {
	    margin:2,
        borderRadius: 5,
        borderWidth: 0.5,
        padding: 10,
        backgroundColor:'green',
    },
    closebutton: {
	    alignSelf: 'flex-end',
    },
    textStyle: {
        color: '#FEFEFE'
    },
    viewRadioGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15
    },
    viewRadio: {
        display: 'flex',
        flexDirection: 'row',
        paddingRight: 2,
        flex:1,
        alignItems:'center',    
    },
});


