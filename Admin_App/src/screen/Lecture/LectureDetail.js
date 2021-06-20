import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message'


import styles from '../../style/style'
import { apiURL } from '../../config/config';
import { LectureUtils } from '../../utils'
import TokenContext from '../../Context/TokenContext'
import {
    Text,
    HeaderUserDetail,
    TextInput,
    SubmitButtonDetail,
    LoadingDataModal
} from '../../components'
const LectureDetail = ({ route, navigation }) => {
    const token = useContext(TokenContext);
    const { _id } = route.params;
    const initLecture = {
        "_id": "",
        "date_of_birth": "",
        "email": "",
        "faculty": "computer_science",
        "full_name": "",
        "password": "",
        "phone": "",
        "status": ""
    }

    const [lecture, setLecture] = useState(initLecture)
    const [isEdit, setIsEdit] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    useEffect(async () => {
        try {
            setIsLoading(true)
            await LectureUtils.getLectureById({ token: token, id: _id })
                .then(async (res) => {
                    await setLecture(res.data)
                })
            setIsLoading(false)
        } catch (err) {
            console.log("Error get lecture data: ", err);
        }
        return () => {
            setLecture()
        }
    }, [])

    const save = async () => {
        setIsProcessing(true)
        setTimeout(async () => {
            try {
                await fetch(`${apiURL}/lecture/admin/${_id}`,
                    {
                        method: 'PUT',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        },
                        body: JSON.stringify({ status: lecture.status })
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
            }
            catch (err) {
                console.log("error submit error: ", err);
            }
        }, 1000)
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderUserDetail
                src={require('../../../assets/public/img/profile.png')}
                onBackPress={() => navigation.goBack()}
            />
            <LoadingDataModal visible={isLoading} />
            { !isLoading && <View style={{ alignItems: 'center' }}>

                <View style={{ width: '90%' }}>
                    <CustomView>
                        <View style={{ flex: .8, alignItems: 'flex-end', marginRight: 10 }}>
                            <Text>Họ tên:</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                outLine={false}
                                type='flat'
                                editable={false}
                                value={lecture.full_name} />
                        </View>
                    </CustomView>
                    <CustomView>
                        <View style={{ flex: .8, alignItems: 'flex-end', marginRight: 10 }}>
                            <Text>Ngày sinh:</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                outLine={false}
                                type='flat'
                                editable={false}
                                value={lecture.date_of_birth.split('T')[0].split('-').reverse().join('/')} />
                        </View>
                    </CustomView>
                    <CustomView>
                        <View style={{ flex: .8, alignItems: 'flex-end', marginRight: 10 }}>
                            <Text>Số điện thoại:</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                outLine={false}
                                type='flat'
                                editable={false}
                                value={lecture.phone} />
                        </View>
                    </CustomView>
                    <CustomView>
                        <View style={{ flex: .8, alignItems: 'flex-end', marginRight: 10 }}>
                            <Text>Email:</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                outLine={false}
                                multiline={true}
                                type='flat'
                                editable={false}
                                value={lecture.email} />
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
                                enabled={isEdit}
                                selectedValue={lecture.status}
                                onValueChange={val => setLecture({ ...lecture, status: val })}
                            >
                                <Picker.Item label='Active' value='active' />
                                <Picker.Item label='Disable' value='disable' />
                            </Picker>
                        </View>
                    </CustomView>



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


const CustomView = ({ children }) => {

    return <View style={{
        display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
    }} >
        {children}
    </View >
}

export default LectureDetail;