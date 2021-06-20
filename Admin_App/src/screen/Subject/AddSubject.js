import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native';
import { Picker as PickerBase } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';


import styles from '../../style/style'
import TokenContext from '../../Context/TokenContext'
import { yearList, facultyList, apiURL } from '../../config/config'
import { LoadingModal, Button, TextInput, Picker, Text, SubmitButton, HeaderText } from '../../components'
import { mainWhite } from '../../style/color';
import { SubjectUtils } from '../../utils'
const AddSubject = ({ navigation }) => {
    const token = useContext(TokenContext)


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: mainWhite }}>
            <HeaderText navigation={navigation} >Thêm mới môn học</HeaderText>
            <ScrollView style={{ marginTop: 30 }}>
                <View style={[{ alignItems: 'center', marginBottom: 10 }]}>
                    <View style={{ width: '90%', marginBottom: 15 }}>
                        <TextInput
                            label='Tên môn học'
                            placeholder='Tên môn học'
                        />
                    </View>
                    <View style={{ width: '90%', marginBottom: 15 }}>
                        <TextInput
                            label='Khoa quản lý'
                            placeholder='Khoa quản lý'
                        />
                    </View>
                    <View style={{ width: '90%', marginBottom: 15 }}>
                        <TextInput
                            label='Mã môn học'
                            placeholder='Mã môn học'
                        />
                    </View>
                    <View style={{ width: '90%', marginBottom: 15 }}>
                        <Picker
                            label='Giảng viên phụ trách'
                            placeholder='Giảng viên phụ trách'
                        >

                        </Picker>
                    </View>


                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AddSubject;