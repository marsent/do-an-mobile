import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  Button,
  Image,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import Image1 from '../../asset/avt.png';
import Image2 from '../../asset/arrow_back.png';
export default function AccountDetail() {
  const accountData = {
    ID: '18521467',
    Avatar: Image1,
    Name: 'Đào Huỳnh Minh Thuận',
    DateOfBirth: '06/01/2000',
    Major: 'TMĐT2018',
    Address: 'KTX Khu B ĐHQG Tp. Hồ Chí Minh',
    Grade: 3,
    Status: '1',
    role: 'Sinh viên',
  };
  return (
    <View style={styles.Container}>
      <View style={styles.headerView}>
        <Image style={styles.imageBack} source={Image2} />
        <Text style={styles.headerText}>Thông tin sinh viên</Text>
      </View>
      <View style={styles.inforView}>
        <View style={styles.avatar}>
          <Avatar.Image size={140} source={Image1} />
        </View>
        <View style={styles.inforText}>
            <Text style={styles.TitleText}>{accountData.Name}</Text>
            <Text style={styles.SubTitleText}>{accountData.ID}   |   {accountData.role}</Text>
            <View style={styles.ContentText}>
                <View style={styles.SubContentText}>
                    <Text style={styles.lable}>Ngày sinh:</Text>
                    <Text style={styles.textx}>{accountData.DateOfBirth}</Text>
                </View>
                <View style={styles.SubContentText}>
                    <Text style={styles.lable}>Địa chỉ hiện tại:</Text>
                    <Text style={styles.textx}>{accountData.Address}</Text>
                </View>
                <View style={styles.SubContentText}>
                    <Text style={styles.lable}>lớp:</Text>
                    <Text style={styles.textx}>{accountData.Major}</Text>
                </View>
            </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 5,
        alignItems: 'center',
        flexDirection: 'column',
    },
    headerText: {
        position: "relative",
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FEFEFE',
        textAlign: 'center',
    },
    headerView: {
        position: 'relative',
        justifyContent: 'center',
        paddingVertical: '2.5%',
        backgroundColor: '#4B75F2',
    },
    inforView: {
        position: 'relative',
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        marginTop:'10%',
        borderWidth: 1,
        borderRadius: 70,
        borderColor:'#BFBFBF',
    },
    inforText: {
        marginHorizontal: '2.5%',
        marginVertical: '.5%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    TitleText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    SubTitleText: {
        fontSize: 15,
        color:'black',
    },
    ContentText: {
        marginVertical: '10%',
        width: '90%',
    },
    SubContentText: {
        justifyContent: 'space-around',
        fontSize: 15,
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: '1%',
    },
    imageBack: {
        position: 'absolute',
        height: 20,
        width: 20,
        marginLeft: '2.5%',
    },
    lable: {
        flex: 3,
    },
    textx: {
        flex: 5,
    }
});
