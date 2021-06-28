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
import {TextInput} from 'react-native-paper';
import Toast from 'react-native-toast-message';
export default function AccountDetail() {
  const token = useContext(TokenContext);
  const [info, setInfo] = useState({
    status: '',
    _id: '',
    email: '',
    phone: '',
    full_name: '',
    date_of_birth: '',
    faculty: '',
  });
  const [update, setUpdate] = useState(false);
  const getLectureInfo = async () => {
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
  };
  useEffect(async () => {
    await getLectureInfo();
    return () => {
      setInfo();
    };
  }, []);
  const handlerCancel = () => {
    setUpdate(false);
    getLectureInfo();
  };
  const save = async () => {
    await setTimeout(async () => {
      await fetch(`${apiURL}/lecture`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({email: info.email, phone: info.phone}),
      })
        .then(res => res.json())
        .then(res => {
          if (res.statusCode === 200) {
            setUpdate(false);
            return Toast.show({
              type: 'success',
              position: 'top',
              text1: 'Cập nhật thành công ',
              visibilityTime: 2000,
              autoHide: true,
            });
          } else {
            return Toast.show({
              type: 'error',
              position: 'top',
              text1: 'Cập nhật thất bại ',
              text2: JSON.stringify(res.messages),
              autoHide: true,
            });
          }
        })
        .catch(error => {
          console.log('Error update lecture', error);
        });
    }, 1000);
  };
  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.inforView}>
        <View style={styles.inforText}>
          <View style={styles.avatar}>
            <Avatar.Image size={140} source={Image1} />
          </View>
          <Text style={styles.TitleText}>{info.full_name}</Text>
          <Text style={styles.SubTitleText}>Giảng viên</Text>
        </View>
        {!update ? (
          <View style={styles.ContentText}>
            <View style={styles.SubContentText}>
              <Text style={styles.lable}>Ngày sinh:</Text>
              <Text style={styles.textx}>
                {info.date_of_birth
                  .split('T')[0]
                  .split('-')
                  .reverse()
                  .join('/')}
              </Text>
            </View>
            <View style={styles.SubContentText}>
              <Text style={styles.lable}>Khoa:</Text>
              <Text style={styles.textx}>{info.faculty}</Text>
            </View>
            <View style={styles.SubContentText}>
              <Text style={styles.lable}>Email:</Text>
              <Text style={styles.textx}>{info.email}</Text>
            </View>
            <View style={styles.SubContentText}>
              <Text style={styles.lable}>Số điện thoại:</Text>
              <Text style={styles.textx}>{info.phone}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.ContentText}>
            <View style={styles.SubContentText}>
              <Text style={styles.lable}>Ngày sinh:</Text>
              <Text style={styles.textx}>
                {info.date_of_birth
                  .split('T')[0]
                  .split('-')
                  .reverse()
                  .join('/')}
              </Text>
            </View>
            <View style={styles.SubContentText}>
              <Text style={styles.lable}>Khoa:</Text>
              <Text style={styles.textx}>{info.faculty}</Text>
            </View>
            <View
              style={(styles.SubContentText, {width: '90%', marginTop: 10})}>
              <TextInput
                label="Email"
                mode="outlined"
                // multiline={true}
                value={info.email}
                onChangeText={text => setInfo({...info, email: text})}
              />
            </View>
            <View
              style={(styles.SubContentText, {width: '90%', marginTop: 10})}>
              <TextInput
                label="Số điện thoại"
                mode="outlined"
                // multiline={true}
                value={info.phone}
                onChangeText={text => setInfo({...info, phone: text})}
              />
            </View>
          </View>
        )}
        {!update ? (
          <View style={styles.container1}>
            <View style={{marginBottom: 10}}>
              <Button
                title="Cập nhật thông tin"
                onPress={() => {
                  setUpdate(!update);
                }}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <Button title="Đổi mật khẩu" />
            </View>
            <View style={{marginBottom: 10}}>
              <Button
                title="Đăng xuất"
                // isProcessing={isProcessing}
                // onPress={() => setUpdate(true)}
              />
            </View>
          </View>
        ) : (
          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{marginRight: 20}}>
              <Button
                title="Lưu thay đổi"
                onPress={() => {
                  save();
                }}
              />
            </View>
            <View style={{marginLeft: 20}}>
              <Button
                title="Hủy"
                onPress={() => {
                  handlerCancel();
                }}
              />
            </View>
          </View>
        )}
      </View>
      <Toast ref={ref => Toast.setRef(ref)} />
    </SafeAreaView>
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
    marginTop: 5,
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
    fontSize: 16,
  },
  textx: {
    flex: 5,
    fontSize: 16,
  },
  container1: {
    // flex: 1,
    paddingVertical: 10,
    // paddingHorizontal: 5,
    alignItems: 'center',
  },
});
