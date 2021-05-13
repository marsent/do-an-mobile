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
  TextInput,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
export default function informationOfStudent() {
  const [lop, setLop] = useState('IS336.L11');
  const [loai, setLoai] = useState('Nghỉ');
  const [text, onChangeText] = React.useState('');
  return (
    <View style={styles.Container}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>Thông tin sinh viên</Text>
      </View>
      <View style={styles.createNoti}>
        <Text style={styles.tex}>Lớp</Text>
        <Picker
          style={{width: '60%'}}
          selectedValue={lop}
          onValueChange={(item, index) => {
            setLop(item);
          }}>
          <Picker.Item label="IS336.L11" value="IS336.L11" />
          <Picker.Item label="IS336.L12" value="IS336.L12" />
        </Picker>
      </View>
      <View style={styles.createNoti}>
        <Text>Loại thông báo</Text>
        <Picker
          style={{width: '60%'}}
          selectedValue={loai}
          onValueChange={(item, index) => {
            setLoai(item);
          }}>
          <Picker.Item label="Nghỉ" value="Nghỉ" />
          <Picker.Item label="Bù" value="Bù" />
        </Picker>
      </View>
      <View>
        <Text style={styles.text}>Nội dung</Text>
        <View style={styles.content}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            multiline={true}
            value={text}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button style={styles.button} title="Tạo thông báo" />
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
    justifyContent: 'center',
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
  createNoti: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  createNoti1: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  imageBack: {
    height: 40,
    width: 40,
  },
  text: {
    paddingTop: 20,
    paddingLeft: 10,
  },
  buttonContainer: {
    width: '60%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 100,
    margin: 12,
    borderWidth: 1,
    borderRadius: 15,
  },
});
