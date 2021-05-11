import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
export default function listStudent() {
    const listStudentData = [
        {
            ID : "18521467",
            Avatar: '',
            Name : "Đào Huỳnh Minh Thuận",
            Status:"1"
        },
        
    ];
    return (
        <View style={styles.Container}>
             <View style={styles.headerView}>
                 <Text style={styles.headerText}>Danh sách lớp</Text>
             </View>
             <TouchableOpacity onPress = {() => {

             }}>
                <ScrollView style={styles.NotiView}>
                {
                    listStudentData.map((item, key) => (
                        <View key={key} style={styles.NotiText}>
                            <Text style={styles.TitleText}>{item.Name} </Text>
                            <Text style={styles.ContentText}>Sỉ số: {item.Amount} </Text>
                            <Text style={styles.ContentText}>Phòng: {item.Room} </Text>
                            <Text style={styles.ContentText}>Ngày BĐ: {item.StartDate} </Text>
                            <Text style={styles.ContentText}>Ngày KT: {item.FinishDate} </Text>
                           
                        </View>
                    ))
                }
                </ScrollView>
             </TouchableOpacity>
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