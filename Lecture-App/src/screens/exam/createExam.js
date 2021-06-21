import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import TokenContext from '../../Context/TokenContext';
import {apiURL, authUrl} from '../../config/config';
import {Picker} from '@react-native-picker/picker';
function createExam() {
  const [className, setClassName] = useState('IS336.L11');
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.createExam}>
          <Text style={styles.text}>Lớp</Text>
          <Picker
            style={{width: '70%'}}
            selectedValue={className}
            onValueChange={(item, index) => {
              setClassName(item);
            }}>
            <Picker.Item label="IS336.L11" value="IS336.L11" />
            <Picker.Item label="IS336.L12" value="IS336.L12" />
          </Picker>
        </View>
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
  text: {
    paddingTop: 20,
    paddingLeft: 10,
  },
  createExam: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
});
export default createExam;
