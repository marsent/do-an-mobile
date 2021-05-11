import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Button
} from 'react-native';
// import {Button, } from 'react-native-paper';
export default function listClass() {
    const listClassData = [
        {
            ID : "1",
            Name : "Phát triển ứng dụng trên di động",
            Room: 'B2.22',
            Amount: 80,
            StartDate:"01/03/2021",
            FinishDate:"26/06/2021",
            Status:"1"
        },
        {
            ID : "1",
            Name : "Phát triển ứng dụng trên di động",
            Room: 'B2.22',
            Amount: 80,
            StartDate:"01/03/2021",
            FinishDate:"26/06/2021",
            Status:"1"
        },
        {
            ID : "1",
            Name : "Phát triển ứng dụng trên di động",
            Room: 'B2.22',
            Amount: 80,
            StartDate:"01/03/2021",
            FinishDate:"26/06/2021",
            Status:"1"
        },
        {
            ID : "1",
            Name : "Phát triển ứng dụng trên di động",
            Room: 'B2.22',
            Amount: 80,
            StartDate:"01/03/2021",
            FinishDate:"26/06/2021",
            Status:"1"
        },
    ];
    return (
        <View style={styles.Container}>
             <View style={styles.headerView}>
                 <Text style={styles.headerText}>Thông tin lớp học</Text>
             </View>
                <ScrollView style={styles.NotiView}>
                {
                    listClassData.map((item, key) => (
                        <View key={key} style={styles.NotiText}>
                            <Text style={styles.TitleText}>{item.Name} </Text>
                            <Text style={styles.ContentText}>Sỉ số: {item.Amount} </Text>
                            <Text style={styles.ContentText}>Phòng: {item.Room} </Text>
                            <Text style={styles.ContentText}>Ngày BĐ: {item.StartDate} </Text>
                            <Text style={styles.ContentText}>Ngày KT: {item.FinishDate} </Text>
                            <View style = {styles.ButtonContainer}>                            
                                <Button 
                                    style = {styles.button}
                                    title = 'Xem danh sách lớp'
                                />
                                    
                               
                            </View>
                        </View>
                        
                    ))
                }
                </ScrollView>
             
         </View>
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
        borderWidth: 1,
        borderRadius: 10,
        padding: 30,
        marginVertical: '.5%',
        borderColor:'#BFBFBF',
        flex: 1,
        flexDirection: 'column',
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
    ButtonContainer: {
        flex: 1,
        flexDirection: 'row',
       
        justifyContent: 'flex-end',
        marginTop: 20
    },
    button: {
        width: '70%',
        height: 40,
        backgroundColor: '#4B75F2',
        
        borderRadius: 20
      }
 });