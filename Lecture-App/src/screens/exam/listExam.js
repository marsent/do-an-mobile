import React, {useState, useEffect, useContext} from 'react';
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
import TokenContext from '../../Context/TokenContext';
import {apiURL, authUrl} from '../../config/config';
function exam({navigation}) {
  const token = useContext(TokenContext);
  const [listExam, setListExam] = useState([]);

  useEffect(async () => {
    await fetch(`${apiURL}/exam/lecture`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then(res => res.json())
      .then(res => {
        setListExam(res.data);
      });
  });
  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.ButtonContainer}>
        <Button
          title="Tạo bài thi mới"
          style={styles.button}
          color="#3891E9"
          onPress={() => {
            navigation.navigate('Tạo bài thi');
          }}
        />
      </View>
      <ScrollView style={styles.NotiView}>
        {listExam.map((item, i) => (
          <TouchableOpacity
            style={styles.Button}
            key={i}
            onPress={() => {
              navigation.navigate('Xem bài kiểm tra', {_id: item._id});
            }}>
            <View style={styles.NotiText}>
              <Text style={styles.TitleText}>{item.name} </Text>
              <Text style={styles.ContentText}>{item.for} </Text>
              <Text style={styles.Notification_date}>{item.time} </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  ContentText: {
    fontSize: 18,
  },
  Notification_date: {
    fontSize: 18,
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
  ButtonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  Button: {
    paddingHorizontal: 10,
  },
});
export default exam;
