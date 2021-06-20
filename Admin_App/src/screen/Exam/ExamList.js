
import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import HeaderText from '../../components/HeaderText';
import { Picker } from '@react-native-picker/picker';
import { createStackNavigator } from '@react-navigation/stack';
import Modal from 'react-native-modal';

const Stack = createStackNavigator();

import { apiURL } from '../../config/config';
import { ExamUtils } from '../../utils'
import styles from '../../style/style';
import TokenContext from '../../Context/TokenContext';
import Text from '../../components/Text'
import ExamDetail from './ExamDetail';
import LoadingDataModal from '../../components/LoadingDataModal';
import FlatList from '../../components/FlatList';
import CustomButton from '../../components/Button';
import Search from '../../components/Search'
import CardView from '../../components/CardView'


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
        try {
            await ExamUtils.getAllExam({ token: token })
                .then(res => {
                    setDataExam(res.data)
                    setExamList(res.data)
                })
        } catch (err) {
            console.log('Error get examList: ', err);
        }
        return () => {
            setDataExam();
            setExamList()
        }
    }, [])

    useEffect(() => handlerSearch(), [typeFilter])
    useEffect(() => handlerSearch(), [keyWord])



    const handlerSearch = async () => {

        await setLoadingDataModal(true)
        await setExamList(dataExam)
        await setTimeout(async () => {
            try {
                await setExamList(prevList => {
                    return prevList.filter(exam => {
                        if (typeFilter === 'tất cả') {
                            return exam.name.includes(keyWord)
                        }
                        return exam.name.includes(keyWord) && exam.for === typeFilter
                    })
                })
                setLoadingDataModal(false)
            }
            catch (err) {
                console.log('Error Search  : ', err)
            }
        }, 1000)


    }

    const toggleModal = async () => {
        setModalVisible(!isModalVisible);
    };

    return (

        <View style={{ flex: 1 }}>
            <HeaderText navigation={navigation}>Danh sách bài thi</HeaderText>
            <View style={{ flex: 1 }} >
                <View style={[styles.container]}>

                    <View style={{ width: '90%', marginTop: 10 }} >
                        <Search
                            placeholder='Tên bài thi'
                            value={keyWord}
                            onEndEditing={setKeyWord}
                            onFilter={() => { setModalVisible(true) }}
                        />

                    </View>
                    {/* List exam */}
                    <View style={{
                        flex: 1, width: '100%', marginTop: 20,
                    }}>
                        <LoadingDataModal visible={loadingDataModal} />
                        {!loadingDataModal && <FlatList data={examList} Component={ExamItem} navigation={navigation} />}
                    </View>
                </View>
            </View >
            {/* modal */}
            {isModalVisible && < Modal isVisible={true}
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
                            await setTypeFilter(dumpType)

                        }} style={{ width: 80, marginRight: 5 }} >Lưu</CustomButton>
                        <CustomButton onPress={toggleModal} style={{ width: 80, marginLeft: 5 }} >Hủy</CustomButton>
                    </View>

                </View>
            </Modal >}
        </View >

    );
};

const ExamItem = ({ item, navigation }) => {
    return (
        <CardView onPress={() => navigation.navigate('ExamDetail', { _id: item._id })}>
            <View style={{ width: '95%' }} >
                <Text>Tên bài thi: {item.name}</Text>
                <Text>Số lương câu hỏi: {item.questions.length}</Text>
                <Text>Thời gian làm bài: {item.time} phút</Text>
                <Text>Loại: {item.for}</Text>
                <View style={{ width: '25%', marginTop: 10 }}
                >

                </View>
            </View>
        </CardView>

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
