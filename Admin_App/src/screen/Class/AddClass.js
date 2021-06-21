import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { Picker as PickerBase } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';


import styles from '../../style/style'
import TokenContext from '../../Context/TokenContext'
import { yearList, facultyList, apiURL } from '../../config/config'
import { LoadingModal, Button, TextInput, Picker, Text, SubmitButton } from '../../components'
import { mainWhite } from '../../style/color';

const AddClass = ({ navigation }) => {
    const token = useContext(TokenContext)
    const initClass = { name: '', year: new Date().getFullYear().toString(), faculty: facultyList[0] }
    const initError = { name: false, year: false, faculty: false }
    const [Class, setClass] = useState(initClass)
    const [error, setError] = useState(initError);
    const [isLoading, setIsLoading] = useState(false)
    useEffect(async () => {

        return () => {
            setClass();
            setError();
        }
    }, [])

    const onSubmitPress = async () => {
        setIsLoading(true)
        await setTimeout(async () => {
            await fetch(`${apiURL}/class/admin`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(Class)
            }).then(res => res.json())
                .then(async (res) => {
                    await setIsLoading(false)

                    if (res.error == 4000) return setError(res.messages)
                    if (res.error == 7000) {
                        setError(initError)
                        return Toast.show({
                            type: 'error',
                            position: 'top',
                            text1: 'Thêm lớp không thành công',
                            text2: 'Lớp đã tồn tại trong cơ sở dữ liệu',
                            visibilityTime: 2000,
                            autoHide: true,
                        })
                    }
                    await setError(initError)
                    await setClass(initClass);
                    return Toast.show({
                        type: 'success',
                        position: 'top',
                        text1: 'Thêm lớp thành công',
                        visibilityTime: 2000,
                        autoHide: true,
                    })


                })
        }, 2000)
    }

    return (
        <View style={{ flex: 1, backgroundColor: mainWhite }}>
            <HeaderText navigation={navigation} >Thêm Lớp</HeaderText>

            <ScrollView style={{ marginTop: 30 }}>
                <View style={[{ alignItems: 'center', marginBottom: 10 }]}>
                    {/* Class Name */}
                    <View style={{ width: '90%' }}>
                        <TextInput
                            label='Tên lớp'
                            isFocus={true}
                            outLine={true}
                            style={{ borderRadius: 5 }}
                            placeholder='Tên lớp'
                            value={Class.name}
                            onChangeText={text => setClass({ ...Class, name: text })}
                            errorMessage={error.name}
                        />
                    </View>
                    {/* Year */}
                    <View style={{ width: '90%', marginTop: 20 }}>
                        <Picker
                            label='Năm học'
                            style={{ borderRadius: 5 }}
                            placeholder='Năm học'
                            displayValue={Class.year != 'Năm học' ? Class.year : null}
                            selectedValue={Class.year}
                            onValueChange={val => {
                                setClass({ ...Class, year: val })
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

                    {/* Faculty */}
                    <View style={{ width: '90%', marginTop: 20, marginBottom: 20 }}>
                        <Picker
                            style={{ borderRadius: 5 }}
                            label='Khoa quản lý'
                            placeholder='Khoa'
                            displayValue={Class.faculty != 'Khoa' ? Class.faculty : ''
                            }
                            selectedValue={Class.faculty}
                            onValueChange={(val, index) => setClass({ ...Class, faculty: val })}
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
                        onPress={onSubmitPress} >Thêm lớp</SubmitButton>


                </View>
            </ScrollView>
            <Toast ref={(ref) => Toast.setRef(ref)} />

        </View>
    );
};

export default AddClass;