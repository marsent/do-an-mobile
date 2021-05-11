import React, { useState } from 'react';
import { View, KeyboardAvoidingView, Text, ScrollView, TextInput, Button } from "react-native";
import styles from '../style/style'
import { t } from 'react-native-tailwindcss';
import { Picker } from '@react-native-picker/picker';
export default AddNotifiacaion = () => {
    const [codeClass, setCodeClass] = useState('All')

    return (
        <View>
            <View style={[styles.headerView, { marginBottom: 100 }]}>
                <Text style={styles.headerText}>Thông báo</Text>
            </View>
            <ScrollView>
                <View style={styles.container}>
                    <View style={[styles.inputView]}>
                        <TextInput style={[styles.input, styles.inputArea, { textAlignVertical: 'top' }]}
                            placeholder="Nội dung thông báo"
                            focusable={false}
                            multiline={true}
                            numberOfLines={10}

                        />
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', padding: 10, }}>

                        <View style={{ display: 'flex', flexDirection: 'column', width: '40%' }}>
                            <Text style={{ textAlign: 'center' }}>Lớp</Text>
                            <Picker
                                selectedValue={codeClass}
                                onValueChange={(value) => setCodeClass(value)}
                                mode='dropdown'
                                style={{ alignItems: 'center' }}>
                                <Picker.Item label="All" value="All" />
                                <Picker.Item label="IT001.J15" value="HTTT" />
                                <Picker.Item label="IT002.J15" value="CNPM" />

                            </Picker>
                        </View>

                    </View>
                    <Button title='Tạo thông báo' />
                </View >
            </ScrollView>
        </View>
    )

}
