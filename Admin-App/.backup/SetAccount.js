import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { passwordValidator, retypePassValidator } from '../helpers/passwordValidator';
import { usernameValidator } from '../helpers/usernameValidator'
import { RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import styles from '../style/style'

export default SetAccount = () => {
    const [account, setAccount] = useState({ email: '', phone: '', full_name: '', password: '', retypePass: '', role: '' });
    let [error, setError] = useState({ username: false, password: false, retypePass: false });
    const onSubmitPress = (e) => {
        e.preventDefault();
        setError({ username: usernameValidator(account.username), password: passwordValidator(account.password), retypePass: retypePassValidator(account.password, account.retypePass) })
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <View style={styles.headerView}>
                <Text style={styles.headerText}>Thêm tài khoản</Text>
            </View>
            <View>

            </View>


            {/* <View style={styles.inputView}>
                <TextInput
                    style={[{ marginBottom: 8 }, styles.input, { borderColor: !error.username ? '#E9EEF4' : "#ED557A" }]}
                    placeholder="Tên đăng nhập"
                    onChangeText={text => {
                        setAccount({ ...account, username: text })
                    }}
                />
                <Text style={{ color: "#ED557A", paddingLeft: 10 }}>{!error.username ? null : error.username}</Text>
       
              <TextInput
                    style={[{ marginTop: 8 }, styles.input, { borderColor: !error.password ? '#E9EEF4' : "#ED557A" }]}
                    placeholder="Mật khẩu"
                    secureTextEntry={true}
                    onChangeText={text => setAccount({ ...account, password: text })}
                />
                <Text style={{ color: "#ED557A", paddingLeft: 10 }}>{!error.password ? null : error.password}</Text>
                <TextInput
                    style={[{ marginTop: 8 }, styles.input, { borderColor: !error.password ? '#E9EEF4' : "#ED557A" }]}
                    placeholder="Nhập lại mật khẩu"
                    secureTextEntry={true}
                    onChangeText={text => setAccount({ ...account, retypePass: text })}
                /> 
       
                <Text style={{ color: "#ED557A", paddingLeft: 10 }}>{!error.retypePass ? null : error.retypePass}</Text>
                <RadioButton.Group
                    onValueChange={value => setAccount({ ...account, role: value })}
                    value={account.role}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                        <Text style={{ width: 50 }}>Loại tài khoản</Text>

                        <View stye={styles.radioButton}>
                            <Text >Sinh viên</Text>
                            <RadioButton
                                value="SV"
                            />
                        </View>
                        <View stye={styles.radioButton}>
                            <Text >Giảng viên</Text>
                            <RadioButton value="GV" />
                        </View>
                        <View stye={styles.radioButton}>
                            <Text >Admin</Text>
                            <RadioButton value="AD" />
                        </View>
                    </View>
                </RadioButton.Group>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }} >
                    <Text style={{ width: 50 }}>Khoa</Text>
                    <Picker
                        style={{ width: "80%" }}
                        selectedValue={khoa}
                        onValueChange={(item, index) => {
                            setKhoa(item);
                        }}
                    >

                        <Picker.Item label="TMDT" value="TMDT" />
                        <Picker.Item label="HTTT" value="HTTT" />
                    </Picker>
                </View>
            </View> */}
            <Button
                style={styles.button}
                title="Thêm tài khoản"
                onPress={onSubmitPress}
            />

        </KeyboardAvoidingView >

    )
}
