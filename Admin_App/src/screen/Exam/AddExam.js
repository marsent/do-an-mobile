import { Picker as PickerBase } from '@react-native-picker/picker'
import React, { useState, useContext, useEffect } from 'react'
import { View, ScrollView, TextInput as TextInputBase, TouchableOpacity, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import DocumentPicker from 'react-native-document-picker'
import RNFS from 'react-native-fs';
import { RadioButton, Checkbox } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import Spinkit from 'react-native-spinkit'

import styles from '../../style/style'
import { ExamUtils, ClassUtils } from '../../utils'

import TokenContext from '../../Context/TokenContext'
import { apiURL, yearList } from '../../config/config'
import {
    HeaderText,
    Text,
    Button,
    TextInput,
    Picker
} from '../../components'
import { mainWhite } from '../../style/color'



export default AddExam = ({ navigation }) => {

    const token = useContext(TokenContext)
    const initError = { name: false, class_id: false }
    const initClass = {
        "quantity": 0,
        "status": "",
        "_id": "",
        "name": "",
        "year": "",
        "faculty": "",
    }
    const [type, setType] = useState('all');
    const [questions, setQuestions] = useState([]);
    const [uploadExam, setUploadExam] = useState(false);
    const [uploadStudent, setUploadStudent] = useState(false)
    const [fileExam, setFileExam] = useState('');
    const [fileStudent, setFileStudent] = useState('');
    const [nameExam, setNameExam] = useState('');
    const [classList, setClassList] = useState([]);
    const [classId, setClassId] = useState('');
    const [time, setTime] = useState(15);
    const [error, setError] = useState(initError);
    const [previewQuestions, setPrevewQuestions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [Class, setClass] = useState(initClass)
    // get Class List

    const handlerUploadExam = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            setFileExam(res.name)
            const fileContents = await RNFS.readFile(res.uri, 'utf8').then(res => res)
                .catch(err => {
                    console.log(err.message, err.code);
                });
            setQuestions(examFromat(fileContents));
            setUploadExam(true)
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log("User cancelled the picker, exit any dialogs or menus and move on");
            } else {
                throw err;
            }
        }
    }
    const uploadStudentList = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            setFileStudent(res.name)
            const fileContents = await RNFS.readFile(res.uri, 'ascii').then(res => res)
                .catch(err => {
                    console.log(err.message, err.code);
                });
            setStudentList(studentListFromat(fileContents))
            setUploadStudent(true)
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log("User cancelled the picker, exit any dialogs or menus and move on");
            } else {
                throw err;
            }
        }
    }
    useEffect(async () => {
        try {
            await ClassUtils.getAllClass({ token })
                .then(async (res) => {
                    await setClassList(res.data)
                    if (res.data.length > 0) {
                        await setClassId(res.data[1]._id)
                    }
                })
        } catch (err) {
            console.log('Error get classList: ', err);
        }
        return () => {
            setClassList()
            setIsLoading(false)
        }
    }, [])
    useEffect(async () => {
        await setClass(classList.find(element => element._id == classId))
    }, [classId])
    const handlerSubmit = async (e) => {
        setIsLoading(true)
        const exam = {
            name: nameExam,
            for: type,
            questions: questions,
            year: new Date().getFullYear(),
            time: time,
        }
        if (type == 'class') {
            exam.class_id = classId
        }
        try {
            await setTimeout(async () => {
                ExamUtils.createExam({ token: token, exam: exam })
                    .then(res => {
                        setIsLoading(false)
                        if (res.error == 4000) return setError(res.messages)
                        if (res.error == 7000) {
                            setError({ name: '' });
                            return Toast.show({
                                type: 'error',
                                position: 'top',
                                text1: 'Thêm đề thi thất bại',
                                text2: 'Đề thi đã tồn tại trong cơ sở dữ liệu',
                                visibilityTime: 2000,
                                autoHide: true,
                            })
                        }
                        setError(initError);
                        setNameExam('');
                        setQuestions('')
                        setUploadExam(false)
                        setPrevewQuestions(false)
                        return Toast.show({
                            type: 'success',
                            position: 'top',
                            text1: 'Thêm dề thi thành công',
                            visibilityTime: 2000,
                            autoHide: true,


                        })
                    })
            }, 1000)
        }
        catch (err) {
            console.log('Error submit exam: ', err);
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: mainWhite }}>
            <HeaderText navigation={navigation}  >Tạo bài thi</HeaderText>
            <ScrollView style={{ marginTop: 30 }}>
                <View style={{ flex: 1, alignItems: 'center' }}>

                    {/* Type Exam for */}
                    <View style={{ width: '90%' }}>
                        <Picker
                            label='Loại bài thi'
                            placeholder='Loại bài thi'
                            displayValue={type}
                            selectedValue={type}
                            onValueChange={val => setType(val)}
                        >
                            <PickerBase.Item label="Tát cả sinh viên" value='all' />
                            <PickerBase.Item label='Lớp' value='class' />
                            <PickerBase.Item enabled={false} label='Nhóm' value='group' />
                        </Picker>
                    </View>
                    {/* Name exam */}
                    <View style={{ width: '90%' }}>
                        <TextInput
                            label='Tên bài thi'
                            isFocus={true}
                            outLine={true}

                            placeholder='Tên bài thi'
                            onChangeText={text => setNameExam(text)}
                            value={nameExam}
                            errorMessage={error.name}
                        />

                    </View>
                    {/* TypeExam */}
                    {type === 'class' &&
                        <View style={{ width: '90%', marginBottom: 15 }}>
                            <Picker
                                placeholder='Lớp'
                                displayValue={Class.name}
                                selectedValue={classId}
                                onValueChange={(val, index) => setClassId(val)}
                                errorMessage={error.class_id}
                            >
                                {classList.map(val => <PickerBase.Item
                                    label={val.name}
                                    value={val._id}
                                    key={val._id} />)}
                            </Picker>
                        </View>}

                    {type === 'group' && <View>
                        {uploadStudent ? (
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text>{fileStudent}</Text>
                                <TouchableOpacity onPress={() => {
                                    setuploadExam(false);
                                    setQuestions();
                                }}>
                                    <Icon name='times' />
                                </TouchableOpacity>
                            </View>
                        ) : <Button title='Chọn file danh sách sinh viên' onPress={uploadStudentList} />}
                    </View>
                    }

                    {/* Time */}
                    <View style={{ width: '90%', díplay: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Text  >Thời gian làm bài: </Text>
                        <TextInputBase
                            style={{ color: '#495057', width: '7%', fontFamily: 'Inter', fontSize: 18 }}
                            value={time.toString()}
                            onChangeText={text => setTime(text)}
                        />
                        <Text>phút</Text>

                    </View>
                    <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center' }}>
                        <Text>Xem đề thi:</Text>
                        <Checkbox
                            status={previewQuestions ? 'checked' : 'unchecked'}
                            onPress={() => setPrevewQuestions(!previewQuestions)}
                        />
                    </View>
                    <View style={{ marginTop: 20, marginBottom: 20 }}>
                        {uploadExam ? (
                            isLoading ?
                                <Spinkit type='FadingCircleAlt' size={50} color='#0598FC' />
                                : <View style={{ width: '70%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ marginRight: 5 }} >
                                        <View>
                                            <Button onPress={handlerSubmit}>Thêm đề thi</Button>
                                        </View>
                                    </View>
                                    <View>

                                        <View style={{ marginLeft: 5 }}>
                                            <Button onPress={() => {
                                                setUploadExam(false)
                                                setPrevewQuestions(false)
                                                setQuestions()
                                            }}>Hủy đề thi</Button>
                                        </View>
                                    </View>
                                </View>)
                            : <View >
                                <View>
                                    <Button onPress={handlerUploadExam}>Thêm file đề thi</Button>
                                </View>
                            </View>
                        }
                    </View>
                    <Toast ref={(ref) => Toast.setRef(ref)} />
                </View>

                {
                    (previewQuestions && questions.length > 0) &&
                    <View style={{ alignItems: 'center', marginBottom: 50 }}>
                        {questions.map((val, index) => {
                            return (
                                <View key={index} style={{ borderWidth: 1, width: '90%', marginBottom: 10, padding: 3, borderColor: '#91919a' }}>
                                    <Text size={16}>Câu {index + 1}: {val.question}</Text>
                                    <RadioButton.Group
                                        value={val.answer}
                                    >
                                        <View>
                                            {val.selection.map((question, index) => {
                                                return (
                                                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <RadioButton value={question} />
                                                        <Text size={16}>{question}</Text>
                                                    </View>
                                                )
                                            })}
                                        </View>
                                    </RadioButton.Group>
                                </View>
                            )
                        })}
                    </View>
                }

            </ScrollView >
        </SafeAreaView >
    )
}
function examFromat(csv) {
    var lines = csv.split("\n");
    var result = [];

    for (var i = 1; i < lines.length - 1; i++) {

        let line = lines[i].split(',');
        let obj = {
            question: line[0],
            answer: line[1],
            selection: line.slice(2, line.length)
        }
        result.push(obj);
    }
    return result;
}

function studentListFromat(studentList) {
    return studentList.split('\n')
}