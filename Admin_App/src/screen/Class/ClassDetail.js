import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-toast-message';


import styles from '../../style/style';
import { mainBlue, mainBlack } from '../../style/color'
import { apiURL } from '../../config/config';
import TokenContext from '../../Context/TokenContext';
import { LoadingDataModal, Text, SubmitButtonDetail, TextInput } from '../../components';
const ClassDetail = ({ route, navigation }) => {
    const token = useContext(TokenContext);
    const { _id } = route.params;
    const initError = { name: false }
    const initClass = {
        "quantity": 0,
        "status": "",
        "_id": "",
        "name": "",
        "year": "",
        "faculty": "",
    }
    const [Class, setClass] = useState(initClass)
    const [isLoadingData, setIsLoadingData] = useState(false)
    const [error, setError] = useState(initError)
    const [isEdit, setIsEdit] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const getData = async () => {
        try {
            await fetch(`${apiURL}/class/admin/${_id}`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                }).then(res => res.json())
                .then(res => {
                    setClass(res.data)

                })
        }
        catch (err) {
            console.log('Error get Class:', err);
        }
    }

    useEffect(async () => {
        await setIsLoadingData(true)
        await getData();
        await setIsLoadingData(false)

        return () => {
            setClass()
        }
    }, [])

    const save = async () => {
        setIsProcessing(true)
        await setTimeout(async () => {
            try {
                await fetch(`${apiURL}/class/admin/${_id}`,
                    {
                        method: 'PUT',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        },
                        body: JSON.stringify({ name: Class.name })
                    }).then(res => res.json())
                    .then(async (res) => {

                        if (res.statusCode == 400) {
                            return setError(res.messages)
                        }
                        if (res.statusCode = 200) {
                            setError(initError)
                            await setIsEdit(!isEdit)

                            return Toast.show({
                                type: 'success',
                                position: 'top',
                                text1: 'Cập nhật thành công ',
                                visibilityTime: 2000,
                                autoHide: true,
                            })
                        }
                    })
            }
            catch (err) {
                console.log('Error submit:', err);
            }
            await setIsProcessing(false)
        }, 1000)
    }

    const cancelHandler = () => {
        setIsEdit(false)
        setError(initError)
        getData()
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomHeaderText navigation={navigation} >Chi tiết lớp</CustomHeaderText>
            <LoadingDataModal visible={isLoadingData} />
            {!isLoadingData && <View style={{ flex: 1, alignItems: 'center' }} >
                <View style={{ marginTop: 30, alignItems: 'center' }}>

                    <View style={{ width: '90%' }}>
                        <CustomView>
                            <View style={{ flex: .7, alignItems: 'flex-end', marginRight: 10 }}>
                                <Text >Tên lớp:</Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    errorMessage={error.name}
                                    type='flat'
                                    value={Class.name}
                                    editable={isEdit}
                                    outLine={isEdit}
                                    outlineColor={mainBlue}
                                    onChangeText={text => setClass({ ...Class, name: text })}
                                />
                            </View>
                        </CustomView>
                        <CustomView>
                            <View style={{ flex: .7, alignItems: 'flex-end', marginRight: 10 }}>
                                <Text  >Năm: </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    type='flat'
                                    editable={false}
                                    value={Class.year.toString()} />
                            </View>

                        </CustomView>
                        <CustomView>
                            <View style={{ flex: .7, alignItems: 'flex-end', marginRight: 10 }}>
                                <Text>Khoa quản lý: </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    type='flat'
                                    editable={false}
                                    value={Class.faculty} />
                            </View>

                        </CustomView>
                        <CustomView>
                            <View style={{ flex: .7, alignItems: 'flex-end', marginRight: 10 }}>
                                <Text>Số lượng: </Text>
                            </View>
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    type='flat'
                                    editable={false}
                                    value={Class.quantity.toString()} />
                            </View>

                        </CustomView>

                    </View>


                </View>

                <SubmitButtonDetail
                    isEdit={isEdit}
                    isProcessing={isProcessing}
                    onEditPress={() => setIsEdit(true)}
                    onSavePress={() => save()}
                    onCancelPress={() => {
                        cancelHandler()
                    }}
                />
            </View>}
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </SafeAreaView >
    );
};

const CustomView = ({ children }) => {

    return <View style={{
        width: '100%', flexDirection: 'row', alignItems: 'center'
    }} >
        {children}
    </View >
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


export default ClassDetail;
