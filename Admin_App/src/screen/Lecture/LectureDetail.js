import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, View, TextInput, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Picker } from '@react-native-picker/picker';

import styles from '../../style/style'
import { apiURL } from '../../config/config';
import TokenContext from '../../Context/TokenContext'
import Text from '../../components/Text'
import Button from '../../components/Button'
import { Avatar } from 'react-native-paper';
import HeaderUserDetail from '../../components/HeaderUserDetail'
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

    useEffect(async () => {

        await fetch(`${apiURL}/lecture/admin/${_id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => res.json())
            .then(async (res) => {
                await setLecture(res.data)
            })

        return () => {
            setLecture()
        }
    }, [])

    const save = () => {



    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
            {/* <CustomHeaderText navigation={navigation} >Chi tiết giảng viên</CustomHeaderText> */}
            <HeaderUserDetail
                src={require('../../../assets/public/img/profile.png')}
                onBackPress={() => navigation.goBack()}
            />

            <View style={{ alignItems: 'center' }}>

                <View style={{ width: '90%', marginLeft: '10%' }}>
                    <CustomView>
                        <Text>Họ tên:</Text>
                        <CustomInput value={lecture.full_name} />
                    </CustomView>
                    <CustomView>
                        <Text>Ngày sinh:</Text>
                        <CustomInput value={lecture.date_of_birth.split('T')[0]} />
                    </CustomView>
                    <CustomView>
                        <Text>Số điện thoại:</Text>
                        <CustomInput value={lecture.phone} />
                    </CustomView>
                    <CustomView>
                        <Text>Email:</Text>
                        <CustomInput value={lecture.email} />
                    </CustomView>
                    <CustomView>
                        <Text>Trạng thái:</Text>
                        <Picker style={{ width: '40%', marginRight: '23%' }}
                            mode='dropdown'
                            itemStyle={{ fontFamily: 'Inter', fontSize: 18 }}
                            enabled={isEdit}
                            selectedValue={lecture.status}
                            onValueChange={val => setLecture({ ...lecture, status: val })}
                        >
                            <Picker.Item label='Active' value='active' />
                            <Picker.Item label='Disable' value='disable' />
                        </Picker>
                    </CustomView>


                </View>
                <View style={{ marginBottom: 10 }}>
                    {!isEdit ?
                        <Button onPress={() => setIsEdit(true)} >Chỉnh sửa</Button>
                        :
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Button style={{ marginRight: 5 }} onPress={() => save()}>Cập nhật</Button>
                            <Button style={{ marginLeft: 5 }} onPress={() => setIsEdit(false)}>Hủy</Button>
                        </View>
                    }
                </View>
            </View>
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

const CustomInput = ({ value, onChangeText, edit }) => {
    return <TextInput
        style={{ color: '#495057', width: '50%', marginRight: '10%', fontFamily: 'Inter', fontSize: 18 }}
        value={value}
        onChangeText={(text) => onChangeText(text)}
        editable={false}
    />

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

export default LectureDetail;