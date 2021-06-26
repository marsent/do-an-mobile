import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {CheckBox} from 'react-native-elements';
import TokenContext from '../../Context/TokenContext';
import {apiURL, authUrl} from '../../config/config';
const examDetail = ({route}) => {
  const {_id} = route.params;
  const token = useContext(TokenContext);
  const [exam, setexam] = useState({
    student_ids: [],
    status: '',
    _id: '',
    name: '',
    year: '',
    faculty: '',
    year: '',
    time: '',
    questions: [],
    for: '',
  });
  const [subject, setSubject] = useState({
    quantity: 0,
    status: '',
    _id: '',
    name: '',
    year: '',
    faculty: '',
  });
  const [check, SetCheck] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const getExam = async () => {
    await fetch(`http://quocha.xyz/api/exam/lecture/${_id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then(res => res.json())
      .then(res => {
        setexam(res.data);
      })
      .catch(error => console.log('error', error));
  };
  useEffect(async () => {
    await setIsLoadingData(true);
    await getExam();
    await setIsLoadingData(false);
    return () => {
      setExam();
    };
  }, []);
  useEffect(async () => {
    if (exam.for === 'subject') {
      await fetch(`http://quocha.xyz/api/subject/lecture/${exam.subject_id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
        .then(res => res.json())
        .then(res => {
          setSubject(res.data);
        })
        .catch(error => {
          console.log('error', error);
        });
    }
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>{exam.name}</Text>
      </View>
      <View style={styles.container1}>
        <View style={styles.ContentText}>
          <View style={styles.SubContentText}>
            <Text style={styles.lable}>Thời gian:</Text>
            <Text style={styles.textx}> {exam.time} phút</Text>
          </View>
          <View style={styles.SubContentText}>
            <Text style={styles.lable}>Số lượng câu hỏi:</Text>
            <Text style={styles.textx}>{exam.questions.length.toString()}</Text>
          </View>
          <View style={styles.SubContentText}>
            <Text style={styles.lable}>Loại bài thi:</Text>
            <Text style={styles.textx}>{exam.for}</Text>
          </View>
          {exam.for === 'subject' && (
            <View style={styles.SubContentText}>
              <Text style={styles.lable}>Lớp:</Text>
              <Text style={styles.textx}>{subject.name}</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.container1}>
        <CheckBox
          title="Xem câu hỏi"
          checked={check}
          onPress={() => SetCheck(!check)}
          checkedColor={'green'}
        />
      </View>
      <ScrollView>
        {check == true && (
          <View>
            {exam.questions.map((item, i) => {
              return (
                <RadioButton.Group key={i} value={item.answer}>
                  <View style={styles.questionBox}>
                    <Text style={styles.label}>
                      Câu {i + 1}: {item.question}
                    </Text>
                    {item.selection.map((ans, index) => {
                      return (
                        <View key={index} style={styles.answer}>
                          <RadioButton value={ans} />
                          <Text>{ans}</Text>
                        </View>
                      );
                    })}
                  </View>
                </RadioButton.Group>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    // alignItems: 'center',
  },
  container1: {
    // flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  headerText: {
    position: 'relative',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  headerView: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '2.5%',
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
    marginBottom: '2%',
  },
  lable: {
    flex: 2,
    marginLeft: 30,
    fontSize: 16,
  },
  textx: {
    flex: 1,
    fontSize: 16,
  },
  label: {
    flex: 2,
    fontSize: 16,
  },
  questionBox: {
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: '#FEFEFE',
    borderRadius: 15,
    shadowRadius: 15,
    shadowColor: '#BFBFBF',
  },
  answer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default examDetail;
