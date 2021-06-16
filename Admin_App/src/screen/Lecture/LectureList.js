
import React, { useContext, useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import HeaderText from '../../components/HeaderText';
import { Picker } from '@react-native-picker/picker';
import { createStackNavigator } from '@react-navigation/stack';
import Modal from 'react-native-modal';

const Stack = createStackNavigator();

import { facultyList, apiURL } from '../../config/config';
import styles from '../../style/style';
import TokenContext from '../../Context/TokenContext';
import Text from '../../components/Text'
import LectureDetail from './LectureDetail';
import LoadingDataModal from '../../components/LoadingDataModal'
import FlatList from '../../components/FlatList';
import CustomButton from '../../components/Button'
import Search from '../../components/Search'
import { TouchableOpacity } from 'react-native';

const LectureList = ({ navigation }) => {

    const token = useContext(TokenContext);

    const [lectureList, setLectureList] = useState([]);
    const [dataLecture, setDataLecture] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [faculty, setFaculty] = useState('all');
    const [dumpFaculty, setDumpFaculty] = useState('all')
    const [loadingDataModal, setLoadingDataModal] = useState(false);
    const [keyWord, setKeyWord] = useState('');

    useEffect(async () => {
        try {
            await fetch(`${apiURL}/lecture/admin`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then(res => res.json()).then(async (res) => {
                await setDataLecture(res.data)
                await setLectureList(res.data)
            })
        }
        catch (err) {
            console.log('Get lerture list error: ', err);
        }
        console.log(facultyList);
        return () => {
            setLectureList();
            setDataLecture();
        }
    }, [])

    useEffect(() => handlerSearch(), [keyWord])
    useEffect(() => handlerSearch(), [faculty])

    const handlerSearch = async () => {
        await setLoadingDataModal(true)
        await setLectureList(dataLecture);
        await setTimeout(async () => {
            if (faculty != 'all') {
                console.log(2);
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
            await setLoadingDataModal(false)
        }, 1000)

    }

    const toggleModal = async () => {
        setModalVisible(!modalVisible);

    };

    return (

        <View style={{ flex: 1 }}>
            <HeaderText navigation={navigation}>Danh sách giảng viên</HeaderText>
            <View style={{ flex: 1 }} >
                <View style={[styles.container]}>
                    {/* Search bar */}
                    <View style={{ width: '90%', marginTop: 10 }} >
                        <Search
                            placeholder='Tên giảng viên hoặc email'
                            value={keyWord}
                            onEndEditing={setKeyWord}
                            onFilter={() => { setModalVisible(true) }}
                        />

                    </View>
                    {/* List lecture */}
                    <View style={{ flex: 1, width: '100%', marginTop: 20, }}>
                        <LoadingDataModal visible={loadingDataModal} />
                        {!loadingDataModal && <FlatList data={lectureList} Component={LectureItem} navigation={navigation} />}
                    </View>
                </View>
            </View>
            {/* modal */}
            {modalVisible && <Modal isVisible={true}
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
            </Modal>}
        </View >

    );
};

const LectureItem = ({ item, navigation }) => {
    const { _id, full_name, faculty, email } = item
    return (
        <TouchableOpacity style={{

            marginVertical: 20, marginHorizontal: 10, elevation: 2, padding: 8, alignItems: 'center', borderRadius: 15
        }}
            onPress={() => navigation.navigate('LectureDetail', { _id })}
        >
            <View style={{ width: '95%' }} >
                <Text>Họ tên: {full_name}</Text>
                <Text>Email: {email}</Text>
                <Text>Khoa: {faculty}</Text>
                <View style={{ width: '25%', marginTop: 10 }}
                >
                    {/* <Button title='Chi tiết'
                        onPress={() => navigation.navigate('LectureDetail', { item })}
                    /> */}
                </View>
            </View>
        </TouchableOpacity >

    )
}

const FacultyPicker = ({ onValueChange, faculty }) => {
    return (<View style={{ width: '90%' }}>
        <Text >Khoa:</Text>
        <Picker
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
