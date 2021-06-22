import React, {useEffect, useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import Image1 from '../../asset/avt.png';
import TokenContext from '../../Context/TokenContext';
import {apiURL, authUrl} from '../../config/config';

function listStudent({route, navigation}) {
  const {_id} = route.params;
  const [info, setInfo] = useState({});
  const token = useContext(TokenContext);
  useEffect(async () => {
    // setError({
    //   username: usernameValidator(username),
    //   password: passwordValidator(password),
    // });
    await fetch(`${apiURL}/subject/lecture/${_id}`, {
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
      <ScrollView style={styles.NotiView}>
        <View style={styles.NotiText}>
          <Avatar.Image size={24} source={Image1} />
          <Text style={styles.ContentText}>{info.name} </Text>
          <Text style={styles.ContentText}>{info._id} </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  headerText: {
    position: 'relative',
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
  NotiView: {
    position: 'relative',
    marginVertical: '2%',
  },
  NotiText: {
    marginHorizontal: '2.5%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 30,
    marginVertical: '.5%',
    borderColor: '#BFBFBF',
    flex: 1,
    flexDirection: 'row',
  },
  TitleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ContentText: {
    fontSize: 16,
    marginLeft: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    // flex: 1,
    // flexDirection: 'row',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
export default listStudent;
