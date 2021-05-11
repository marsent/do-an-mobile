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
import {Avatar} from 'react-native-paper';
import Image1 from '../../asset/avt.png';
export default function listStudent() {
    const listStudentData = [
        {
            ID : "18521467",
            Avatar: Image1,
            Name : "Đào Huỳnh Minh Thuận",
            Status:"1"
        },
        {
            ID : "18521467",
            Avatar: Image1,
            Name : "Đào Huỳnh Minh Thuận",
            Status:"1"
        },
        {
            ID : "18521467",
            Avatar: Image1,
            Name : "Đào Huỳnh Minh Thuận",
            Status:"1"
        },
        
    ];
    return (
        <View style={styles.Container}>
             <View style={styles.headerView}>
                 <Text style={styles.headerText}>Danh sách lớp</Text>
             </View>
             
                <ScrollView style={styles.NotiView}>
                {
                    listStudentData.map((item) => (
                        <TouchableOpacity>
                            <View key={item.ID} style={styles.NotiText}>
                                <Avatar.Image size={24} source={Image1} />
                                <Text style={styles.ContentText}>{item.Name} </Text>
                                <Text style={styles.ContentText}>{item.ID} </Text>
                            
                            </View>
                        </TouchableOpacity>
                        
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
        marginVertical: '2%',
        
    },
    NotiText:{
        marginHorizontal: '2.5%',
        borderWidth: 1,
        borderRadius: 10,
        padding: 30,
        marginVertical: '.5%',
        borderColor:'#BFBFBF',
        flex: 1,
        flexDirection: 'row'
    },
    TitleText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    ContentText: {
        fontSize: 16,
        marginLeft: 20,
    },
 });