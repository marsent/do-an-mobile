import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, View, Text, ScrollView, Button} from 'react-native';
// import {Button, } from 'react-native-paper';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TokenContext from '../../Context/TokenContext';
import {apiURL, authUrl} from '../../config/config';
import classDetail from '../ClassManagement/listStudent';
function listClass({navigation}) {
  const token = useContext(TokenContext);
  const [classList, setClassList] = useState([]);

  const show = async () => {
    await fetch(`${apiURL}/subject/lecture`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then(res => res.json())
      .then(async res => {
        await setClassList(res.data);
      });
  };
  useEffect(async () => {
    await show();
    return async () => {
      await setClassList();
    };
  });
  return (
    <View style={styles.Container}>
      <ScrollView style={styles.NotiView}>
        {classList.map((item, i) => (
          <View key={i} style={styles.NotiText}>
            <Text style={styles.TitleText}>{item.name} </Text>
            <Text style={styles.ContentText}>Sỉ số: {item.quantity} </Text>
            <Text style={styles.ContentText}>Khoa: {item.faculty} </Text>
            {/* <Text style={styles.ContentText}>Ngày BĐ: {item.StartDate} </Text>
          <Text style={styles.ContentText}>Ngày KT: {item.FinishDate} </Text> */}
            <View style={styles.ButtonContainer}>
              <Button
                style={styles.button}
                title=" Xem danh sách lớp"
                onPress={async () => {
                  await navigation.navigate('Xem chi tiết', {_id: item._id});
                }}
              />
            </View>
          </View>
        ))}
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
    flexDirection: 'column',
  },
  TitleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ContentText: {
    fontSize: 14,
  },
  Notification_date: {
    fontSize: 10,
    color: '#262626',
  },
  ButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  button: {
    width: '70%',
    height: 40,
    backgroundColor: '#4B75F2',

    borderRadius: 20,
  },
});
export default listClass;
