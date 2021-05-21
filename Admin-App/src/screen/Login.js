import React, { useState } from 'react'
import { Text, View, ScrollView, TextInput, Button, ToastAndroid, Platform, TouchableOpacity } from 'react-native'
import HeaderText from '../components/HeaderText'
import Toast from 'react-native-toast-message';


import styles from '../style/style'

export default Login = ({ token, setToken }) => {
    const [account, setAccount] = useState({ phone: '', password: '' })
    let [error, setError] = useState({ phone: '', password: '' });
    const showToast = (message) => {
        ToastAndroid.showWithGravityAndOffset(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 90)
    }
    const onLoginPress = async (e) => {
        e.preventDefault();


        await fetch('http://quocha.xyz/auth/admin/sign-in', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone: account.phone,
                password: account.password
            })
        }).then(res => res.json())
            .then(res => {
                if (res.error == 4000) return setError(res.messages);
                if (res.error == 7000) return setError({ messages: 'Tài khoản hoặc mật khẩu không chính xác' })
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Đăng nhập thành công',
                    visibilityTime: 2000,
                    autoHide: true,
                })
                return setTimeout(() => setToken(res.data.token), 1000)
            })

    }

    return (
        <View style={{ flex: 1 }}>

            <HeaderText>Đăng nhập</HeaderText>
            <ScrollView style={{ marginTop: 100 }}>
                <View style={styles.container}>
                    <View style={[styles.inputView, { marginBottom: 50 }]}>
                        <TextInput
                            style={[styles.input, error.phone ? styles.borderErr : null]}
                            placeholder="Tên đăng nhập"
                            onChangeText={text => {
                                setAccount({ ...account, phone: text })
                            }}
                        />
                        {!error.phone ? null : <Text style={styles.textErr}>{error.phone}</Text>}
                        <TextInput
                            style={[styles.input, error.password ? styles.borderErr : null]}
                            placeholder="Mật khẩu"
                            secureTextEntry={true}
                            onChangeText={text => setAccount({ ...account, password: text })}
                        />
                        {!error.password ? null : <Text style={styles.textErr}>{error.password}</Text>}
                        {!error.messages ? null : <Text style={styles.textErr}>{error.messages}</Text>}
                    </View>
                    {/* <Button
                        title="Đăng nhập"
                        onPress={onLoginPress} messages
                    /> */}
                    <View>
                        <TouchableOpacity
                            style={{ backgroundColor: '#0598FC', height: 40, alignItems: 'center', width: 150, borderRadius: 30, elevation: 5, paddingVertical: 5 }}
                            onPress={onLoginPress}
                        >
                            <Text style={{ fontFamily: 'Inter', fontSize: 20, color: '#FFFFFF' }}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                </View >
            </ScrollView>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </View >
    )
}
