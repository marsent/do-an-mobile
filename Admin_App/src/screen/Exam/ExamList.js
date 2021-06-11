
import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, Button, TouchableOpacity } from 'react-native';
import HeaderText from '../../components/HeaderText';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack';
import Modal from 'react-native-modal';

const Stack = createStackNavigator();

import { apiURL } from '../../config/config';
import styles from '../../style/style';
import TokenContext from '../../Context/TokenContext';
import Text from '../../components/Text'
import ExamDetail from './ExamDetail';
import LoadingDataModal from '../../components/LoadingDataModal';
import FlatList from '../../components/FlatList';
import CustomButton from '../../components/Button';
const ExamList = ({ navigation }) => {
    const token = useContext(TokenContext);
    const [typeFilter, setTypeFilter] = useState('tất cả');
    const [examList, setExamList] = useState([]);
    const [dataExam, setDataExam] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [loadingDataModal, setLoadingDataModal] = useState(false)
    const [dumpType, setDumpType] = useState('tất cả')
    const [keyWord, setKeyWord] = useState('')
    useEffect(async () => {
        setLoadingDataModal(true)
        await fetch(`${apiURL}/exam/admin`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => res.json()).then(res => {
            setLoadingDataModal(false)
            setExamList(res.data)
            setDataExam(res.data)
        })

    }, [])

    useEffect(() => handlerSearch(), [keyWord])
    useEffect(() => handlerSearch(), [typeFilter])

    const handlerSearch = async () => {
        await setExamList(dataExam)
        await setExamList(prevList => {
            return prevList.filter(exam => {
                if (typeFilter === 'tất cả') {
                    return exam.name.includes(keyWord)
                }
                return exam.name.includes(keyWord) && exam.for === typeFilter
            })
        })
    }

    const toggleModal = async () => {
        setModalVisible(!isModalVisible);
    };

    return (

        <View style={{ flex: 1 }}>
            <HeaderText navigation={navigation}>Danh sách bài thi</HeaderText>
            <View style={{ flex: 1 }} >
                <View style={[styles.container]}>
                    <View style={[styles.inputView,]}>
                        {/* Search bar */}
                        <View style={{ flexDirection: 'row', borderRadius: 20, marginTop: 20 }}>
                            <TextInput
                                style={[styles.input, { textAlign: 'center', margin: 0, width: '90%', borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRightWidth: 0 }]}
                                placeholder='Tên bài thi'
                                value={keyWord}
                                onChangeText={text => { setKeyWord(text) }}
                            />
                            <TouchableOpacity
                                style={{ width: '10%', alignItems: 'center', backgroundColor: '#F8FAFD', borderTopRightRadius: 20, borderBottomRightRadius: 20, borderColor: '#E9EEF4', borderLeftWidth: 0 }}
                                onPress={() => { setModalVisible(true) }}
                            >
                                <View style={{ flex: 1, justifyContent: 'space-around' }}>
                                    <Icon name='sort-down' size={24} color='#495057' />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* List exam */}
                    <View style={{
                        flex: 1, width: '100%', marginTop: 20,
                    }}>
                        <View style={{ flex: 1, width: '100%', marginTop: 20, borderWidth: 1 }}>
                            <LoadingDataModal visible={loadingDataModal} />
                            {!loadingDataModal && <FlatList data={examList} Component={ExamItem} navigation={navigation} />}
                        </View>
                    </View>
                </View>
            </View >
            {/* modal */}
            < Modal isVisible={isModalVisible}
                backdropOpacity={.8}
            >
                <View style={{ backgroundColor: 'white', padding: 5, borderRadius: 20, alignItems: 'center' }}>
                    <View style={{ width: '90%', }}>
                        <Text>Loại bài thi:</Text>
                        <Picker
                            style={{ borderWidth: 1, elevation: 5 }}
                            mode='dropdown'
                            selectedValue={typeFilter}
                            onValueChange={type => setDumpType(type)}
                        >
                            <Picker.Item label='Tất cả' value='tất cả' />
                            <Picker.Item label='All' value='all' />
                            <Picker.Item label='Lớp' value='class' />
                            <Picker.Item label='Nhóm' value='group' />
                        </Picker>
                    </View>
                    <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                        <CustomButton onPress={async () => {
                            await toggleModal();
                            if (typeFilter != dumpType) {
                                await setLoadingDataModal(true)
                                await setTypeFilter(dumpType)
                                await setTimeout(async () => await setLoadingDataModal(false), 1000)
                            }
                        }} style={{ width: 80, marginRight: 5 }} >Lưu</CustomButton>
                        <CustomButton onPress={toggleModal} style={{ width: 80, marginLeft: 5 }} >Hủy</CustomButton>
                    </View>

                </View>
            </Modal >
        </View >

    );
};

const ExamItem = ({ item, navigation }) => {

    return (
        <View style={{
            marginVertical: 20, marginHorizontal: 10, elevation: 2, padding: 8, alignItems: 'center', borderColor: '#E5E6EA'
        }}>
            <View style={{ width: '95%' }} >
                <Text>Tên bài thi: {item.name}</Text>
                <Text>Số lương câu hỏi: {item.questions.length}</Text>
                <Text>Thời gian làm bài: {item.time} phút</Text>
                <Text>Loại: {item.for}</Text>
                <View style={{ width: '25%', marginTop: 10 }}
                >
                    <Button title='Chi tiết'
                        onPress={() => navigation.navigate('ExamDetail', { item })}
                    />
                </View>
            </View>
        </View>

    )
}



const MainScreen = () => {

    return (
        <Stack.Navigator
            initialRouteName="ExamList"
            headerMode='none'
            mode='modal'
        >
            <Stack.Screen name='ExamList' component={ExamList} />
            <Stack.Screen name="ExamDetail" component={ExamDetail} />
        </Stack.Navigator>
    )

}





export default MainScreen;
