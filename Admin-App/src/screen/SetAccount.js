import React, { useState } from 'react'
import { KeyboardAvoidingView, View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { passwordValidator, retypePassValidator } from '../helpers/passwordValidator';
import { usernameValidator } from '../helpers/usernameValidator'
import { Picker } from '@react-native-picker/picker';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from '../style/style'
import { RadioButton } from 'react-native-paper';

import { emailValidator, numberValidator } from '../helpers/validator'

const Tab = createBottomTabNavigator();

export default SetAccount = () => {
    const [account, setAccount] = useState({ email: '', phone: '', fullName: '', dateOfBirth: '', year: '', faculty: '' });
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState(true)
    let [error, setError] = useState({ email: false, phone: false, dateOfBirth: false, fullName: false });
    const onSubmitPress = (e) => {
        e.preventDefault();
        setError({
            email: emailValidator(account.email),
            phone: numberValidator(account.phone),
            dateOfBirth: !account.dateOfBirth ? 'Vui lòng chọn ngày sinh' : false,
            fullName: !account.fullName ? 'Vui lòng nhập tên' : false
        })
        console.log(!error.dateOfBirth);
    }
    const year = new Date().getFullYear()
    const yearList = [];
    for (let i = year - 10; i <= year; i++) yearList.push(i);
    const facultyList = ['HTTT', 'CNPM', 'KHMT', 'KTMT'];
    return (

        <View style={{ flex: 1 }}>
            <View style={[styles.headerView, { marginBottom: 70 }]}>
                <Text style={styles.headerText}>Thêm tài khoản</Text>
            </View>
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
                                    let res = date.getDate().toString() + '/' + (date.getMonth() + 1).toString() + '/' + date.getFullYear()
                                    setAccount({ ...account, dateOfBirth: res })
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
                            <Text>Năm học:</Text>
                            <Picker
                                selectedValue={account.year}
                                onValueChange={(val, index) => setAccount({ ...account, year: val })}
                            >
                                {yearList.map(y => <Picker.Item

                                    label={y.toString()}

                                    value={y.toString()}

                                    key={y.toString()} />)}

                            </Picker>
                        </View>
                            :
                            <View>
                                <Text>Khoa</Text>
                                <Picker
                                    selectedValue={account.faculty}
                                    onValueChange={(val, index) => setAccount({ ...account, faculty: val })}
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