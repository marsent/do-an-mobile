import React, { useState } from 'react'
import { TouchableOpacity, KeyboardAvoidingView, Text, View, ScrollView, TextInput, Button } from 'react-native'
import { usernameValidator, passwordValidator, retypePassValidator } from '../helpers/validator'


import styles from '../style/style'

export default Login = ({ token, setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let [error, setError] = useState({ username: false, password: false });
    const onLoginPress = (e) => {
        e.preventDefault();
        setError({ username: usernameValidator(username), password: passwordValidator(password) })
        setToken('3')
    }

    return (
        <View style={{ flex: 1 }}>

            <View style={[styles.headerView, { marginBottom: 120 }]}>
                <Text style={styles.headerText}>Đăng nhập</Text>
            </View>
            <ScrollView>
                <View style={styles.container}>
                    <View style={[styles.inputView, { marginBottom: 50 }]}>
                        <TextInput
                            style={[styles.input, !error.username ? null : styles.borderErr]}
                            placeholder="Tên đăng nhập"
                            onChangeText={text => {
                                setAccount({ ...account, username: text })
                            }}
                        />
                        {!error.username ? null : <Text style={styles.textErr}>{!error.username ? null : error.username}</Text>}
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
