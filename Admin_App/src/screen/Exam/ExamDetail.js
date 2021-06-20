import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { RadioButton } from 'react-native-paper'
import Toast from 'react-native-toast-message';
import { Checkbox } from 'react-native-paper'

import styles from '../../style/style';
import { mainBlue } from '../../style/color'
import { apiURL } from '../../config/config';
import TokenContext from '../../Context/TokenContext';
import { LoadingDataModal, Text, TextInput, SubmitButtonDetail } from '../../components';
const ExamDetail = ({ route, navigation }) => {
    const token = useContext(TokenContext);
    const { _id } = route.params;
    const initExam = {
        "student_ids": [],
        "status": "",
        "_id": "",
        "name": "",
        "year": "",
        "faculty": "",
        "year": "",
        "time": "",
        "questions": [],
        "for": ""
    }
    const initClass = {
        "quantity": 0,
        "status": "",
        "_id": "",
        "name": "",
        "year": "",
        "faculty": "",
    }
    const initError = {
        "status": false,
        "_id": false,
        "name": false,
        "year": false,
        "faculty": false,
        "year": false,
        "time": false,
        "questions": [],
        "for": false
    }
    const [exam, setExam] = useState(initExam)
    const [Class, setClass] = useState(initClass);
    const [error, setError] = useState(initError)
    const [isLoadingData, setIsLoadingData] = useState(false)
    const [preview, setPreview] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false)
    const getExam = async () => {
        await fetch(`${apiURL}/exam/admin/${_id}`,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then(res => res.json())
            .then(async (res) => {
                await setExam(res.data)
            })
    }
    useEffect(async () => {
        await setIsLoadingData(true)
        await getExam()
        await setIsLoadingData(false)
        return () => {
            setExam()
        }
    }, [])

    useEffect(async () => {
        if (exam.for == 'class') {
            try {
                await fetch(`${apiURL}/class/admin/${exam.class_id}`,
                    {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        }
                    }).then(res => res.json())
                    .then(res => {
                        setClass(res.data)
                    })
            }
            catch (err) {
                console.log('Error get Class:', err);
            }
        }
    }, [exam])

    const handlerCancel = () => {
        setIsEdit(false)
        setError(initError)
        getExam()
    }
    const save = async () => {
        setIsProcessing(true)
        await setTimeout(async () => {
            try {
                await fetch(`${apiURL}/exam/admin/${_id}`,
                    {
                        method: 'PUT',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        },
                        body: JSON.stringify({ name: exam.name })
                    }).then(res => res.json())
                    .then(async (res) => {

                        if (res.statusCode == 400) {
                            return setError(res.messages)
                        }
                        if (res.statusCode = 200) {
                            setError(initError)
                            await setIsEdit(!isEdit)

                            return Toast.show({
                                type: 'success',
                                position: 'top',
                                text1: 'Cập nhật thành công ',
                                visibilityTime: 2000,
                                autoHide: true,
                            })
                        }
                    })
            }
            catch (err) {
                console.log('Error submit:', err);
            }
            await setIsProcessing(false)
        }, 1000)
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomHeaderText navigation={navigation} >Chi tiết bài thi</CustomHeaderText>
            <LoadingDataModal visible={isLoadingData} />
            {!isLoadingData && <ScrollView style={{ flex: 1 }} >
                <View style={{ marginTop: 30, alignItems: 'center' }}>

                    <View style={{ width: '90%' }}>
                        <CustomView>
                            <View style={{ flex: .8, alignItems: 'flex-end', marginRight: 10 }}>
                                <Text>Tên bài thi:</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    outLine={isEdit}
                                    outlineColor={mainBlue}
                                    isFocus={true}
                                    type='flat'
                                    editable={isEdit}
                                    value={exam.name}
                                    onChangeText={text => setExam({ ...exam, name: text })}
                                    multiline={true}

                                    errorMessage={error.name}
                                />
                            </View>
                        </CustomView>
                        <CustomView>
                            <View style={{ flex: .8, alignItems: 'flex-end', marginRight: 10 }}>
                                <Text>Thời gian thi:</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    type='flat'
                                    editable={false}
                                    value={exam.time.toString() + ' phút'} />
                            </View>
                        </CustomView>
                        <CustomView>
                            <View style={{ flex: .8, alignItems: 'flex-end', marginRight: 10 }}>
                                <Text>Số câu hỏi:</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    type='flat'
                                    editable={false}
                                    value={exam.questions.length.toString()} />
                            </View>
                        </CustomView>
                        <CustomView>
                            <View style={{ flex: .8, alignItems: 'flex-end', marginRight: 10 }}>
                                <Text>Loại bài thi:</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    type='flat'
                                    editable={false}
                                    value={exam.for} />
                            </View>
                        </CustomView>
                        {exam.for == 'class' && <CustomView>
                            <View style={{ flex: .8, alignItems: 'flex-end', marginRight: 10 }}>
                                <Text>Lớp:</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    type='flat'
                                    editable={false}
                                    value={Class.name} />
                            </View>
                        </CustomView>}
                        <CustomView >
                            <View style={{ flex: .8, alignItems: 'flex-end', marginRight: 10 }}>
                                <Text>Xem câu hỏi</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Checkbox
                                    status={preview ? 'checked' : 'unchecked'}
                                    onPress={() => setPreview(!preview)}
                                />
                            </View>

                        </CustomView>
                    </View>
                    <SubmitButtonDetail
                        isEdit={isEdit}
                        isProcessing={isProcessing}
                        onEditPress={() => setIsEdit(true)}
                        onCancelPress={() => handlerCancel()}
                        onSavePress={() => save()}
                    />


                    {preview && <View style={{ width: '95%', marginTop: 20 }}>
                        <View style={{ alignItems: 'center' }}>
                            {exam.questions.map((val, index) => {
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
                    </View>}

                </View>
            </ScrollView>}
            <Toast ref={(ref) => Toast.setRef(ref)} />

        </SafeAreaView >
    );
};


// const Text = ({children, size = 18, color = '#22272E'}) => {
//     return (
//         <Text style={{ fontSize: size, fontFamily: 'Inter', color: color }}>
//             {children}
//         </Text>
//     )
// }
const CustomView = ({ children }) => {

    return <View style={{
        display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
    }} >
        {children}
    </View >
}

// const TextInput = ({value, onChangeText, edit, }) => {
//     return <TextInput
//         style={{ color: '#495057', width: '50%', marginRight: '10%', fontFamily: 'Inter', fontSize: 18, }}
//         value={value}
//         onChangeText={(text) => onChangeText(text)}
//         editable={false}
//     />

// }

// const CustomButton = ({ children, onPress, style }) => {
//     return (
//         <TouchableOpacity style={[{ backgroundColor: '#0598FC', height: 40, alignItems: 'center', borderRadius: 30, elevation: 5, paddingVertical: 5, width: 130 }, style]}
//             onPress={onPress}
//         >
//             <Text color='#FFFFFF'>{children}</Text>
//         </TouchableOpacity >
//     )
// }

const CustomHeaderText = ({ children, navigation }) => {

    return (
        <View style={[styles.headerView, { display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }]}>
            <View style={{ position: 'absolute', width: '100%', alignItems: 'center' }}>
                <Text style={styles.headerText}>{children}</Text>
            </View>

            <TouchableOpacity style={{ marginLeft: 10 }}
                onPress={() => navigation.goBack()}
            >
                <Icon name='arrow-left' color='#FFFFFF' size={24} />
            </TouchableOpacity>
        </View>
    )
}


export default ExamDetail;