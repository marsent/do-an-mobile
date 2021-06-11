import React, { useState } from 'react'
import { View, ToastAndroid, Image } from 'react-native'
import HeaderText from '../../components/HeaderText'
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome5';

import LoadingModal from '../../components/LoadingModal';
import { authUrl } from '../../config/config'
import styles from '../../style/style'
import Button from '../../components/Button'
import { TextInput, Password } from '../../components/TextInput'
import Text from '../../components/Text'
const img = require('../../../assets/public/img/online-course.png')
export default Login = ({ token, setToken }) => {
    const [account, setAccount] = useState({ phone: '', password: '' })
    let [error, setError] = useState({ phone: false, password: false });
    const [isLoading, SetIsLoading] = useState(false);

    const showToast = (message) => {
        ToastAndroid.showWithGravityAndOffset(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 90)
    }
    const onLoginPress = async () => {
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
                    setError({ phone: false, password: false })
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
            <LoadingModal isVisible={isLoading} />
            <View style={{ height: '40%', borderBottomLeftRadius: 120, backgroundColor: '#0598FC', justifyContent: 'space-around', alignItems: 'center' }}>
                <Icon name='user-cog' size={56} color='#FFFFFF' />
                {/* <Text size={} color='#FFFFFF'>Đăng nhập</Text> */}
            </View>
            <View style={{ flex: 1, marginTop: 50 }}>
                <View style={styles.container}>
                    <View style={{ width: '85%', marginBottom: 20 }}>

                        <TextInput
                            style={{ marginBottom: 10 }}
                            placeholder='Tên đăng nhập'
                            value={account.phone}
                            onChangeText={val => setAccount({ ...account, phone: val })}
                            leftIcon='user'
                            errorMessage={error.phone}
                        />

                        <Password
                            style={{ marginTop: 10 }}
                            value={account.password}
                            onChangeText={val => setAccount({ ...account, password: val })}
                            errorMessage={error.password}
                        />
                        {error.messages && <Text size={14} style={styles.textErr}>{error.messages}</Text>}
                    </View>
                    <Button onPress={() => onLoginPress()}>Đăng nhập</Button>

                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Text >Ứng dụng quản lý học vụ</Text>
                        <Text size={12}> Admin v1.0</Text>
                    </View>
                </View >
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </View >
    )
}
