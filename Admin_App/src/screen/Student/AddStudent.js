import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, Button, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';
import LoadingModal from '../../components/LoadingModal'

import HeaderText from '../../components/HeaderText'

import styles from '../../style/style'
import { apiURL, yearList } from '../../config/config'
import TokenContext from '../../Context/TokenContext'

const AddStudent = ({ navigation }) => {
    const obj = { email: '', phone: '', full_name: '', date_of_birth: '', year: '2022', class_id: '' }
    const token = useContext(TokenContext)
    const [account, setAccount] = useState(obj);
    const [error, setError] = useState(obj);
    const [show, setShow] = useState(false)
    const [classList, setClassList] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    //    get ClassList
    useEffect(async () => {
        await fetch(`${apiURL}/class/admin/?year=${account.year}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => res.json()).then(res => {
            setClassList(res.data)
            setAccount({ ...account, class_id: res.data[0]._id.toString() })
        })
    }, [account.year])

    const onSubmitPress = async () => {
        setIsLoading(true)
        await fetch(`${apiURL}/student/admin`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(account)
        }).then(res => res.json()).then(res => {
            setIsLoading(false)
            if (res.error == 4000) return setError(res.messages)
            if (res.error == 7000) {
                setError(obj)
                return Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Thêm tài khoản không thành công',
                    text2: 'email hoặc số điện thoại đã tồn tại trong hệ thống',
                    visibilityTime: 2000,
                    autoHide: true,
                })
            }
            setAccount(obj)
            setError(obj)

            return Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Thêm tài khoản thành công',
                visibilityTime: 2000,
                autoHide: true,


            })

        })
    }



    return (

        <View style={{ flex: 1 }}>

            <HeaderText navigation={navigation}>Thêm Sinh Viên</HeaderText>
            <LoadingModal isVisible={isLoading} />
            <ScrollView style={{ marginTop: 30 }} >

                <View style={[styles.container]}>

                    <View style={[styles.inputView, { marginBottom: 20 }]}>
                        {/* Email */}
                        <View >
                            <TextInput
                                style={[styles.input, !error.email ? null : styles.borderErr]}
                                placeholder='Email'
                                value={account.email}
                                onChangeText={text => setAccount({ ...account, email: text.trim() })} />
                            {!error.email ? null : <Text style={styles.textErr}>{error.email}</Text>}

                        </View>

                        {/* Phone */}
                        <View style={{ marginTop: 15 }}>
                            <TextInput
                                style={[styles.input, !error.phone ? null : styles.borderErr]}
                                placeholder='Số điện thoại'
                                value={account.phone}
                                onChangeText={text => setAccount({ ...account, phone: text.trim() })} />
                            {!error.phone ? null : <Text style={styles.textErr}>{error.phone}</Text>}
                        </View>

                        {/* Full nme */}
                        <View style={{ marginTop: 15 }}>
                            <TextInput
                                style={[styles.input, !error.full_name ? null : styles.borderErr]}
                                placeholder='Họ tên'
                                value={account.full_name}
                                onChangeText={text => setAccount({ ...account, full_name: text })}
                            />
                            {!error.full_name ? null : <Text style={styles.textErr}>{error.full_name}</Text>}

                        </View>

                        {/* Date of Birth */}
                        <View>
                            <View style={[styles.textIRI, !error.date_of_birth ? null : styles.borderErr]}>
                                <TextInput
                                    style={[styles.input, styles.inputDateTime, { marginTop: 0, borderLeftWidth: 0 }]}
                                    placeholder='Ngày sinh'
                                    editable={false}
                                    value={account.date_of_birth}
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
                                        setAccount({ ...account, date_of_birth: date.toISOString() })
                                    }}
                                />)}

                            </View>
                            {!error.date_of_birth ? null : <Text style={[styles.textErr]}>{error.date_of_birth}</Text>}
                        </View>

                        {/* Year */}
                        <View style={[styles.viewPicker, { width: '70%', marginLeft: 10 }]}>
                            <Text style={{ fontFamily: 'Inter', fontSize: 18 }}>Năm học:</Text>
                            <Picker
                                selectedValue={account.year}
                                onValueChange={(val, index) => {
                                    setAccount({ ...account, year: val })
                                }}
                                style={{ width: '50%' }}
                            >
                                {yearList.map(y => <Picker.Item
                                    label={y.toString()}
                                    value={y.toString()}
                                    key={y.toString()} />)}
                            </Picker>
                        </View>

                        {/* Class */}
                        <View style={[styles.viewPicker, { width: '70%', marginLeft: 10 }]}>
                            <Text style={{ fontFamily: 'Inter', fontSize: 18 }}>Lớp:</Text>
                            <Picker
                                selectedValue={account.class}
                                onValueChange={(val, index) => setAccount({ ...account, class_id: val })}
                                style={{ width: '60%' }}
                            >
                                {classList.map(val => <Picker.Item
                                    label={val.name}
                                    value={val._id}
                                    key={val._id} />)}
                            </Picker>
                        </View>


                    </View>

                    <View>
                        <TouchableOpacity
                            style={{ backgroundColor: '#0598FC', height: 40, alignItems: 'center', width: 170, borderRadius: 30, elevation: 5, paddingVertical: 5 }}
                            onPress={onSubmitPress}
                        >
                            <Text style={{ fontFamily: 'Inter', fontSize: 18, color: '#FFFFFF' }}>Thêm tài khoản</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <Toast ref={(ref) => Toast.setRef(ref)} />

        </View>
    );
};

export default AddStudent;

