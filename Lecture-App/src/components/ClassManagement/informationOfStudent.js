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
export default function informationOfStudent() {
  const listStudentData = {
    ID: '18521467',
    Avatar: Image1,
    Name: 'Đào Huỳnh Minh Thuận',
    DateOfBirth: '06/01/2000',
    Major: 'TMĐT2018',
    Address: 'KTX Khu B',
    Grade: 3,
    Status: '1',
  };
  return (
    <View style={styles.Container}>
      <View style={styles.headerView}>
        <Image style={styles.imageBack} source={Image2} />
        <Text style={styles.headerText}>Thông tin sinh viên</Text>
      </View>
      <View style={styles.inforView}>
        <View style={styles.avatar}>
          <Avatar.Image size={150} source={Image1} />
        </View>
        <View style={styles.inforText}>
          <Text style={styles.TitleText}>{listStudentData.Name}</Text>
          <View>
            <Text style={styles.ContentText}>MSSV: {listStudentData.ID}</Text>
            <Text style={styles.ContentText}>
              Sinh viên năm: {listStudentData.Grade}
            </Text>
            <Text style={styles.ContentText}>Lớp: {listStudentData.Major}</Text>
            <Text style={styles.ContentText}>
              Ngày sinh: {listStudentData.DateOfBirth}
            </Text>
            <Text style={styles.ContentText}>
              Địa chỉ hiện tại: {listStudentData.Address}
            </Text>
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
    position: 'relative',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FEFEFE',
    marginLeft: 70,
  },
  headerView: {
    position: 'relative',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: '2.5%',
    backgroundColor: '#4B75F2',
    flexDirection: 'row',
  },
  inforView: {
    position: 'relative',
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    marginTop: 20,
  },
  inforText: {
    // marginHorizontal: '2.5%',
    marginVertical: '.5%',
    borderColor: '#BFBFBF',

    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 30,
  },
  TitleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  ContentText: {
    fontSize: 16,
  },
  imageBack: {
    height: 40,
    width: 40,
  },
});
