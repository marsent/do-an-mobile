import { Picker } from '@react-native-picker/picker'
import React, { useState, useContext, useEffect } from 'react'
import { Button, TextInput, TouchableOpacity } from 'react-native'
import { View, Text, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import DocumentPicker from 'react-native-document-picker'
import RNFS, { uploadFiles } from 'react-native-fs';
import { RadioButton } from 'react-native-paper'
import Toast from 'react-native-toast-message'

import HeaderText from '../components/HeaderText'
import styles from '../style/style'
import TokenContext from '../Context/TokenContext'
import { apiURL } from '../config/config'
import { ButtonGroup } from 'react-native-elements/dist/buttons/ButtonGroup'

export default AddExam = () => {

    const token = useContext(TokenContext)
    const [type, setType] = useState('all');
    const [questions, setQuestions] = useState([]);
    const [uploadExam, setUploadExam] = useState(false);
    const [uploadStudent, setUploadStudent] = useState(false)
    const [fileExam, setFileExam] = useState('');
    const [fileStudent, setFileStudent] = useState('');
    const [studentList, setStudentList] = useState([]);
    const [nameExam, setNameExam] = useState('');
    const [classList, setClassList] = useState([]);
    const [classId, setClassId] = useState();
    const [time, setTime] = useState(15);
    const [error, setError] = useState({ name: '' });
    const [previewQuestions, setPrevewQuestions] = useState(false);
    // get Class List
    useEffect(async () => {
        await fetch(`${apiURL}/class/admin/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => res.json()).then(res => setClassList(res.data))
    }, [])


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

    const handlerSubmit = async (e) => {
        e.preventDefault();
        console.log(questions);
        await fetch(`${apiURL}/exam/admin`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                name: nameExam,
                for: type,
                questions: questions,
                year: new Date().getFullYear(),
                time: time,
                class_id: classId
            })
        }).then(res => res.json())
            .then(res => {
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
                setError({ name: '' });
                setNameExam('');
                setUploadExam(false)
                return Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Thêm dề thi thành công',
                    visibilityTime: 2000,
                    autoHide: true,


                })
            })
    }



    const year = new Date().getFullYear()
    const yearList = [];
    for (let i = year - 1; i <= year + 1; i++) yearList.push(i);

    return (
        <View >
            <HeaderText  >Tạo bài thi</HeaderText>
            <ScrollView >
                <View style={[styles.container, { marginTop: 0 }]}>

                    {/* Type Exam for */}
                    <View style={{ width: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                        <RadioButton.Group value={type} onValueChange={val => setType(val)}>
                            <View style={[styles.viewRadioGroup, { width: '90%', marginBottom: 10, marginLeft: 5 }]}>
                                <Text style={{ fontFamily: 'Inter', fontSize: 18 }}>Loại cuộc thi:</Text>
                                <View style={[styles.viewRadio]}>
                                    <Text style={{ fontFamily: 'Inter' }}>All</Text>
                                    <RadioButton value='all' />
                                </View>

                                <View style={[styles.viewRadio]}>
                                    <Text style={{ fontFamily: 'Inter' }}>Lớp</Text>
                                    <RadioButton value='class' />
                                </View>

                                <View style={[styles.viewRadio]}>
                                    <Text style={{ fontFamily: 'Inter' }}>Nhóm</Text>
                                    <RadioButton disabled={true} value='group' />
                                </View>

                            </View>
                        </RadioButton.Group>
                    </View>

                    {/* Name exam */}
                    <View style={{ width: '90%' }}>
                        <TextInput
                            placeholder='Tên bài thi'
                            style={[styles.input, !error.name ? null : styles.borderErr]}
                            onChangeText={text => setNameExam(text)}
                            value={nameExam}
                        />
                        {!error.name ? null : <Text style={styles.textErr}>{error.name}</Text>}

                    </View>
                    {/* Time */}
                    <View style={{ width: '90%', díplay: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'Inter', fontSize: 16, marginLeft: 10, fontSize: 18 }} >Thời gian làm bài</Text>
                        <Picker
                            style={{ width: '40%' }}
                            onValueChange={val => setTime(val)}
                        >
                            <Picker.Item label='15 phút' value={15} />
                            <Picker.Item label='30 phút' value={30} />
                            <Picker.Item label='45 phút' value={45} />
                            <Picker.Item label='60 phút' value={60} />
                            <Picker.Item label='90 phút' value={90} />
                            <Picker.Item label='120 phút' value={120} />
                            <Picker.Item label='180 phút' value={180} />
                        </Picker>
                    </View>

                    {/* TypeExam */}
                    {type === 'class' ? (
                        <View style={[styles.viewPicker, { width: '90%' }]}>
                            <Text style={{ fontFamily: 'Inter', fontSize: 18, marginLeft: 13 }}>Lớp:</Text>
                            <Picker
                                selectedValue={year}
                                style={{ width: '40%', marginRight: '18%' }}
                                onValueChange={(val) => {
                                    setClassId(val);
                                }}
                            >
                                {classList.map(val => <Picker.Item

                                    label={val.name}

                                    value={val._id}

                                    key={val._id} />)}

                            </Picker>
                        </View>
                    ) : type === 'group' ? <View>
                        {uploadStudent ? (
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text>{fileStudent}</Text>
                                <TouchableOpacity onPress={() => {
                                    setuploadExam(false);
                                    setQuestions();
                                }}>
                                    <Icon name='times' />
                                </TouchableOpacity>
                            </View>
                        ) : <Button title='Chọn file danh sách sinh viên' onPress={uploadStudentList} />
                        }

                    </View>
                        : null
                    }

                    {uploadExam ? (<View style={{ width: '70%', alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        {/* <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                            <Text style={{ fontFamily: 'Inter', fontSize: 16, marginLeft: 10, marginRight: "20%" }}>Tên file:</Text>

                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={{ fontFamily: 'Inter', fontSize: 16, marginRight: 5 }}>{fileExam}</Text>
                                <TouchableOpacity onPress={() => {
                                    setUploadExam(false);
                                    setQuestions();
                                }}>
                                    <Icon name='times' size={16} />
                                </TouchableOpacity>
                            </View>
                        </View> */}
                        <View >
                            {/* <Button title="Tạo đề thi" onPress={handlerSubmit} /> */}
                            <View>
                                <TouchableOpacity
                                    style={{ backgroundColor: '#0598FC', height: 40, alignItems: 'center', width: 140, borderRadius: 30, elevation: 5, paddingVertical: 5 }}
                                    onPress={handlerSubmit}                                >
                                    <Text style={{ fontFamily: 'Inter', fontSize: 18, color: '#FFFFFF' }}>Tạo đề thi</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            {/* <Button title='Hủy đề thi' onPress={() => {
                                setUploadExam(false)
                                setPrevewQuestions(false)
                                setQuestions()
                            }} /> */}
                            <View>
                                <TouchableOpacity
                                    style={{ backgroundColor: '#0598FC', height: 40, alignItems: 'center', width: 140, borderRadius: 30, elevation: 5, paddingVertical: 5 }}
                                    onPress={() => {
                                        setUploadExam(false)
                                        setPrevewQuestions(false)
                                        setQuestions()
                                    }}                               >
                                    <Text style={{ fontFamily: 'Inter', fontSize: 18, color: '#FFFFFF' }}>Hủy đề thi</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>)
                        : <View style={{ marginTop: 10 }}>
                            {/* <Button title='Chọn file Đề thi' onPress={handlerUploadExam} /> */}
                            <View>
                                <TouchableOpacity
                                    style={{ backgroundColor: '#0598FC', height: 40, alignItems: 'center', width: 170, borderRadius: 30, elevation: 5, paddingVertical: 5 }}
                                    onPress={handlerUploadExam}                                 >
                                    <Text style={{ fontFamily: 'Inter', fontSize: 18, color: '#FFFFFF' }}>Thêm File đề thi</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                    <Toast ref={(ref) => Toast.setRef(ref)} />
                </View>

                <View style={{ marginTop: 10 }}>
                    <TouchableOpacity onPress={() => setPrevewQuestions(!previewQuestions)}>
                        {uploadExam ? !previewQuestions ?
                            (
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                                    <Text style={{ fontFamily: 'Inter', marginRight: 2 }}>Xe trước đề thi</Text>
                                    <Icon name='chevron-down' />
                                </View>
                            )
                            : <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                                <Text style={{ fontFamily: 'Inter', marginRight: 2 }}>Thu gọn </Text>
                                <Icon name='chevron-up' />
                            </View> : null}
                    </TouchableOpacity>
                </View>

                {previewQuestions ? (
                    <View style={{ alignItems: 'center', marginBottom: 50 }}>
                        {questions.map((val, index) => {
                            return (
                                <View key={index} style={{ borderWidth: 1, width: '90%', marginBottom: 10, padding: 3, borderColor: '#91919a' }}>
                                    <Text style={{ fontFamily: 'Inter', fontSize: 16 }}>Câu {index + 1}: {val.question}</Text>
                                    <RadioButton.Group
                                        value={val.answer}
                                    >
                                        <View>
                                            {val.selection.map((question, index) => {
                                                return (
                                                    <View key={index} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                        <RadioButton value={question} />
                                                        <Text style={{ fontFamily: 'Inter', fontSize: 16 }}>{question}</Text>
                                                    </View>
                                                )
                                            })}
                                        </View>
                                    </RadioButton.Group>
                                </View>
                            )
                        })}
                    </View>
                )
                    : null}

            </ScrollView>
        </View >
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