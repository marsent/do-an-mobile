import React, { useContext, useEffect, useState } from 'react';
import { View, Button, } from 'react-native';
import HeaderText from '../../components/HeaderText';
import { Picker } from '@react-native-picker/picker';
import { createStackNavigator } from '@react-navigation/stack';
import Modal from 'react-native-modal';

const Stack = createStackNavigator();

import { yearList, apiURL } from '../../config/config';
import styles from '../../style/style';
import TokenContext from '../../Context/TokenContext';
import StudentDetail from './StudentDetail';
import LoadingDataModal from '../../components/LoadingDataModal'
import FlatList from '../../components/FlatList'
import CustomButton from '../../components/Button'
import Text from '../../components/Text'
import Search from '../../components/Search'
import { TouchableOpacity } from 'react-native';


const ClassListContext = React.createContext()


const StudentList = ({ navigation }) => {

    const token = useContext(TokenContext);

    const [studentList, setStudentList] = useState([]);
    const [dataStudent, setDataStudent] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [classList, setClassList] = useState([]);
    const [loadingDataModal, setLoadingDataModal] = useState(false);
    const [keyWord, setKeyWord] = useState('');
    const [filterData, setFilterData] = useState({ year: 'all', class: 'all' });
    const [dumpFilter, setDumpfilter] = useState({ year: 'all', class: 'all' });
    useEffect(async () => {
        await setLoadingDataModal(true)

        await fetch(`${apiURL}/student/admin`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => res.json()).then(async (res) => {

            await setStudentList(res.data)
            await setDataStudent(res.data)
        })
        await fetch(`${apiURL}/class/admin`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(res => res.json()).then(async (res) => {
            await setClassList(res.data)
            await setLoadingDataModal(false)

        })
        return () => {
            setStudentList();
            setDataStudent();
            setClassList();
            setKeyWord();
            setFilterData();
            setDumpfilter();
        }
    }, [])

    useEffect(() => handlerSearch(), [keyWord])
    useEffect(() => handlerSearch(), [filterData])

    const handlerSearch = async () => {
        setLoadingDataModal(true)
        await setStudentList(dataStudent)
        await setTimeout(async () => {
            if (filterData.year == 'all' && filterData.class == 'all') {
                await setStudentList(prevList => {
                    return prevList.filter(student => {
                        return student.full_name.includes(keyWord) || student.email.includes(keyWord)
                    })
                })
            }
            if (filterData.year != 'all' && filterData.class != 'all') {
                await setStudentList(prevList => {
                    return prevList.filter(student => {
                        return (student.full_name.includes(keyWord) || student.email.includes(keyWord)) && (student.class_id == filterData.class && student.year == filterData.year)
                    })
                })
            }
            if (filterData.year != 'all' || filterData.class != 'all') {
                await setStudentList(prevList => {
                    return prevList.filter(student => {
                        return (student.full_name.includes(keyWord) || student.email.includes(keyWord)) && (student.class_id == filterData.class || student.year == filterData.year)
                    })
                })
            }
            setLoadingDataModal(false)
        }, 1000)
    }

    const toggleModal = async () => {
        setModalVisible(!isModalVisible);
    };

    return (

        <View style={{ flex: 1 }}>
            <HeaderText navigation={navigation}>Danh sách sinh viên</HeaderText>
            <View style={{ flex: 1 }} >
                <View style={[styles.container]}>
                    <View style={{ width: '90%', marginTop: 10 }} >
                        <Search
                            placeholder='Tên sinh viên hoặc email'
                            value={keyWord}
                            onEndEditing={setKeyWord}
                            onFilter={() => { setModalVisible(true) }}
                        />

                    </View>
                    {/* List student */}
                    <View style={{ flex: 1, width: '100%', marginTop: 20, }}>
                        <View style={{ flex: 1, width: '100%', marginTop: 20 }}>
                            <LoadingDataModal visible={loadingDataModal} />
                            {!loadingDataModal &&
                                <ClassListContext.Provider value={classList}>
                                    <FlatList data={studentList} Component={StudentItem} navigation={navigation} />
                                </ClassListContext.Provider>
                            }
                        </View>
                    </View>
                </View>
            </View>
            {/* modal */}
            {isModalVisible && <Modal isVisible={true}
                backdropOpacity={.8}
            >
                <View style={{ borderWidth: 1, backgroundColor: 'white', padding: 5, borderRadius: 20, alignItems: 'center' }}>
                    <View style={{ width: '90%' }}>
                        <YearPicker onValueChange={setDumpfilter} dumpFilter={dumpFilter} filterData={filterData} />
                        <ClassPicker classList={classList} onValueChange={setDumpfilter} dumpFilter={dumpFilter} filterData={filterData} />
                    </View>
                    <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                        <CustomButton onPress={async () => {
                            await toggleModal();
                            await setFilterData(dumpFilter)

                        }}
                            style={{ width: 80, marginRight: 5 }} >Lưu</CustomButton>
                        <CustomButton onPress={() => toggleModal()} style={{ width: 80, marginLeft: 5 }} >Hủy</CustomButton>
                    </View>

                </View>
            </Modal>}
        </View >

    );
};

const StudentItem = ({ item, navigation }) => {
    const classList = useContext(ClassListContext)
    const { _id, name, class_id, year, full_name, student_code, email } = item
    const [classObj, setClassObj] = useState({});
    useEffect(async () => {
        await setClassObj(classList.filter(val => val._id == class_id)[0])
    }, [classList])
    return (
        <TouchableOpacity style={{
            marginVertical: 20, marginHorizontal: 10, elevation: 2, padding: 8, alignItems: 'center', borderRadius: 15
        }}
            onPress={() => navigation.navigate('StudentDetail', { _id })}
        >
            <View style={{ width: '95%' }} >
                <Text>Mã sinh viên: {student_code}</Text>
                <Text>Họ tên: {full_name}</Text>
                <Text>Email: {email}</Text>
                <Text>Năm học: {year}</Text>
                <Text>Lớp sinh hoạt:{classObj.name} </Text>
                <View style={{ width: '25%', marginTop: 10 }}
                >
                    {/* <Button title='Chi tiết'
                        onPress={() => navigation.navigate('StudentDetail', { _id })}
                    /> */}
                </View>
            </View>
        </TouchableOpacity>

    )
}

const YearPicker = ({ onValueChange, dumpFilter, filterData }) => {
    return (<View >
        <Text >Năm:</Text>
        <Picker
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

const ClassPicker = ({ classList, onValueChange, filterData, dumpFilter, setDumpfilter }) => {

    let renderList = []
    if (dumpFilter.year == 'all') renderList = classList;
    else {
        renderList = classList.filter(val => val.year == dumpFilter.year);
    }


    return (
        <View >
            <Text >Lớp:</Text>
            <Picker
                onValueChange={val => onValueChange({ ...dumpFilter, class: val })}
                selectedValue={filterData.class}
            >
                <Picker.Item label={renderList.length > 0 ? 'All' : 'None'} value={renderList.length > 0 ? 'all' : 'none'} />
                {
                    renderList.map(val => {
                        return <Picker.Item label={val.name} value={val._id} key={val._id} />
                    })
                }
            </Picker>
        </View >
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




export default MainScreen;