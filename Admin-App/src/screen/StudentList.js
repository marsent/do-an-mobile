import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, ScrollView, FlatList, Button, TouchableOpacity } from 'react-native';
import HeaderText from '../components/HeaderText';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack';
import { BoxShadow } from 'react-native-shadow'
import Modal from 'react-native-modal';

const Stack = createStackNavigator();

import { yearList, facultyList, apiURL } from '../config/config';
import styles from '../style/style';
import TokenContext from '../Context/TokenContext';
import Text from '../components/Text'
import StudentDetail from './StudentDetail';



const StudentList = ({ navigation }) => {

    const token = useContext(TokenContext);

    const [studentList, setStudentList] = useState([]);
    const [dataStudent, setDataStudent] = useState([]);
    const [filerStudentList, setFilterStudentList] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [classList, setClassList] = useState([]);
    const [year, setYear] = useState('');
    const [Class, setClass] = useState('');
    useEffect(async () => {
        await fetch(`${apiURL}/student/admin`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => res.json()).then(res => {
            setStudentList(res.data)
            setDataStudent(res.data)
            setFilterStudentList(res.data)
        })
        await fetch(`${apiURL}/class/admin`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => res.json()).then(res => {
            setClassList(res.data)

        })

    }, [])

    const filter = () => {
        setStudentList(dataStudent)
        if (year != 'all' && Class == 'all') setStudentList(prevList => {
            return prevList.filter(student => {
                return student.year == year;
            })
        })
        else if (Class != 'all') setStudentList(prevList => {
            return prevList.filter(student => {
                return student.class_id == Class;
            })
        })
    }

    const handlerSearch = async (text) => {
        await filter()
        setStudentList(prevList => {
            return prevList.filter(student => {
                return student.full_name.includes(text) || student.email.includes(text)
            })
        })
    }

    const toggleModal = async () => {
        setModalVisible(!isModalVisible);
        filter()

    };

    return (

        <View>
            <HeaderText>Danh sách sinh viên</HeaderText>
            <View style={{ height: '100%' }} >
                <View style={[styles.container]}>
                    <View style={[styles.inputView,]}>
                        {/* Search bar */}
                        <View style={{ display: 'flex', flexDirection: 'row', borderRadius: 20, marginTop: 20 }}>
                            <TextInput
                                style={[styles.input, { textAlign: 'center', margin: 0, width: '90%', borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRightWidth: 0 }]}
                                placeholder='Tên sinh viên hoặc email'
                                onChangeText={text => handlerSearch(text)}
                            />
                            <TouchableOpacity
                                style={{ borderWidth: 1, width: '10%', alignItems: 'center', backgroundColor: '#F8FAFD', borderTopRightRadius: 20, borderBottomRightRadius: 20, borderColor: '#E9EEF4', borderLeftWidth: 0 }}
                                onPress={() => { setModalVisible(true) }}
                            >
                                <Icon name='sort-down' size={28} color='#495057' />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* List student */}
                    <View style={{ width: '100%', marginBottom: '40%' }}>
                        <FlatList
                            data={studentList}
                            renderItem={({ item }) => {
                                return <StudentItem item={item} token={token} navigation={navigation} />
                            }}
                            keyExtractor={item => item._id}

                        />
                    </View>
                </View>
            </View>
            {/* modal */}
            <Modal isVisible={isModalVisible}
                backdropOpacity={.8}
            >
                <View style={{ borderWidth: 1, backgroundColor: 'white', padding: 5, borderRadius: 20, alignItems: 'center' }}>
                    <View style={{ width: '90%' }}>
                        <YearPicker onValueChange={setYear} year={year} />
                        <ClassPicker classList={classList} year={year} onValueChange={setClass} Class={Class} />
                    </View>
                    <View style={{ width: '20%', marginBottom: 10 }}>
                        <Button title='Lưu' onPress={toggleModal} />
                    </View>

                </View>
            </Modal>
        </View >

    );
};

const StudentItem = ({ item, navigation, token }) => {
    const { _id, name, class_id, year, full_name, student_code, email } = item
    const [className, setClassName] = useState('');
    useEffect(async () => {
        await fetch(`${apiURL}/class/admin/${class_id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => res.json()).then(res => setClassName(res.data.name))
    }, [])
    return (
        <View style={{
            marginVertical: 20, marginHorizontal: 10, elevation: 2, padding: 5, alignItems: 'center', borderWidth: 1, borderColor: '#E5E6EA'
        }}>
            <View  >
                <Text>Mã sinh viên: {student_code}</Text>
                <Text>Họ tên: {full_name}</Text>
                <Text>Email: {email}</Text>
                <Text>Năm học: {year}</Text>
                <Text>Lớp sinh hoạt: {className}</Text>
                <View style={{ width: '25%', marginLeft: '70%' }}
                >
                    <Button title='Chi tiết'
                        onPress={() => navigation.navigate('StudentDetail', { item: item, class_name: className })}
                    />
                </View>
            </View>
        </View>

    )
}

const YearPicker = ({ onValueChange, year }) => {
    return (<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <CustomText >Năm:</CustomText>
        <Picker style={{ width: '45%' }}
            onValueChange={val => onValueChange(val)}
            selectedValue={year}
        >
            <Picker.Item label='All' value='all' />
            {yearList.map(year => {
                return (
                    <Picker.Item label={year.toString()} value={year.toString()} key={year.toString()} />
                )
            })}
        </Picker>
    </View>)
}

const ClassPicker = ({ year, classList, onValueChange, Class }) => {

    let renderList = []
    if (year == 'all') renderList = classList;
    else {
        renderList = classList.filter(val => val.year == year);
    }


    return (
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <CustomText >Lớp:</CustomText>
            <Picker style={{ width: '45%' }}
                onValueChange={val => onValueChange(val)}
                selectedValue={Class}

            >
                <Picker.Item label={renderList.length > 0 ? 'All' : 'None'} value={renderList.length > 0 ? 'all' : 'none'} />
                {
                    renderList.map(val => {
                        return <Picker.Item label={val.name} value={val._id} key={val._id} />
                    })
                }
            </Picker>
        </View>
    )
}


const MainScreen = () => {

    return (
        <Stack.Navigator
            initialRouteName="StudentList"
            headerMode='none'
            mode='modal'
        >
            <Stack.Screen name='StudentList' component={StudentList} />
            <Stack.Screen name="StudentDetail" component={StudentDetail} />
        </Stack.Navigator>
    )

}

const CustomText = ({ children, size = 18, color = '#22272E', style }) => {
    return (
        <Text style={[{ fontSize: size, fontFamily: 'Inter', color: color }, { style }]}>
            {children}
        </Text>
    )
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


export default MainScreen;