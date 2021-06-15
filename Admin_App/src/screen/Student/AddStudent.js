import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Picker as PickerBase } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';

import HeaderText from '../../components/HeaderText'

import { apiURL, yearList } from '../../config/config'
import TokenContext from '../../Context/TokenContext'
import TextInput from '../../components/TextInput'
import DatePicker from '../../components/DatePicker'
import Picker from '../../components/Picker'
import SubmitButton from '../../components/SubmitButton'

const AddStudent = ({ navigation }) => {
    const initAccount = { email: '', phone: '', full_name: '', date_of_birth: '', year: 'Năm học', class_id: '_000' }
    const initError = { email: false, phone: false, full_name: false, date_of_birth: false, year: false, class_id: false }
    const token = useContext(TokenContext)
    const [account, setAccount] = useState(initAccount);
    const [error, setError] = useState(initError);
    const [classList, setClassList] = useState([]);
    const [isLoading, setIsLoading] = useState(false)


    useEffect(async () => {
        setClassList([{ _id: '_000', name: 'Lớp sinh hoạt' }])
        await fetch(`${apiURL}/class/admin${account.year != 'Năm học' ? '/?year=' + account.year : ''}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => res.json()).then(async (res) => {
            await setClassList(prev => prev.concat(res.data))


        })
    }, [account.year])


    const onSubmitPress = async () => {
        await setIsLoading(true)
        await setTimeout(async () => {
            await fetch(`${apiURL}/student/admin`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(account)
            }).then(res => res.json()).then(res => {
                console.log(res);
                setIsLoading(false)
                if (res.error == 4000) {
                    return setError(res.messages)
                }
                if (res.error == 7000) {
                    setError(initError)
                    return Toast.show({
                        type: 'error',
                        position: 'top',
                        text1: 'Thêm tài khoản không thành công',
                        text2: 'email hoặc số điện thoại đã tồn tại trong hệ thống',
                        visibilityTime: 2000,
                        autoHide: true,
                    })
                }
                setAccount(initAccount)
                setError(initError)

                return Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Thêm tài khoản thành công',
                    visibilityTime: 2000,
                    autoHide: true,


                })

            })
        }, 1000)

    }

    return (

        <View style={{ flex: 1 }}>

            <HeaderText navigation={navigation}>Thêm Sinh Viên</HeaderText>
            <ScrollView style={{ flex: 1, marginTop: 10 }} >

                <View style={[{ alignItems: 'center', flex: 1, marginBottom: 10 }]}>

                    {/* Email */}
                    <View style={{ width: '90%', marginTop: 1 }}>
                        <TextInput
                            leftIcon='envelope'
                            placeholder='Email'
                            value={account.email}
                            onChangeText={text => setAccount({ ...account, email: text.trim() })}
                            errorMessage={error.email}
                        />
                    </View>

                    {/* Phone */}
                    <View style={{ width: '90%', marginTop: 25 }}>
                        <TextInput
                            leftIcon='mobile'
                            placeholder='Số điện thoại'
                            value={account.phone}
                            onChangeText={text => setAccount({ ...account, phone: text.trim() })}
                            errorMessage={error.phone}
                        />
                    </View>

                    {/* Full nme */}
                    <View style={{ width: '90%', marginTop: 25 }}>
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
                    {/* Year */}
                    <View style={{ width: '90%', marginTop: 20 }}>
                        <Picker
                            leftIcon='calendar-alt'
                            placeholder='Năm học'
                            displayValue={account.year != 'Năm học' ? account.year : null}
                            selectedValue={account.year}
                            onValueChange={val => {
                                setAccount({ ...account, year: val })
                            }}
                            errorMessage={error.year}
                        >
                            {yearList.map(y =>
                                <PickerBase.Item
                                    label={y.toString()}
                                    value={y.toString()}
                                    key={y.toString()} />
                            )}
                        </Picker>
                    </View>
                    {/* Class  */}
                    <View style={{ width: '90%', marginTop: 20, marginBottom: 20 }}>
                        <Picker
                            leftIcon='chalkboard'
                            placeholder='Lớp sinh hoạt'
                            displayValue={account.class_id != '_000' ?
                                classList.find(element => element._id == account.class_id).name : ''
                            }
                            selectedValue={account.class_id}
                            onValueChange={(val, index) => setAccount({ ...account, class_id: val })}
                            errorMessage={error.class_id}
                        >
                            {classList.map(val => <PickerBase.Item
                                label={val.name}
                                value={val._id}
                                key={val._id} />)}
                        </Picker>
                    </View>
                    <SubmitButton
                        isProcessing={isLoading}
                        textProcessing='Đang xử lý...'
                        onPress={onSubmitPress}>Thêm tài khoản</SubmitButton>
                </View>
            </ScrollView>
            <Toast ref={(ref) => Toast.setRef(ref)} />

        </View>
    );
};

export default AddStudent;

