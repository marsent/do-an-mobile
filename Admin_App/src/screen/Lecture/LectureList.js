
import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, Button, TouchableOpacity } from 'react-native';
import HeaderText from '../../components/HeaderText';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack';
import { BoxShadow } from 'react-native-shadow'
import Modal from 'react-native-modal';

const Stack = createStackNavigator();

import { yearList, facultyList, apiURL } from '../../config/config';
import styles from '../../style/style';
import TokenContext from '../../Context/TokenContext';
import Text from '../../components/Text'
import LectureDetail from './LectureDetail';
import LoadingDataModal from '../../components/LoadingDataModal'
import FlatList from '../../components/FlatList';
import LoadingModal from '../../components/LoadingModal';
import CustomButton from '../../components/Button'
const LectureList = ({ navigation }) => {

    const token = useContext(TokenContext);

    const [lectureList, setLectureList] = useState([]);
    const [dataLecture, setDataLecture] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [faculty, setFaculty] = useState('infomation_technology');
    const [dumpFaculty, setDumpFaculty] = useState('infomation_technology')
    const [loadingDataModal, setLoadingDataModal] = useState(false);
    const [keyWord, setKeyWord] = useState('');

    useEffect(async () => {
        setLoadingDataModal(true);
        await fetch(`${apiURL}/lecture/admin`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => res.json()).then(async (res) => {
            await setLectureList(res.data)
            await setDataLecture(res.data)
            await setLoadingDataModal(false)
        })

    }, [])

    useEffect(() => handlerSearch(), [keyWord])
    useEffect(() => handlerSearch(), [faculty])

    const handlerSearch = async () => {
        setLectureList(dataLecture);
        if (faculty != 'all') {
            await setLectureList(prevList => {
                return prevList.filter(lecture => {
                    return (lecture.full_name.includes(keyWord) || lecture.email.includes(keyWord)) && (lecture.faculty == faculty)
                })
            })
        }
        await setLectureList(prevList => {
            return prevList.filter(lecture => {
                return lecture.full_name.includes(keyWord) || lecture.email.includes(keyWord)
            })
        })
    }

    const toggleModal = async () => {
        setModalVisible(!modalVisible);

    };

    return (

        <View style={{ flex: 1 }}>
            <HeaderText navigation={navigation}>Danh sách giảng viên</HeaderText>
            <View style={{ flex: 1 }} >
                <View style={[styles.container]}>
                    <View style={[styles.inputView,]}>
                        {/* Search bar */}
                        <View style={{ display: 'flex', flexDirection: 'row', borderRadius: 20, marginTop: 20 }}>
                            <TextInput
                                style={[styles.input, { textAlign: 'center', margin: 0, width: '90%', borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRightWidth: 0 }]}
                                placeholder='Tên giảng viên hoặc email'
                                onChangeText={text => setKeyWord(text)}
                            />
                            <TouchableOpacity
                                style={{ borderWidth: 1, width: '10%', alignItems: 'center', backgroundColor: '#F8FAFD', borderTopRightRadius: 20, borderBottomRightRadius: 20, borderColor: '#E9EEF4', borderLeftWidth: 0 }}
                                onPress={() => { setModalVisible(true) }}
                            >
                                <View style={{ flex: 1, justifyContent: 'space-around' }}>
                                    <Icon name='sort-down' size={24} color='#495057' />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* List lecture */}
                    <View style={{ flex: 1, width: '100%', marginTop: 20, }}>
                        <LoadingDataModal visible={loadingDataModal} />
                        {!loadingDataModal && <FlatList data={lectureList} Component={LectureItem} navigation={navigation} />}
                    </View>
                </View>
            </View>
            {/* modal */}
            <Modal isVisible={modalVisible}
                backdropOpacity={.8}
            >
                <View style={{ borderWidth: 1, backgroundColor: 'white', padding: 5, borderRadius: 20, alignItems: 'center' }}>
                    <View style={{ width: '90%' }}>
                        <FacultyPicker onValueChange={setDumpFaculty} faculty={faculty} />
                    </View>

                    <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                        <CustomButton onPress={async () => {
                            await toggleModal();
                            await setFaculty(dumpFaculty)
                        }} style={{ width: 80, marginRight: 5 }} >Lưu</CustomButton>
                        <CustomButton onPress={toggleModal} style={{ width: 80, marginLeft: 5 }} >Hủy</CustomButton>
                    </View>
                </View>
            </Modal>
        </View >

    );
};

const LectureItem = ({ item, navigation }) => {
    const { _id, full_name, faculty, email } = item
    return (
        <View style={{
            marginVertical: 20, marginHorizontal: 10, elevation: 2, padding: 8, alignItems: 'center', borderWidth: 1, borderColor: '#E5E6EA'
        }}>
            <View style={{ width: '95%' }} >
                <Text>Họ tên: {full_name}</Text>
                <Text>Email: {email}</Text>
                <Text>Khoa: {faculty}</Text>
                <View style={{ width: '25%', marginTop: 10 }}
                >
                    <Button title='Chi tiết'
                        onPress={() => navigation.navigate('LectureDetail', { item })}
                    />
                </View>
            </View>
        </View>

    )
}

const FacultyPicker = ({ onValueChange, faculty }) => {
    return (<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <Text >Khoa:</Text>
        <Picker style={{ width: '45%' }}
            onValueChange={val => onValueChange(val)}
            selectedValue={faculty}
        >
            <Picker.Item label='All' value='all' />
            {facultyList.map(faculty => {
                return (
                    <Picker.Item label={faculty} value={faculty} key={faculty} />
                )
            })}
        </Picker>
    </View>)
}


const MainScreen = () => {

    return (
        <Stack.Navigator
            initialRouteName="lectureList"
            headerMode='none'
            mode='modal'
        >
            <Stack.Screen name='lectureList' component={LectureList} />
            <Stack.Screen name="LectureDetail" component={LectureDetail} />
        </Stack.Navigator>
    )

}



export default MainScreen;
