import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Picker } from '@react-native-picker/picker';

import styles from '../../style/style'

const LectureDetail = ({ route, navigation }) => {
    const lecture = route.params.item;
    const [isEdit, setIsEdit] = useState(false)
    const [status, setStatus] = useState(lecture.status)
    const save = () => {



    }

    return (
        <SafeAreaView>
            <CustomHeaderText navigation={navigation} >Chi tiết giảng viên</CustomHeaderText>

            <View style={{ marginTop: 30, alignItems: 'center' }}>

                <View style={{ width: '90%', marginLeft: '10%' }}>
                    <CustomVIew>
                        <CustomText>Họ tên:</CustomText>
                        <CustomInput value={lecture.full_name} />
                    </CustomVIew>
                    <CustomVIew>
                        <CustomText>Ngày sinh:</CustomText>
                        <CustomInput value={lecture.date_of_birth.split('T')[0]} />
                    </CustomVIew>
                    <CustomVIew>
                        <CustomText>Số điện thoại:</CustomText>
                        <CustomInput value={lecture.phone} />
                    </CustomVIew>
                    <CustomVIew>
                        <CustomText>Email:</CustomText>
                        <CustomInput value={lecture.email} />
                    </CustomVIew>
                    <CustomVIew>
                        <CustomText>Trạng thái:</CustomText>
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
                        <CustomButton onPress={() => setIsEdit(true)} >Chỉnh sửa</CustomButton>
                        :
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <CustomButton style={{ marginRight: 5 }} onPress={() => save()}>Cập nhật</CustomButton>
                            <CustomButton style={{ marginLeft: 5 }} onPress={() => setIsEdit(false)}>Hủy</CustomButton>
                        </View>
                    }
                </View>
            </View>
        </SafeAreaView >
    );
};

const CustomText = ({ children, size = 18, color = '#22272E' }) => {
    return (
        <Text style={{ fontSize: size, fontFamily: 'Inter', color: color }}>
            {children}
        </Text>
    )
}
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

const CustomButton = ({ children, onPress, style }) => {
    return (
        <TouchableOpacity style={[{ backgroundColor: '#0598FC', height: 40, alignItems: 'center', borderRadius: 30, elevation: 5, paddingVertical: 5, width: 130 }, style]}
            onPress={onPress}
        >
            <CustomText color='#FFFFFF'>{children}</CustomText>
        </TouchableOpacity >
    )
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