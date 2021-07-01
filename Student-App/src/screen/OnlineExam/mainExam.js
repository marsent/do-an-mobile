import React, { useState, Component, useEffect, useContext }from 'react'
import { KeyboardAvoidingView, View, Text, StyleSheet, TextInput, Button, TouchableOpacity, SafeAreaView,ScrollView,Modal, Alert, Pressable  } from 'react-native';
import CalendarStrip from 'react-native-slideable-calendar-strip';
import { RadioButton, Card, Avatar, IconButton, Dialog, Portal } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import TokenContext from '../../Context/TokenContext';
import {addDays, format, getDate, isSameDay, startOfWeek, parseJSON, set} from 'date-fns';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import CountDown from 'react-native-countdown-component';


export default function MainExam({route, navigation}){
    const token = useContext(TokenContext);
    const [modalVisible, setModalVisible] = useState(false);
    const {data1} = route.params;
    const [data,setData] = useState(data1.questions);
    // Alert.alert(final.toString());
    const [a,setA]=useState(Array(data.length).fill(' '));
    // console.log(a);
    // setA();
    const onSubmit = async () => {
        await fetch('http://quocha.xyz/api/answer/student/submit/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          },
          body: JSON.stringify({
            exam_id : data1._id,
            finish_time : 10,
            answer : a
          }),
        })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          
        });
        
      };
    console.log(data1._id);
    return (
    // <View style={{height:'90%'}}>
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
                            <Text style={{fontWeight: 'bold', fontSize: 16}}>Lưu ý</Text>
                            <Text style={{marginVertical:10}}>Vẫn còn thời gian làm lài. Bạn muốn tiếp tục làm bài? </Text>
                            <View style={{flexDirection: 'row',justifyContent: 'space-between',}}>
                                <TouchableOpacity
                                    style={[styles.buttonGy]}
                                    onPress={() => {setModalVisible(!modalVisible)}}>
                                    <Text style={{ }}>Tiếp tục</Text>
                                </TouchableOpacity>
                                <Text>      </Text>
                                <TouchableOpacity
                                    style={[styles.buttonGn]}
                                    onPress={() => {setModalVisible(!modalVisible); onSubmit(); navigation.goBack()}}>
                                    <Text style={{  }}>Nộp bài</Text>
                                </TouchableOpacity>
                            </View>
                                                                                    
                        </View>
                    </View>
            </Modal>
            <View style={styles.NotiView, {flexDirection: 'row',justifyContent: 'space-between',paddingVertical:'2%', marginHorizontal: '2.5%'}}>
            <CountDown
                until={data1.time * 60}
                size={15}
                onFinish={() => alert('Finished')}
                digitStyle={{backgroundColor: '#fff'}}
                digitTxtStyle={{color: '#4B75F2'}}
                timeToShow={['H','M', 'S']}
                timeLabels={{h:null, m: null, s: null}}
                showSeparator
                running = {true}
            />
            <TouchableOpacity
                style={styles.buttonBe}
                onPress={() => {setModalVisible(!modalVisible)}}>
                <Text style={styles.textStyle}>Nộp bài</Text>
            </TouchableOpacity>
            </View>
            <ScrollView style={styles.NotiView,{height:'92%'}}>
                {data.map((item, i)=>(
                    <View key={i} style={styles.NotiText}>
                        <RadioButton.Group onValueChange={value => {setA(prev => {prev[i]=value; return prev})}} value={a[i]}>
                        <Text style={styles.TitleText}>Câu {i+1}: {item.question} </Text>
                            {item.selection.map((selection, j)=>(
                                <View key={j} style={[styles.viewRadio]}>
                                    <RadioButton value={selection} />
                                    <Text>{selection}</Text>
                                </View>       
                        ))}</RadioButton.Group>
                    </View>
                ))}
            </ScrollView>
            <Toast ref={ref => Toast.setRef(ref)} />
        </SafeAreaView>
    // </View>    
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 5,
        alignItems: 'center',
        height: '100%'
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
        paddingVertical: 38,
    },
    buttonBe: {
        borderRadius: 5,
        // borderWidth: 0.5,
        padding: 10,
        backgroundColor:'#4B75F2',
        // color:'#4B75F2'
    },
    buttonGn: {
        borderRadius: 5,
        // borderWidth: 0.5,
        padding: 10,
        backgroundColor:'#1CC625',
        // color:'#4B75F2'
    },
    buttonGy: {
        borderRadius: 5,
        // borderWidth: 0.5,
        padding: 10,
        backgroundColor:'#BFBFBF',
        // color:'#4B75F2'
    },
    closebutton: {
	    alignSelf: 'flex-end',
    },
    textStyle: {
        color: '#FEFEFE',
        fontSize: 15,
        // marginTop:2,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: 5,
    },
    viewRadioGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    viewRadio: {
        display: 'flex',
        flexDirection: 'row',
        paddingRight: 2,
        flex:1,
        alignItems:'center',    
    },
    test: {
        position:'absolute',
    }
});


