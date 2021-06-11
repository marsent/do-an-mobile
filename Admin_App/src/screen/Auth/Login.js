import React, { useState } from 'react'
import { Text, View, TextInput, ToastAndroid, } from 'react-native'
import HeaderText from '../../components/HeaderText'
import Toast from 'react-native-toast-message';

import LoadingModal from '../../components/LoadingModal';
import { authUrl } from '../../config/config'
import styles from '../../style/style'
import Button from '../../components/Button'


export default Login = ({ token, setToken }) => {
    const [account, setAccount] = useState({ phone: '', password: '' })
    let [error, setError] = useState({ phone: '', password: '' });
    const [isLoading, SetIsLoading] = useState(false);

    const showToast = (message) => {
        ToastAndroid.showWithGravityAndOffset(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 90)
    }
    const onLoginPress = async (e) => {
        e.preventDefault();
        SetIsLoading(true)
        await setTimeout(async () => {
            await fetch(authUrl, {
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
                    SetIsLoading(false)
                    if (res.error == 4000) return setError(res.messages);
                    if (res.error == 7000) return setError({ messages: 'Tài khoản hoặc mật khẩu không chính xác' })
                    setError({ phone: '', password: '' })
                    Toast.show({
                        type: 'success',
                        position: 'top',
                        text1: 'Đăng nhập thành công',
                        visibilityTime: 2000,
                        autoHide: true,
                    })
                    return setTimeout(() => setToken(res.data.token), 1000)
                })
        }, 2000)

    }

    return (
        <View style={{ flex: 1 }}>

            <HeaderText haveBackButton={false}>Đăng nhập</HeaderText>
            <LoadingModal isVisible={isLoading} />
            <View style={{ flex: 1, marginTop: 100 }}>
                <View style={styles.container}>
                    <View style={[styles.inputView, { marginBottom: 50 }]}>
                        <TextInput
                            style={[styles.input, error.phone ? styles.borderErr : null, { marginBottom: 8 }]}
                            placeholder="Tên đăng nhập"
                            onChangeText={text => {
                                setAccount({ ...account, phone: text })
                            }}
                        />
                        {!error.phone ? null : <Text style={styles.textErr}>{error.phone}</Text>}
                        <TextInput
                            style={[styles.input, error.password ? styles.borderErr : null, { marginTop: 8 }]}
                            placeholder="Mật khẩu"
                            secureTextEntry={true}
                            onChangeText={text => setAccount({ ...account, password: text })}
                        />
                        {!error.password ? null : <Text style={styles.textErr}>{error.password}</Text>}
                        {!error.messages ? null : <Text style={styles.textErr}>{error.messages}</Text>}
                    </View>


                    <Button onPress={() => onLoginPress}>Đăng nhập</Button>
                </View >
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </View >
    )
}
