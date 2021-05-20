import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, View, Text, ScrollView, Button} from 'react-native';
// import {Button, } from 'react-native-paper';
import information from '../ClassManagement/informationOfStudent';
import listStudent from '../ClassManagement/listStudent';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TokenContext from '../../Context/TokenContext';

function listClass({navigation}) {
  const token = useContext(TokenContext);
  const [classList, setClassList] = useState([]);

  useEffect(async () => {
    //setError({ username: usernameValidator(username), password: passwordValidator(password) })
    await fetch('http://quocha.xyz/api/class/admin', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then(res => res.json())
      .then(res => {
        setClassList(res.data);
      });
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
                onPress={() => {
                  navigation.navigate('Danh sách lớp');
                }}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Thông tin lớp học"
          component={listClass}
          options={{
            headerTitle: 'Thông tin lớp học',
            headerTintColor: '#FEFEFE',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#4B75F2',
            },
          }}></Stack.Screen>
        <Stack.Screen
          name="Danh sách lớp"
          component={listStudent}
          options={{
            headerTintColor: '#FEFEFE',
            headerTitleAlign: 'center',

            headerStyle: {
              backgroundColor: '#4B75F2',
            },
          }}></Stack.Screen>
        <Stack.Screen
          name="Thông tin sinh viên"
          component={information}
          options={{
            headerTintColor: '#FEFEFE',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#4B75F2',
            },
          }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
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
export default App;
