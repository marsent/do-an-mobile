import React, {useState, Component, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Button,
  Modal,
} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import CreateNotification from '../createNotification/createNotification';
import Image1 from '../../asset/add.png';
function Notification() {
  const notification_data = [
    {
      ID: '123',
      Name: 'Domo 1',
      Content: 'Content 1',
      Date_created: '01/01/2021',
      Update_date: '01/01/2021',
      Status: '1',
    },
    {
      ID: '321',
      Name: 'Domo 2',
      Content: 'Content 2',
      Date_created: '02/02/2021',
      Update_date: '02/02/2021',
      Status: '0',
    },
  ];
  return (
    <SafeAreaView style={styles.Container}>
      <ScrollView style={styles.NotiView}>
        {notification_data.map((item, i) => (
          <View key={i} style={styles.NotiText}>
            <Text style={styles.TitleText}>{item.Name} </Text>
            <Text style={styles.ContentText}>{item.Content} </Text>
            <Text style={styles.Notification_date}>{item.Update_date} </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
const Stack = createStackNavigator();
function App() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <NavigationContainer>
      <Modal
        animationType="slide"
        transparent={true}
        backdrop={true}
        position="center"
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <CreateNotification />
            <Button
              style={[styles.button, styles.buttonClose]}
              title="Tạo thông báo"
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </Modal>
      <Stack.Navigator>
        <Stack.Screen
          name="Danh sách thông báo"
          component={Notification}
          options={{
            headerTintColor: '#FEFEFE',
            headerTitleAlign: 'center',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}>
                <Image style={styles.image} source={Image1} />
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: '#4B75F2',
            },
          }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
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
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 10,
    marginVertical: '.5%',
    borderColor: '#BFBFBF',
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
  image: {
    height: 40,
    width: 40,
    marginRight: 10,
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
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
export default App;
