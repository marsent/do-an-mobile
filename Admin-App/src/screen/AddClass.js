import React, { useContext, useState } from 'react';
import { ScrollView, View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';


import styles from '../style/style'
import { yearList, facultyList, apiURL } from '../config/config'
import TokenContext from '../Context/TokenContext'

const AddClass = () => {
    const token = useContext(TokenContext)
    const obj = { name: '', year: '2022', faculty: 'information_systems' }
    const [classObj, setClassObj] = useState(obj)
    const [error, setError] = useState({ name: '' });

    const onSubmitPress = async () => {
        await fetch(`${apiURL}/class/admin`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(classObj)
        }).then(res => res.json())
            .then(res => {
                if (res.error == 4000) return setError(res.messages)
                if (res.error == 7000) {
                    setError(obj)
                    return Toast.show({
                        type: 'error',
                        position: 'top',
                        text1: 'Thêm lớp không thành công',
                        text2: 'Lớp đã tồn tại trong cơ sở dữ liệu',
                        visibilityTime: 2000,
                        autoHide: true,
                    })
                }
                setClassObj(obj);
                return Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Thêm lớp thành công',
                    visibilityTime: 2000,
                    autoHide: true,
                })

            })
    }

    return (
        <View style={{ flex: 1 }}>
            <HeaderText>Thêm Lớp</HeaderText>
            <ScrollView style={{ marginTop: 30 }}>
                <View style={[styles.container]}>
                    <View style={[styles.inputView, { marginBottom: 20 }]}>
                        {/* Class Name */}
                        <View>
                            <TextInput
                                style={[styles.input, !error.name ? null : styles.borderErr]}
                                placeholder='Tên lớp'
                                value={classObj.name}
                                onChangeText={text => setClassObj({ ...classObj, name: text })} />
                            {!error.name ? null : <Text style={styles.textErr}>{error.name}</Text>}
                        </View>
                        {/* Year */}
                        <View style={[styles.viewPicker, { width: '70%', marginLeft: 10 }]}>
                            <Text style={{ fontFamily: 'Inter', fontSize: 16 }}>Năm học:</Text>
                            <Picker
                                selectedValue={classObj.year}
                                onValueChange={(val, index) => {
                                    setClassObj({ ...classObj, year: val })
                                }}
                                style={{ width: '50%' }}
                            >
                                {yearList.map(y => <Picker.Item
                                    label={y.toString()}
                                    value={y.toString()}
                                    key={y.toString()} />)}
                            </Picker>
                        </View>

                        {/* Faculty */}
                        <View style={[styles.viewPicker, { width: '70%', marginLeft: 10 }]}>
                            <Text style={{ fontFamily: 'Inter', marginRight: '20%', fontSize: 16 }}>Khoa:</Text>
                            <Picker
                                selectedValue={classObj.faculty}
                                onValueChange={(val, index) => {
                                    setClassObj({ ...classObj, faculty: val })
                                }}
                                style={{ width: '80%' }}
                            >
                                {facultyList.map(val => <Picker.Item
                                    label={val.toString()}
                                    value={val.toString()}
                                    key={val.toString()} />)}
                            </Picker>
                        </View>

                    </View>

                    <View>
                        <TouchableOpacity
                            style={{ backgroundColor: '#0598FC', height: 40, alignItems: 'center', width: 170, borderRadius: 30, elevation: 5, paddingVertical: 5 }}
                            onPress={onSubmitPress}
                        >
                            <Text style={{ fontFamily: 'Inter', fontSize: 18, color: '#FFFFFF' }}>Thêm lớp</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
            <Toast ref={(ref) => Toast.setRef(ref)} />

        </View>
    );
};

export default AddClass;