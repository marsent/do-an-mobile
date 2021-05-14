import { Picker } from '@react-native-picker/picker'
import React, { useState, useContext } from 'react'
import { Button, TextInput } from 'react-native'
import { View, Text, ScrollView } from 'react-native'

import styles from '../style/style'
import HeaderText from '../components/HeaderText'
import DocumentPicker from 'react-native-document-picker'

export default AddExam = () => {
    const [type, setType] = useState(true);

    const pickerFile = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.csv],
            });

            uploadyContext.upload(res);

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log("User cancelled the picker, exit any dialogs or menus and move on");
            } else {
                throw err;
            }
        }
    }

    return (
        <View >
            <HeaderText  >Tạo bài thi</HeaderText>
            <ScrollView >
                <View style={[styles.container, { marginTop: 70 }]}>
                    <View style={{ width: '90%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <Text >Loại cuộc thi:</Text>

                        <Picker
                            selectedValue={type}
                            onValueChange={value => setType(value)}
                            style={{ width: '40%' }}
                        >
                            <Picker.Item style={{ fontSize: 18 }} label='Lớp' value={true} />
                            <Picker.Item label='Nhóm' value={false} />
                        </Picker>
                    </View>
                    {type ? null :
                        <View style={[styles.inputView]}>
                            <TextInput style={[styles.input, styles.inputArea, { textAlignVertical: 'top' }]}
                                placeholder="Nhập email sinh viên"
                                focusable={false}
                                multiline={true}
                                numberOfLines={10}
                            />
                        </View>}
                    <Button style={{ marginTop: 20 }} title='Choose File' onPress={pickerFile} />
                </View>
            </ScrollView>
        </View >
    )
}