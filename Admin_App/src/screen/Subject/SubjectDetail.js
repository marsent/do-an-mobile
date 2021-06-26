import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { RadioButton } from 'react-native-paper'
import Toast from 'react-native-toast-message';
import { Checkbox } from 'react-native-paper'
import { Picker } from '@react-native-picker/picker'

import styles from '../../style/style';
import { mainBlue, mainWhite } from '../../style/color'
import { apiURL } from '../../config/config';
import TokenContext from '../../Context/TokenContext';
import { LoadingDataModal, Text, TextInput, SubmitButtonDetail } from '../../components';
import { SubjectUtils, LectureUtils } from '../../utils'
const SubjectDetail = ({ route, navigation }) => {
    const token = useContext(TokenContext)
    const { _id } = route.params;
    const initError = {
        name: false,
        faculty: false,
        subject_code: false,
        schedule: false,
        lecture_id: false
    }
    const initSubject = {
        _id: '',
        name: '',
        faculty: '',
        subject_code: '',
        schedule: [],
        lecture_id: '',
        status: '',
        student_quantity: 0
    }
    const [isLoadingData, setIsLoadingData] = useState(true)
    const [subject, setSubject] = useState(initSubject)
    const [error, setError] = useState(initError)
    const [isProcessing, setIsProcessing] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    useEffect(async () => {
        await SubjectUtils.getSubjectById({ token: token, id: _id })
            .then(async (res) => {
                await setSubject(res.data)
            })
        setIsLoadingData(false)
    }, [])

    const cancelHandler = () => {
        setIsEdit(false)
    }

    const save = () => {
        setIsEdit(false)
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: mainWhite }}>
            <CustomHeaderText navigation={navigation} >Chi tiết môn học</CustomHeaderText>
            <LoadingDataModal visible={isLoadingData} />
            {!isLoadingData &&
                <View style={{ flex: 1, marginTop: 30, alignItems: 'center' }}>
                    <CustomView>
                        <View style={{ flex: .8, alignItems: 'flex-end', marginRight: 10 }}>
                            <Text>Tên môn học:</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                outLine={false}
                                isFocus={true}
                                type='flat'
                                editable={false}
                                value={subject.name}
                                multiline={true}
                                errorMessage={error.name}
                            />
                        </View>
                    </CustomView>

                    <CustomView>
                        <View style={{ flex: .8, alignItems: 'flex-end', marginRight: 10 }}>
                            <Text>Mã môn học:</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                outLine={false}
                                isFocus={true}
                                type='flat'
                                editable={false}
                                value={subject.subject_code}
                                multiline={true}
                                errorMessage={error.name}
                            />
                        </View>
                    </CustomView>

                    <CustomView>
                        <View style={{ flex: .8, alignItems: 'flex-end', marginRight: 10 }}>
                            <Text>Khoa quản lý:</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                outLine={false}
                                isFocus={true}
                                type='flat'
                                editable={false}
                                value={subject.faculty}
                                multiline={true}
                                errorMessage={error.name}
                            />
                        </View>
                    </CustomView>

                    <CustomView>
                        <View style={{ flex: .8, alignItems: 'flex-end', marginRight: 10 }}>
                            <Text>Lịch học:</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                outLine={false}
                                isFocus={true}
                                type='flat'
                                editable={false}
                                value={subject.name}
                                multiline={true}
                                errorMessage={error.name}
                            />
                        </View>
                    </CustomView>

                    <CustomView>
                        <View style={{ flex: .8, alignItems: 'flex-end', marginRight: 10 }}>
                            <Text>Trạng thái:</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Picker style={{ marginRight: '23%' }}
                                mode='dropdown'
                                itemStyle={{ fontFamily: 'Inter', fontSize: 18 }}
                                enabled={false}
                                selectedValue={subject.status}
                            >
                                <Picker.Item label='Active' value='active' />
                                <Picker.Item label='Disable' value='disable' />
                            </Picker>
                        </View>
                    </CustomView>
                    <SubmitButtonDetail
                        isEdit={isEdit}
                        isProcessing={isProcessing}
                        onEditPress={() => setIsEdit(true)}
                        onSavePress={() => save()}
                        onCancelPress={() => {
                            cancelHandler()
                        }}
                    />
                </View>
            }
        </SafeAreaView>
    );
};

const CustomView = ({ children }) => {

    return <View style={{
        display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
    }} >
        {children}
    </View >
}



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


export default SubjectDetail;