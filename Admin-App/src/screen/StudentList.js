import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import HeaderText from '../components/HeaderText';
import { Picker } from '@react-native-picker/picker';
import styles from '../style/style'
import { ScrollView } from 'react-native-gesture-handler';

import { yearList, facultyList } from '../config/config'

import TokenContext from '../Context/TokenContext'

const StudentList = () => {

    const token = useContext(TokenContext);

    const studentList = [
        {
            "is_verified": false,
            "status": "active",
            "_id": "609d568ccdacc46c207d7e53",
            "email": "1@gmail.com",
            "phone": "1234567891",
            "full_name": "avvc",
            "date_of_birth": "2021-05-13T16:38:51.553Z",
            "year": 2022,
            "class_id": "609d45aecdacc46c207d7e52",
            "password": "$2b$10$PRG4/2sUVJniOHDj2eObDOZD4lZL5Jb.WYslTLudqUFYpDSO5/wLK",
            "decrypt_pass": "41900",
            "student_code": "20220001",
            "createdAt": "2021-05-13T16:40:44.850Z",
            "updatedAt": "2021-05-13T16:40:44.850Z",
            "__v": 0
        },
        {
            "is_verified": false,
            "status": "active",
            "_id": "609d5908cdacc46c207d7e54",
            "email": "Ahah@gmail.com",
            "phone": "1111111111",
            "full_name": "Shsh",
            "date_of_birth": "2021-05-09T16:46:06.419Z",
            "year": 2022,
            "class_id": "609d45aecdacc46c207d7e52",
            "password": "$2b$10$xvpfJnpgmllAixccTz7W..B3yTib9YjpXnUy8.b.km7HxMkanbaKy",
            "decrypt_pass": "84046349",
            "student_code": "20220002",
            "createdAt": "2021-05-13T16:51:20.356Z",
            "updatedAt": "2021-05-13T16:51:20.356Z",
            "__v": 0
        },
        {
            "is_verified": false,
            "status": "active",
            "_id": "609d5d3bcdacc46c207d7e58",
            "email": "H12ddhđh@gmail.com",
            "phone": "1111111123",
            "full_name": "Hssjjsjs",
            "date_of_birth": "2021-05-04T17:04:01.956Z",
            "year": 2020,
            "class_id": "609d45aecdacc46c207d7e52",
            "password": "$2b$10$03DHl62WYwptKhZUYRF1yOTSCukpfLhtjiWex3G61uRfn6/KtXBcS",
            "decrypt_pass": "81855587",
            "student_code": "20200003",
            "createdAt": "2021-05-13T17:09:15.355Z",
            "updatedAt": "2021-05-13T17:09:15.355Z",
            "__v": 0
        },
        {
            "is_verified": false,
            "status": "active",
            "_id": "609ddfeacdacc46c207d7e59",
            "email": "1@gmai.com",
            "phone": "1234567899",
            "full_name": "Qqwwe",
            "date_of_birth": "2021-05-13T02:26:42.422Z",
            "year": 2020,
            "class_id": "609d45aecdacc46c207d7e52",
            "password": "$2b$10$q./h5.6LwkhmER0w/2j/VevftoFIBE3lJ5XrzKfGtjaz8GSg5sN0q",
            "decrypt_pass": "12687543",
            "student_code": "20200004",
            "createdAt": "2021-05-14T02:26:50.456Z",
            "updatedAt": "2021-05-14T02:26:50.456Z",
            "__v": 0
        },
        {
            "is_verified": false,
            "status": "active",
            "_id": "609dea2fcdacc46c207d7e5b",
            "email": "Qwer@gmail.com",
            "phone": "0918356782",
            "full_name": "Aayw",
            "date_of_birth": "2021-05-13T03:10:11.095Z",
            "year": 2020,
            "class_id": "609d45aecdacc46c207d7e52",
            "password": "$2b$10$pd4HwxhiLxCyBLeqAt0CQ.DwUDh7VT7ExmE1ZRamGNAU1soP7oWHi",
            "decrypt_pass": "71720047",
            "student_code": "20200005",
            "createdAt": "2021-05-14T03:10:39.984Z",
            "updatedAt": "2021-05-14T03:10:39.984Z",
            "__v": 0
        },
        {
            "is_verified": false,
            "status": "active",
            "_id": "609df51bcdacc46c207d7e5d",
            "email": "tuananh18423@gmail.com",
            "phone": "1234567894",
            "full_name": "Đào Tuấn Anh",
            "date_of_birth": "2000-02-19T03:56:09.816Z",
            "year": 2022,
            "class_id": "609d45aecdacc46c207d7e52",
            "password": "$2b$10$XhYFhKuoNaMkFfeWdffVuexxjSSnqgZeWSRBC6S6NJnmHAaCgxOee",
            "decrypt_pass": "40371907",
            "student_code": "20220006",
            "createdAt": "2021-05-14T03:57:15.100Z",
            "updatedAt": "2021-05-14T03:57:15.100Z",
            "__v": 0
        },
        {
            "is_verified": false,
            "status": "active",
            "_id": "60a0eaaa2761fa92f107e7cb",
            "email": "havuongquoc2000@gmail.com",
            "phone": "0919519086",
            "full_name": "Quoc Ha",
            "date_of_birth": "2000-12-12T14:06:09.089Z",
            "year": 2022,
            "class_id": "609d45aecdacc46c207d7e52",
            "password": "$2b$10$lffU2Eb2V/CcvsG4HtSid.9UysZFLbZNOMPgjb0WoSnOdHBJsL5q6",
            "decrypt_pass": "81459605",
            "student_code": "20220007",
            "createdAt": "2021-05-16T09:49:30.532Z",
            "updatedAt": "2021-05-16T11:52:56.270Z",
            "__v": 0
        },
        {
            "is_verified": false,
            "status": "active",
            "_id": "60a0ed6e72bc4d9b23e8edac",
            "email": "havuongquo2000@gmail.com",
            "phone": "0919519080",
            "full_name": "Quoc Ha",
            "date_of_birth": "2000-12-12T14:06:09.089Z",
            "year": 2022,
            "class_id": "609d45aecdacc46c207d7e52",
            "password": "$2b$10$IwphwR1cL1uR6Utey9C.HeqzA8/sjD0oISCfoSAABrjTgO74mvUyK",
            "decrypt_pass": "79619221",
            "student_code": "20220008",
            "createdAt": "2021-05-16T10:01:18.300Z",
            "updatedAt": "2021-05-16T10:01:18.300Z",
            "__v": 0
        }
    ]
    const [classList, setClassList] = useState([
        {
            "quantity": 0,
            "status": "active",
            "_id": "609d45aecdacc46c207d7e52",
            "name": "TMDT2022",
            "year": 2022,
            "faculty": "e_commerce",
            "createdAt": "2021-05-13T15:28:46.582Z",
            "updatedAt": "2021-05-13T15:28:46.582Z",
            "__v": 0
        },
        {
            "quantity": 0,
            "status": "active",
            "_id": "60a480fdbb2d90bf551b24e4",
            "name": "HTTT2022",
            "year": 2022,
            "faculty": "e_commerce",
            "createdAt": "2021-05-19T03:07:41.828Z",
            "updatedAt": "2021-05-19T03:07:41.828Z",
            "__v": 0
        }
    ])
    const [selectedClass, setSelectedClass] = useState('')
    return (
        <View>
            <HeaderText>Danh sách sinh viên</HeaderText>
            {/* <ScrollView>
                <View style={[styles.container]}> */}
            {/* Chọn khoa */}
            {/* <View style={[styles.viewPicker, { borderWidth: 1, width: '90%' }]}>
                        <Text style={{ fontSize: 18 }}>Khoa</Text>

                        <Picker
                            style={{ width: '60%' }}
                        >
                            <Picker.Item label='All' value='' />
                            {facultyList.map(val => <Picker.Item
                                label={val}
                                value={val}
                                key={val}
                            />)}
                        </Picker>
                    </View> */}
            {/* Year picker */}
            {/* <View style={[styles.viewPicker, { borderWidth: 1, width: '90%' }]}>
                        <Text style={{ fontSize: 18 }}>Lớp</Text>
                        <Picker
                            style={{ width: '60%' }}
                        >
                            <Picker.Item label='All' value='' />
                            {yearList.map(val => <Picker.Item
                                label={val.toString()}
                                value={val.toString()}
                                key={val.toString()}
                            />)}
                        </Picker>
                    </View> */}
            {/* Class picker */}
            {/* <View style={[styles.viewPicker, { borderWidth: 1, width: '90%' }]}>
                        <Text style={{ fontSize: 18 }}>Lớp</Text>
                        <Picker
                            style={{ width: '60%' }}
                        >
                            {classList.map(val => <Picker.Item
                                label={val.name}
                                value={val._id}
                                key={val._id}
                            />)}
                        </Picker>
                    </View>
                    <View>
                        {studentList.map(val => {
                            return (
                                <View>
                                    <Text>ID:{val._id}</Text>
                                    <Text>Họ Tên: {val.full_name}</Text>
                                </View>
                            )
                        })}
                    </View>
                </View>
            </ScrollView> */}
        </View>
    );
};

async function getAllClass() {
    const allClass = await fetch('quocha.xyz/api/class/admin', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(res => res.json()).then(res => res.data)
    console.log(allclass);
}

export default StudentList;