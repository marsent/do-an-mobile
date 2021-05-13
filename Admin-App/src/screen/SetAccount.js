import React, { useContext, useState } from 'react'
import { View, Text, TextInput, Button, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native';
import { passwordValidator, retypePassValidator } from '../helpers/passwordValidator';
import { usernameValidator } from '../helpers/usernameValidator'
import { Picker } from '@react-native-picker/picker';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from '../style/style'
import { RadioButton } from 'react-native-paper';
import HeaderText from '../components/HeaderText'

import { emailValidator, numberValidator } from '../helpers/validator'


export default SetAccount = (props) => {
    const [account, setAccount] = useState({ email: '', phone: '', fullName: '', dateOfBirth: '' });
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState(true)
    let [error, setError] = useState({ email: false, phone: false, dateOfBirth: false, fullName: false });
    const { token } = props.route.params
    const showToast = () => {
        ToastAndroid.showWithGravity('Thêm tài khoản thành công', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50)
    }
    let classList = [{
        "quantity": 0,
        "status": "active",
        "_id": "609d45aecdacc46c207d7e52",
        "name": "TMDT2022",
        "year": 2022,
        "faculty": "e_commerce",
        "createdAt": "2021-05-13T15:28:46.582Z",
        "updatedAt": "2021-05-13T15:28:46.582Z",
        "__v": 0
    }]
    const onSubmitPress = async (e) => {
        e.preventDefault();
        setError({
            email: emailValidator(account.email),
            phone: numberValidator(account.phone),
            dateOfBirth: !account.dateOfBirth ? 'Vui lòng chọn ngày sinh' : false,
            fullName: !account.fullName ? 'Vui lòng nhập tên' : false
        })


        if (!error.email && !error.phone && !error.dateOfBirth && !error.fullName) {
            if (mode === true) {
                let data = JSON.stringify({
                    email: account.email,
                    phone: account.phone,
                    full_name: account.fullName,
                    date_of_birth: account.dateOfBirth,
                    year: account.year,
                    class_id: account.classId
                })
                await fetch('http://quocha.xyz/api/student/admin/', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: data
                }).then(res => res.json())
                    .then(res => {
                        if (res.data) showToast()
                        console.log(res);
                    })
            } else {
                let data = JSON.stringify({
                    email: account.email,
                    phone: account.phone,
                    full_name: account.fullName,
                    date_of_birth: account.dateOfBirth,
                    faculty: account.faculty
                })
                await fetch('http://quocha.xyz/api/lecture/admin/', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    body: data
                }).then(res => res.json())
                    .then(res => {
                        if (res.data) showToast()
                        console.log(res);
                    })
            }
        }

    }
    const year = new Date().getFullYear()
    const yearList = [];
    for (let i = year - 1; i <= year + 1; i++) yearList.push(i);
    const facultyList = ['computer_science', 'information_technology', 'data_science', 'computer_engineering', 'information_systems', 'e_commerce', 'software_engineering', 'information_security'];

    return (

        <View style={{ flex: 1 }}>
            <HeaderText>Thêm tài khoản</HeaderText>
            <ScrollView>
                <View style={styles.container}>
                    <View style={[styles.inputView]}>
                        {/* Email */}
                        <TextInput
                            style={[styles.input, !error.email ? null : styles.borderErr]}
                            placeholder='Email'


                            value={account.email}


                            onChangeText={text => setAccount({ ...account, email: text })} />
                        {!error.email ? null : <Text style={styles.textErr}>{error.email}</Text>}
                        {/* Phone */}
                        <TextInput
                            style={[styles.input, !error.phone ? null : styles.borderErr]}


                            placeholder='Số điện thoại'


                            value={account.phone}


                            onChangeText={text => setAccount({ ...account, phone: text })} />
                        {!error.phone ? null : <Text style={styles.textErr}>{error.phone}</Text>}
                        {/* fullName */}
                        <TextInput
                            style={[styles.input, !error.fullName ? null : styles.borderErr]}


                            placeholder='Họ tên'


                            value={account.fullName}


                            onChangeText={text => setAccount({ ...account, fullName: text })}
                        />
                        {!error.fullName ? null : <Text style={styles.textErr}>{error.fullName}</Text>}
                        {/* dateOfbirth */}
                        <View style={[styles.textIRI, !error.dateOfBirth ? null : styles.borderErr]}>
                            <TextInput
                                style={[styles.input, styles.inputDateTime, { marginTop: 0, borderLeftWidth: 0 }]}
                                placeholder='Ngáy sinh'
                                editable={false}
                                value={account.dateOfBirth}
                            />
                            <TouchableOpacity style={[styles.btnDateTime, { borderRightWidth: 0 }]}>
                                <Icon name='table' size={32} onPress={() => setShow(true)} />
                            </TouchableOpacity>

                            {show && (<DateTimePicker
                                testID="dateTimePicker"
                                value={new Date()}
                                display="default"
                                is24Hour={true}
                                mode='date'
                                onChange={(event, date) => {
                                    setShow(false);
                                    setAccount({ ...account, dateOfBirth: date.toISOString() })
                                }}
                            />)}
                        </View>
                        {!error.dateOfBirth ? null : <Text style={styles.textErr}>{error.dateOfBirth}</Text>}

                        <View style={[styles.viewRadioGroup]}>
                            <Text>Loaị tài khoản</Text>

                            <View style={[styles.viewRadio]}>

                                <View >
                                    <Text>Sinh viên</Text>
                                    <RadioButton value={true}
                                        status={mode === true ? 'checked' : 'unchecked'}
                                        onPress={() => setMode(true)}
                                    />
                                </View>
                                <View >
                                    <Text>Giảng viên</Text>
                                    <RadioButton value={false}
                                        status={mode === false ? 'checked' : 'unchecked'}
                                        onPress={() => setMode(false)}
                                    />
                                </View>
                            </View>
                        </View>

                        {mode ? <View>
                            <View style={[styles.viewPicker, { width: '70%' }]}>
                                <Text>Năm học:</Text>
                                <Picker
                                    selectedValue={account.year}
                                    onValueChange={(val, index) => setAccount({ ...account, year: val })}
                                    style={{ width: '50%' }}
                                >
                                    {yearList.map(y => <Picker.Item

                                        label={y.toString()}

                                        value={y.toString()}

                                        key={y.toString()} />)}

                                </Picker>
                            </View>
                            <View style={[styles.viewPicker, { width: '70%' }]}>
                                <Text>Lớp:</Text>
                                <Picker
                                    selectedValue={account.class}
                                    onValueChange={(val, index) => setAccount({ ...account, classId: val })}
                                    style={{ width: '60%' }}
                                >
                                    {classList.map(val => <Picker.Item

                                        label={val.name}

                                        value={val._id}

                                        key={val._id} />)}

                                </Picker>
                            </View>
                        </View>
                            :
                            <View style={[styles.viewPicker]}>
                                <Text>Khoa</Text>
                                <Picker
                                    selectedValue={account.faculty}
                                    onValueChange={(val, index) => setAccount({ ...account, faculty: val })}
                                    style={{ width: '60%' }}
                                >
                                    {facultyList.map(faculty => <Picker.Item
                                        label={faculty}
                                        value={faculty}
                                        key={faculty} />)}

                                </Picker>
                            </View>
                        }

                    </View>

                    <Button
                        style={styles.button}
                        title="Thêm tài khoản"
                        onPress={onSubmitPress}
                    />
                </View >
            </ScrollView>
        </View >
    )
}