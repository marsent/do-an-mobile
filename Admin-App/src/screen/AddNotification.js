import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Button } from "react-native";
import styles from '../style/style'
    ; import { Picker } from '@react-native-picker/picker';
import HeaderText from '../components/HeaderText';
export default AddNotifiacaion = () => {
    const [codeClass, setCodeClass] = useState('All')
    const [type, setType] = useState(true)
    return (
        <View>
            <HeaderText>Tạo thông báo</HeaderText>

            <ScrollView>
                <View style={styles.container}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '60%', padding: 10, }}>
                        <Text style={{ textAlign: 'center' }}>Lớp</Text>
                        <Picker
                            selectedValue={codeClass}
                            onValueChange={(value) => setCodeClass(value)}
                            mode='dropdown'
                            style={{ alignItems: 'center', width: '70%' }}>
                            <Picker.Item label="All" value="All" />
                            <Picker.Item label="IT001.J15" value="HTTT" />
                            <Picker.Item label="IT002.J15" value="CNPM" />
                        </Picker>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '60%', padding: 10, }}>
                        <Text style={{ textAlign: 'center' }}>Loại thông báo</Text>
                        <Picker
                            selectedValue={codeClass}
                            onValueChange={(value) => setType(value)}
                            mode='dropdown'
                            style={{ alignItems: 'center', width: '50%' }}
                        >
                            <Picker.Item label="Nghỉ" value={true} />
                            <Picker.Item label="Bù" value={false} />
                        </Picker>
                    </View>
                    <View style={[styles.inputView]}>
                        <TextInput style={[styles.input, styles.inputArea, { textAlignVertical: 'top' }]}
                            placeholder="Nội dung thông báo"
                            focusable={false}
                            multiline={true}
                            numberOfLines={10}

                        />
                    </View>
                    <Button title='Tạo thông báo' />
                </View >
            </ScrollView>
        </View>
    )

}
