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

export default function OnlineExam({navigation}){
    // const notification_data = [
    //     {
    //         ID : "123",
    //         Name : "Domo 1",
    //         Content: "Content 1",
    //         Date_created:"01/01/2021",
    //         Update_date:"01/01/2021",
    //         Status:"1"
    //     }
    // ];
    // const [count, setCount] = useState(0);
    // const onPress = () => setCount(prevCount => prevCount + 1);
    // const token = useContext(TokenContext);
    const token = useContext(TokenContext);
    const [examList, setExamList] = useState([]);
    useEffect(async () => {
    //setError({ username: usernameValidator(username), password: passwordValidator(password) })
        await fetch('http://quocha.xyz/api/class/admin', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization:'Bearer '+token,
        },
        })
        .then(res => res.json())
        .then(res => {
            setExamList(res.data);
        });
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [examID,setExamID]=useState([]);
    const examDetail = () => {
        setExamID(item.ID);
        setModalVisible(!modalVisible);
    };
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
                            <Text style={{fontWeight: 'bold',}}>{examID.name}</Text>
                            <Text>{examID.Content}</Text>
                            <TouchableOpacity
                                    style={[styles.button]}
                                    onPress={() => {navigation.navigate('MainExam'); setModalVisible(!modalVisible)}}>
                                    <Text style={styles.textStyle}>Làm bài</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            </Modal>
            <ScrollView style={styles.NotiView}>
                {examList.map((item, i)=>(
                    <TouchableOpacity key={i} style={styles.NotiText}  onPress={() => {
                        setExamID(item);
                        setModalVisible(!modalVisible);
                    }}>
                    <View > 
                        <Text style={styles.TitleText}>{item.name} </Text>
                    </View> 
                    </TouchableOpacity>
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
    }
});


