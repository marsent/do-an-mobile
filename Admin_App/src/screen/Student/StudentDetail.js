import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Switch } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message'

import { apiURL } from '../../config/config';
import styles from '../../style/style';
import Text from '../../components/Text';
import Button from '../../components/Button';
import TokenContext from '../../Context/TokenContext';
import LoadingModal from '../../components/LoadingModal';
const StudentDetail = ({ route, navigation }) => {
    const token = useContext(TokenContext);

    const student = route.params.item;
    const class_name = route.params.class_name;
    const [isEdit, setIsEdit] = useState(false)
    const [status, setStatus] = useState(student.status)
    const [isLoading, setIsLoading] = useState(false);
    const save = async () => {
        setIsEdit(false);
        setIsLoading(true)
        await setTimeout(async () => {
            await fetch(`${apiURL}/student/admin/${student._id}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(status)
            }).then(res => {
                res.json()
                console.log(res);
            }).then((res) => {
                setIsLoading(false);
                return Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Cập nhật thành công thành công',
                    visibilityTime: 2000,
                    autoHide: true,
                })
            })
        }, 2000)


    }

    return (
        <SafeAreaView>
            <CustomHeaderText navigation={navigation} >Chi tiết sinh viên</CustomHeaderText>
            <LoadingModal isVisible={isLoading} />
            <View style={{ marginTop: 30, alignItems: 'center' }}>

                <View style={{ width: '90%', marginLeft: '10%' }}>
                    <CustomVIew  >
                        <Text>Mã sinh viên:</Text>
                        <CustomInput value={student.student_code} />
                    </CustomVIew>
                    <CustomVIew>
                        <Text>Họ tên:</Text>
                        <CustomInput value={student.full_name} />
                    </CustomVIew>
                    <CustomVIew>
                        <Text>Ngày sinh:</Text>
                        <CustomInput value={student.date_of_birth.split('T')[0]} />
                    </CustomVIew>
                    <CustomVIew>
                        <Text>Lớp sinh hoạt:</Text>
                        <CustomInput value={class_name} />
                    </CustomVIew>
                    <CustomVIew>
                        <Text>Số điện thoại:</Text>
                        <CustomInput value={student.phone} />
                    </CustomVIew>
                    <CustomVIew>
                        <Text>Email:</Text>
                        <CustomInput value={student.email} />
                    </CustomVIew>
                    <CustomVIew>
                        <Text>Trạng thái:</Text>
                        <Picker style={{ width: '40%', marginRight: '23%' }}
                            mode='dropdown'
                            itemStyle={{ fontFamily: 'Inter', fontSize: 18 }}
                            enabled={isEdit}
                            selectedValue={status}
                            onValueChange={val => setStatus(val)}
                        >
                            <Picker.Item label='Active' value='active' />
                            <Picker.Item label='Disable' value='disable' />
                        </Picker>
                    </CustomVIew>


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
            <Toast ref={(ref) => Toast.setRef(ref)} />

        </SafeAreaView >
    );
};


const CustomVIew = ({ children }) => {

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

export default StudentDetail;