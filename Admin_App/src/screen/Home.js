import React, { useContext } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';

import styles from '../style/style'

const img = {
    student: require('../../assets/public/img/graduated.png'),
    notification: require('../../assets/public/img/sms.png'),
    lecture: require('../../assets/public/img/teacher.png'),
    exam: require('../../assets/public/img/planner.png'),
    class: require('../../assets/public/img/classroom.png'),
    logout: require('../../assets/public/img/logout.png'),
    subject: require('../../assets/public/img/school.png')
}

export default Home = ({ route, navigation }) => {
    const { setToken } = route.params

    return (
        <Animatable.View style={{ flex: 1 }} animation='fadeInDown'>
            <SafeAreaView style={{ flex: 1 }}>
                <HeaderText>Trang chủ</HeaderText>
                <View style={[styles.container, { marginTop: '15%', }]}>
                    <ViewRowGroup>
                        <CustomTouchOpacity src={img.subject} onPress={() => navigation.navigate('Quản lý môn học', { navigation })} >Môn học</CustomTouchOpacity>
                        {/* <CustomTouchOpacity src={img.notification} onPress={() => navigation.navigate('Quản lý thông báo', { navigation })}>Thông báo</CustomTouchOpacity> */}
                        <CustomTouchOpacity src={img.exam} onPress={() => navigation.navigate('Quản lý đề thi', { navigation })}>Đề thi</CustomTouchOpacity>
                    </ViewRowGroup>

                    <ViewRowGroup>
                        <CustomTouchOpacity src={img.student} onPress={() => navigation.navigate('Quản lý sinh viên', { navigation })} >Sinh viên</CustomTouchOpacity>
                        <CustomTouchOpacity src={img.lecture} onPress={() => navigation.navigate('Quản lý giảng viên', { navigation })}>Giảng viên</CustomTouchOpacity>
                    </ViewRowGroup>

                    <ViewRowGroup>
                        <CustomTouchOpacity src={img.class} onPress={() => navigation.navigate('Quản lý lớp học', { navigation })} >Lớp</CustomTouchOpacity>
                        <CustomTouchOpacity src={img.logout} onPress={() => setToken('')} >Đăng xuất</CustomTouchOpacity>
                    </ViewRowGroup>

                </View>
            </SafeAreaView>
        </Animatable.View>
    )
}

const CustomTouchOpacity = ({ children, onPress, src }) => {

    return (

        <TouchableOpacity onPress={onPress} style={[{ alignItems: 'center', width: '45%', borderRadius: 10, padding: 5, justifyContent: 'space-around', elevation: 3, }]}>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontFamily: 'Inter', textAlign: 'center' }}>{children}</Text>
                <Image source={src} style={{ width: 40, height: 40 }} />
            </View>
        </TouchableOpacity>
    )
}
const ViewRowGroup = ({ children }) => {

    return (
        <View style={{ display: 'flex', flexDirection: 'row', width: '80%', height: '20%', justifyContent: 'space-between', marginBottom: 20 }} >
            {children}
        </View>
    )
}

const HeaderText = ({ children, navigation }) => {
    return (
        <View style={[styles.headerView, { display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', height: 50 }]}>
            <View style={{ position: 'absolute', width: '100%', alignItems: 'center', marginVertical: 10 }}>
                <Text style={styles.headerText}>{children}</Text>
            </View>


        </View>
    )
}