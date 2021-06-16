import React, { useContext, useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Picker as PickerBase } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';


import HeaderText from '../../components/HeaderText'
import { apiURL, facultyList } from '../../config/config'
import TokenContext from '../../Context/TokenContext'
import TextInput from '../../components/TextInput'
import DatePicker from '../../components/DatePicker'
import Picker from '../../components/Picker'
import SubmitButton from '../../components/SubmitButton'
import Text from '../../components/Text'

const AddStudent = ({ navigation }) => {
    const initAccount = { email: '', phone: '', full_name: '', date_of_birth: '', faculty: '' }
    const initError = { email: false, phone: false, full_name: false, date_of_birth: false, faculty: false }
    const token = useContext(TokenContext)
    const [account, setAccount] = useState(initAccount);
    const [error, setError] = useState(initError);
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [completed, setCompleted] = useState(false);

    useEffect(async () => {
        await facultyList.unshift('Khoa')
        await setCompleted(true)
        return () => {
            setAccount();
            setError()
        }
    }, [])


    const onSubmitPress = async () => {
        setIsLoading(true);
        await setTimeout(async () => {
            try {
                await fetch(`${apiURL}/lecture/admin`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: JSON.stringify(account)
                }).then(res => res.json())
                    .then(res => {
                        setIsLoading(false)
                        if (res.error == 4000) return setError(res.messages)
                        if (res.error == 7000) {
                            setError(initAccount)
                            return Toast.show({
                                type: 'error',
                                position: 'top',
                                text1: 'Thêm tài khoản không thành công',
                                text2: 'email hoặc số điện thoại đã tồn tại trong hệ thống',
                                visibilityTime: 2000,
                                autoHide: true,
                            })
                        }
                        setAccount(initAccount);
                        setError(initError)
                        return Toast.show({
                            type: 'success',
                            position: 'top',
                            text1: 'Thêm tài khoản thành công',
                            visibilityTime: 2000,
                            autoHide: true,
                        })

                    })
            } catch (err) {
                console.error('Error Submit lecture: ', err);
            }
        }, 2000)
    }



    return (

        <View style={{ flex: 1 }}>

            <HeaderText navigation={navigation}>Thêm Giảng Viên</HeaderText>
            {completed && <ScrollView style={{ marginTop: 30 }} >

                <View style={[{ alignItems: 'center', marginBottom: 10 }]}>

                    {/* Email */}
                    <View style={{ width: '90%' }}>
                        <TextInput
                            leftIcon='envelope'
                            placeholder='Email'
                            value={account.email}
                            onChangeText={text => setAccount({ ...account, email: text.trim() })}
                            errorMessage={error.email}
                        />

                    </View>

                    {/* Phone */}
                    <View style={{ width: '90%', marginTop: 25 }} >
                        <TextInput
                            leftIcon='mobile'
                            placeholder='Số điện thoại'
                            value={account.phone}
                            onChangeText={text => setAccount({ ...account, phone: text.trim() })}
                            errorMessage={error.phone}
                        />
                    </View>

                    {/* Full name */}
                    <View style={{ width: '90%', marginTop: 25 }} >
                        <TextInput
                            leftIcon='user'
                            placeholder='Họ tên'
                            value={account.full_name}
                            onChangeText={text => setAccount({ ...account, full_name: text })}
                            errorMessage={error.full_name}
                        />
                    </View>

                    {/* Date of Birth */}
                    <View style={{ width: '90%', marginTop: 20 }}>
                        <DatePicker
                            placeholder='Ngày sinh'
                            leftIcon='birthday-cake'
                            mode='date'
                            errorMessage={error.date_of_birth}
                            onPick={val => setAccount({ ...account, date_of_birth: val.toISOString() })}
                        />
                    </View>

                    {/* Faculty */}

                    <View style={{ width: '90%', marginTop: 20, marginBottom: 20 }}>
                        <Picker
                            leftIcon='chalkboard-teacher'
                            placeholder='Khoa'
                            displayValue={account.faculty != 'Khoa' ? account.faculty : ''
                            }
                            selectedValue={account.faculty}
                            onValueChange={(val, index) => setAccount({ ...account, faculty: val })}
                            errorMessage={error.faculty}
                        >
                            {facultyList.map(val => <PickerBase.Item
                                label={val}
                                value={val}
                                key={val} />)}
                        </Picker>
                    </View>
                    <SubmitButton
                        isProcessing={isLoading}
                        textProcessing='Đang xử lý...'
                        onPress={onSubmitPress}>Thêm tài khoản</SubmitButton>
                </View>
            </ScrollView>}
            <Toast ref={(ref) => Toast.setRef(ref)} />

        </View >
    );
};

export default AddStudent;

