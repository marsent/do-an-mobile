import React, { useContext, useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker'

import { apiURL, facultyList, yearList } from '../../config/config'
import styles from '../../style/style'
import HeaderText from '../../components/HeaderText'
import TokenContext from '../../Context/TokenContext'
import LoadingDataModal from '../../components/LoadingDataModal'
import FlatList from '../../components/FlatList'
import Text from '../../components/Text'
import CustomButton from '../../components/Button'
import { Search } from '../../components/TextInput'


const ClassList = ({ navigation }) => {
    const token = useContext(TokenContext);
    const [loadingDataModal, setLoadingDataModal] = useState(false);
    const [filterData, setFilterData] = useState({ faculty: 'all', year: 'all' })
    const [dumpFilter, setDumpFilter] = useState({ faculty: 'all', year: 'all' })
    const [keyWord, setKeyWord] = useState('');
    const [classList, setClassList] = useState([]);
    const [dataClass, setDataClass] = useState([])
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(async () => {
        setLoadingDataModal(true)
        await fetch(`${apiURL}/class/admin`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => res.json()).then(async (res) => {
            await setClassList(res.data)
            await setDataClass(res.data)
            await setLoadingDataModal(false)
        })
    }, [])

    useEffect(() => handlerSearch(), [keyWord])
    useEffect(() => handlerSearch(), [filterData])

    const handlerSearch = async () => {
        setClassList(dataClass);
        if (filterData.faculty == 'all' && filterData.year == 'all') {
            await setClassList(prevList => {
                return prevList.filter(classObj => {
                    return classObj.name.includes(keyWord)
                })
            })
        }
        else if (filterData.faculty != 'all' && filterData.year != 'all') {
            await setClassList(prevList => {
                return prevList.filter(classObj => {
                    return (classObj.name.includes(keyWord)) && (classObj.year == filterData.year && classObj.faculty == filterData.faculty)
                })
            })
        }
        else if (filterData.faculty != 'all' || filterData.year != 'all') {
            await setClassList(prevList => {
                return prevList.filter(classObj => {
                    return (classObj.name.includes(keyWord)) && (classObj.year == filterData.year || classObj.faculty == filterData.faculty)
                })
            })
        }
    }

    const toggleModal = async () => {
        setModalVisible(!modalVisible);

    };

    return (
        <View style={{ flex: 1 }}>
            <HeaderText navigation={navigation}>Danh sách lớp học</HeaderText>
            <View style={{ flex: 1 }}>
                <View style={[styles.container]}>
                    <View style={{ width: '90%', marginTop: 10 }} >
                        <Search
                            placeholder='Tên bài thi'
                            value={keyWord}
                            onChangeText={val => setKeyWord(val)}
                            onEndEditing={() => handlerSearch()}
                            onSearch={() => handlerSearch()}
                            onFilter={() => { setModalVisible(true) }}
                        />

                    </View>

                    {/* List Class */}
                    <View style={{ flex: 1, width: '100%', marginTop: 20, }}>
                        <LoadingDataModal visible={loadingDataModal} />
                        {!loadingDataModal && <FlatList data={classList} Component={ClassItem} navigation={navigation} />}
                    </View>
                </View>
            </View>

            {/* modal */}
            <Modal isVisible={modalVisible}
                backdropOpacity={.8}
            >
                <View style={{ borderWidth: 1, backgroundColor: 'white', padding: 5, borderRadius: 20, alignItems: 'center' }}>
                    <View style={{ width: '90%' }}>
                        <YearPicker onValueChange={setDumpFilter} dumpFilter={dumpFilter} filterData={filterData} />
                        <FacultyPicker onValueChange={setDumpFilter} dumpFilter={dumpFilter} filterData={filterData} />
                    </View>

                    <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                        <CustomButton onPress={async () => {
                            await toggleModal();
                            if (filterData.faculty != dumpFilter.faculty || filterData.year != dumpFilter.year) {
                                await setLoadingDataModal(true);
                                await setFilterData(dumpFilter)
                                await setTimeout(async () => await setLoadingDataModal(false), 1000)

                            }

                        }} style={{ width: 80, marginRight: 5 }} >Lưu</CustomButton>
                        <CustomButton onPress={toggleModal} style={{ width: 80, marginLeft: 5 }} >Hủy</CustomButton>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const ClassItem = ({ item, navigation }) => {


    return (
        <View style={{
            marginVertical: 20, marginHorizontal: 10, elevation: 2, padding: 8, alignItems: 'center', borderWidth: 1, borderColor: '#E5E6EA'
        }}>
            <View style={{ width: '95%' }} >
                <Text>Tên lớp: {item.name}</Text>
                <Text>Năm: {item.year}</Text>
                <Text>Khoa quản lý: {item.faculty}</Text>
                <View style={{ width: '25%', marginTop: 10 }}
                >
                    {/* <Button title='Chi tiết'
                        onPress={() => navigation.navigate('ClassDetail', { item })}
                    /> */}
                </View>
            </View>
        </View>

    )
}

const FacultyPicker = ({ onValueChange, dumpFilter, filterData }) => {
    return (<View style={{}}>
        <Text >Khoa:</Text>
        <Picker
            mode='dropdown'
            onValueChange={val => onValueChange({ ...dumpFilter, faculty: val })}
            selectedValue={filterData.faculty}
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

const YearPicker = ({ onValueChange, dumpFilter, filterData }) => {
    return (<View >
        <Text >Năm:</Text>
        <Picker
            mode='dropdown'
            onValueChange={val => onValueChange({ ...dumpFilter, year: val })}
            selectedValue={filterData.year}
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



export default ClassList;