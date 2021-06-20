import React, {useState, useEffect, useContext} from 'react';
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
import TokenContext from '../../Context/TokenContext';
import {apiURL} from '../../config/config';
export default function AccountDetail() {
  const token = useContext(TokenContext);
  const [info, setInfo] = useState({});
  useEffect(async () => {
    await fetch(`${apiURL}/lecture`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then(res => res.json())
      .then(res => {
        setInfo(res.data);
      });
  });
  return (
    <View style={styles.Container}>
      <View style={styles.headerView}>
        {/* <Image style={styles.imageBack} source={Image2} /> */}
        <Text style={styles.headerText}>Thông tin Giảng viên</Text>
        {/* <Button style={styles.logoutButton} title="Đăng xuất"/> */}
      </View>
      <View style={styles.inforView}>
        <View style={styles.inforText}>
          <View style={styles.avatar}>
            <Avatar.Image size={140} source={Image1} />
          </View>
          <Text style={styles.TitleText}>{info.full_name}</Text>
          <Text style={styles.SubTitleText}>{info._id} | Giảng viên</Text>
        </View>
        <View style={styles.ContentText}>
          <View style={styles.SubContentText}>
            <Text style={styles.lable}>Ngày sinh:</Text>
            <Text style={styles.textx}>{info.date_of_birth}</Text>
          </View>
          <View style={styles.SubContentText}>
            <Text style={styles.lable}>Email:</Text>
            <Text style={styles.textx}>{info.email}</Text>
          </View>
          <View style={styles.SubContentText}>
            <Text style={styles.lable}>Khoa:</Text>
            <Text style={styles.textx}>{info.faculty}</Text>
          </View>
          <View style={styles.SubContentText}>
            <Text style={styles.lable}>Số điện thoại:</Text>
            <Text style={styles.textx}>{info.phone}</Text>
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
    backgroundColor: '#BFBFBF',
  },
  headerText: {
    position: 'relative',
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
    marginTop: '5%',
  },
  avatar: {
    borderWidth: 1,
    borderRadius: 70,
    borderColor: '#BFBFBF',
    marginTop: 30,
  },
  inforText: {
    marginHorizontal: '2.5%',
    marginVertical: '.5%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEFEFE',
    borderRadius: 15,
    width: '90%',
  },
  TitleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  SubTitleText: {
    fontSize: 15,
    color: 'black',
    marginBottom: 15,
  },
  ContentText: {
    marginVertical: 5,
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: '90%',
    backgroundColor: '#FEFEFE',
    borderRadius: 15,
    shadowRadius: 15,
    shadowColor: '#BFBFBF',
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
    // borderLeftWidth: 1,
    // borderLeftColor:'#BFBFBF',
    // paddingLeft: 5,
  },
});
