import React, { useState } from 'react'
import { TouchableOpacity, KeyboardAvoidingView, Text, View, ScrollView, TextInput, Button } from 'react-native'
import { phoneValidator, passwordValidator, numberValidator } from '../helpers/validator'
import HeaderText from '../components/HeaderText'


import styles from '../style/style'

export default Login = ({ token, setToken }) => {
    const [account, setAccount] = useState({ phone: '', password: '' })
    let [error, setError] = useState({ phone: false, password: false });
    const onLoginPress = async (e) => {
        e.preventDefault();

        setError({ phone: numberValidator(account.phone), password: passwordValidator(account.password) })
        if (!error.phone && !error.password) {
            const data = await fetch('http://quocha.xyz/auth/admin/sign-in', {
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
                .then(res => res.data.token)
            setToken(data)
        }
    }

    return (
        <View style={{ flex: 1 }}>

            <HeaderText>Đăng nhập</HeaderText>
            <ScrollView>
                <View style={styles.container}>
                    <View style={[styles.inputView, { marginBottom: 50 }]}>
                        <TextInput
                            style={[styles.input, !error.phone ? null : styles.borderErr]}
                            placeholder="Tên đăng nhập"
                            onChangeText={text => {
                                setAccount({ ...account, phone: text })
                            }}
                        />
                        {!error.phone ? null : <Text style={styles.textErr}>{!error.phone ? null : error.phone}</Text>}
                        <TextInput
                            style={[styles.input, !error.password ? null : styles.borderErr]}
                            placeholder="Mật khẩu"
                            secureTextEntry={true}
                            onChangeText={text => setAccount({ ...account, password: text })}
                        />
                        {!error.password ? null : <Text style={styles.textErr}>{!error.password ? null : error.password}</Text>}
                    </View>
                    <Button
                        style={styles.button}
                        title="Đăng nhập"
                        onPress={onLoginPress}
                    />
                    <TouchableOpacity style={{ marginTop: 10 }}>
                        <Text style={{ color: "#067EFC" }}>Quên mật khẩu?</Text>
                    </TouchableOpacity>
                </View >
            </ScrollView>
        </View >
    )
}
