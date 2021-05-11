import React, { useState } from 'react'
import { TouchableOpacity, KeyboardAvoidingView, Text, View, ScrollView, TextInput, Button } from 'react-native'
import { usernameValidator, passwordValidator, retypePassValidator } from '../helpers/validator'

import styles from '../style/style'

export default Login = ({ token, setToken }) => {
    const [account, setAccount] = useState({ username: '', password: '', retypePass: '' });

    let [error, setError] = useState({ username: false, password: false });
    const onSubmitPress = (e) => {
        e.preventDefault();
        setError({ username: usernameValidator(account.username), password: passwordValidator(account.password, 5), retypePass: retypePassValidator(account.password, account.retypePass) })
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={[styles.headerView, { marginBottom: 100 }]}>
                <Text style={styles.headerText}>Đặt lại mật khẩu</Text>
            </View>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.inputView}>
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
                        <TextInput
                            style={[styles.input, !error.retypePass ? null : styles.borderErr]}
                            placeholder="Nhập lại mật khẩu"
                            secureTextEntry={true}
                            onChangeText={text => setAccount({ ...account, retypePass: text })}
                        />
                        {!error.retypePass ? null : <Text style={styles.textErr}>{!error.retypePass ? null : error.retypePass}</Text>}
                    </View>

                    <Button
                        style={styles.button}
                        title="Đặt lại mật khẩu"
                        onPress={onSubmitPress}
                    />
                </View >
            </ScrollView>
        </View>
    )
}
