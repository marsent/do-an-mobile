import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { RadioButton } from 'react-native-paper'

import styles from '../../style/style';
import { apiURL } from '../../config/config';
import TokenContext from '../../Context/TokenContext';

const ExamDetail = ({ route, navigation }) => {
    const token = useContext(TokenContext);
    const exam = route.params.item;
    const [className, setClassName] = useState('');
    if (exam.for == 'class') {

        useEffect(async () => {
            await fetch(`${apiURL}/class/admin/${exam.class_id}`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    setClassName(res.data.name)
                })
        }, [])
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomHeaderText navigation={navigation} >Chi tiết giảng viên</CustomHeaderText>
            <ScrollView>
                <View style={{ marginTop: 30, alignItems: 'center' }}>

                    <View style={{ width: '90%', marginLeft: '10%' }}>
                        <CustomVIew>
                            <CustomText>Tên bài thi:</CustomText>
                            <CustomInput value={exam.name} />
                        </CustomVIew>
                        <CustomVIew>
                            <CustomText>Thời gian làm bài:</CustomText>
                            <CustomInput value={exam.time.toString() + ' phút'} />
                            <CustomText> phút</CustomText>
                        </CustomVIew>
                        <CustomVIew>
                            <CustomText>Số lương câu hỏi:</CustomText>
                            <CustomInput value={exam.questions.length.toString()} />
                        </CustomVIew>
                        <CustomVIew>
                            <CustomText>Loại bài thi:</CustomText>
                            <CustomInput value={exam.for} />
                        </CustomVIew>
                        {exam.for == 'class' ? <CustomVIew>
                            <CustomText>Lớp:{className}</CustomText>
                        </CustomVIew> : null}


                    </View>

                    <View style={{ width: '90%' }}>
                        <View style={{ alignItems: 'center' }}>
                            {exam.questions.map((val, index) => {
                                return (
                                    <View key={index} style={{ borderWidth: 1, width: '90%', marginBottom: 10, padding: 3, borderColor: '#91919a' }}>
                                        <Text style={{ fontFamily: 'Inter', fontSize: 16 }}>Câu {index + 1}: {val.question}</Text>
                                        <RadioButton.Group
                                            value={val.answer}
                                        >
                                            <View>
                                                {val.selection.map((question, index) => {
                                                    return (
                                                        <View key={index} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                            <RadioButton value={question} />
                                                            <Text style={{ fontFamily: 'Inter', fontSize: 16 }}>{question}</Text>
                                                        </View>
                                                    )
                                                })}
                                            </View>
                                        </RadioButton.Group>
                                    </View>
                                )
                            })}
                        </View>
                    </View>

                </View>
            </ScrollView>
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

const CustomInput = ({ value, onChangeText, edit, }) => {
    return <TextInput
        style={{ color: '#495057', width: '50%', marginRight: '10%', fontFamily: 'Inter', fontSize: 18, }}
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


export default ExamDetail;