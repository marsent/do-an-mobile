import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Switch } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message'

import { apiURL } from '../../config/config';
import styles from '../../style/style';
import TokenContext from '../../Context/TokenContext';
import {
    SubmitButtonDetail,
    TextInput,
    Text,
    HeaderUserDetail,
    LoadingDataModal
} from '../../components'

const StudentDetail = ({ route, navigation }) => {
    const token = useContext(TokenContext);
    const initStudent = {
        "_id": "",
        "class_id": "",
        "date_of_birth": "",
        "decrypt_pass": "",
        "email": "",
        "full_name": "",
        "is_verified": "",
        "password": "",
        "phone": "",
        "status": "",
        "student_code": "",
        "year": ''
    }
    const initClass = {
        "_id": "60adfe4174ae7a46751debf",
        "faculty": "",
        "name": "",
        "quantity": '',
        "status": "",
        "year": ''
    }

    const { _id } = route.params;
    const [student, setStudent] = useState(initStudent)
    const [isEdit, setIsEdit] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [Class, setClass] = useState(initClass)
    const [isProcessing, setIsProcessing] = useState(false)
    useEffect(async () => {
        setIsLoading(true)
        await fetch(`${apiURL}/student/admin/${_id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => res.json())
            .then(async (res) => {
                await setStudent(res.data)
            })
        setIsLoading(false)
        return () => {
            setStudent();
            setClass();
        }
    }, [])

    useEffect(async () => {
        await fetch(`${apiURL}/class/admin/${student.class_id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => res.json())
            .then(async (res) => {
                await setClass(res.data)
            })
        setIsLoading(false)
    }, [student.class_id])


    const save = async () => {
        setIsProcessing(true)
        await setTimeout(async () => {
            await fetch(`${apiURL}/student/admin/${_id}`,
                {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify({ status: student.status })
                }).then(res => res.json())
                .then(async (res) => {
                    setIsProcessing(false)
                    if (res.statusCode == 200) {
                        setIsEdit(false);
                        return Toast.show({
                            type: 'success',
                            position: 'top',
                            text1: 'Cập nhật thành công ',
                            visibilityTime: 2000,
                            autoHide: true,
                        })
                    }
                    return Toast.show({
                        type: 'error',
                        position: 'top',
                        text1: 'Cập nhật thất bại ',
                        visibilityTime: 2000,
                        autoHide: true,
                    })
                })
        }, 1000)

    }

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <HeaderUserDetail
                onBackPress={() => navigation.goBack()}
            />
            <LoadingDataModal visible={isLoading} />
            {!isLoading && <View style={{ marginTop: 30, alignItems: 'center' }}>
                <View style={{ width: '90%' }}>
                    <CustomVIew  >
                        <View style={{ flex: .8, alignItems: 'flex-end', marginRight: 10 }}>
                            <Text>Mã sinh viên:</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                type='flat'
                                value={student.student_code} />
                        </View>
                    </CustomVIew>
                    <CustomVIew>
                        <View style={{ flex: .8, alignItems: 'flex-end', marginRight: 10 }}>
                            <Text>Họ tên:</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                type='flat'
                                value={student.full_name} />
                        </View>
                    </CustomVIew>
                    <CustomVIew>
                        <View style={{ flex: .8, alignItems: 'flex-end', marginRight: 10 }}>
                            <Text>Ngày sinh:</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                type='flat'
                                value={student.date_of_birth.split('T')[0]} />
                        </View>
                    </CustomVIew>
                    <CustomVIew>
                        <View style={{ flex: .8, alignItems: 'flex-end', marginRight: 10 }}>
                            <Text>Lớp sinh hoạt:</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                type='flat'
                                value={Class.name} />
                        </View>
                    </CustomVIew>
                    <CustomVIew>
                        <View style={{ flex: .8, alignItems: 'flex-end', marginRight: 10 }}>
                            <Text>Số điện thoại:</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                type='flat'
                                value={student.phone} />
                        </View>
                    </CustomVIew>
                    <CustomVIew>
                        <View style={{ flex: .8, alignItems: 'flex-end', marginRight: 10 }}>
                            <Text>Email:</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                type='flat'
                                value={student.email} />
                        </View>
                    </CustomVIew>
                    <CustomVIew>
                        <View style={{ flex: .8, alignItems: 'flex-end', marginRight: 10 }}>
                            <Text>Trạng thái:</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Picker style={{ marginRight: '23%' }}
                                mode='dropdown'
                                itemStyle={{ fontFamily: 'Inter', fontSize: 18 }}
                                enabled={isEdit}
                                selectedValue={student.status}
                                onValueChange={val => setStudent({ ...student, status: val })}
                            >
                                <Picker.Item label='Active' value='active' />
                                <Picker.Item label='Disable' value='disabled' />
                            </Picker>
                        </View>
                    </CustomVIew>

                </View>
                <SubmitButtonDetail
                    isEdit={isEdit}
                    isProcessing={isProcessing}
                    onEditPress={() => setIsEdit(true)}
                    onSavePress={() => save()}
                    onCancelPress={() => setIsEdit(false)}
                />

            </View>}
            <Toast ref={(ref) => Toast.setRef(ref)} />

        </SafeAreaView >
    );
};


const CustomVIew = ({ children }) => {

    return <View style={{
        width: '100%', flexDirection: 'row', alignItems: 'center'
    }} >
        {children}
    </View >
}

// const TextInput = ({ value, onChangeText, edit }) => {
//     return <TextInput
//         style={{ color: '#495057', width: '50%', marginRight: '10%', fontFamily: 'Inter', fontSize: 18 }}
//         value={value}
//         onChangeText={(text) => onChangeText(text)}
//         editable={false}
//     />

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

export default StudentDetail;