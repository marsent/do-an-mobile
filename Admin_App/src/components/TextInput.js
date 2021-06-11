import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, TextInput as TextInputBase } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

import styles from '../style/style'
import Text from './Text'
const TextInput = ({ placeholder, onChangeText, errorMessage = false, value, leftIcon = false, style }) => {
    return (
        <View style={style}>
            <View style={[{ flexDirection: 'row', alignItems: 'center', borderRadius: 30, elevation: 1, }, !errorMessage ? null : styles.borderErr]}>
                <View style={{ marginLeft: 15 }}>
                    {leftIcon && <Icon name={leftIcon} size={24} color={errorMessage ? "#ED557A" : '#999999'} />}
                </View>
                <TextInputBase
                    style={[{ flex: 1, marginLeft: 10, fontFamily: 'Inter', fontSize: 16 }]}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText} />
            </View>
            {errorMessage && <Text size={14} style={styles.textErr}>{errorMessage}</Text>}
        </View>
    );
};

const Password = ({ onChangeText, errorMessage = false, value, style }) => {
    const [showPassWord, setShowPassWord] = useState(false)
    return (
        <View style={style}>
            <View style={[{ flexDirection: 'row', alignItems: 'center', borderRadius: 30, elevation: 1 }, !errorMessage ? null : styles.borderErr]}>
                <View style={{ marginLeft: 15 }}>
                    <Icon name='lock' size={24} color={errorMessage ? "#ED557A" : '#999999'} />
                </View>
                <TextInputBase
                    style={[{ flex: 1, marginLeft: 10, fontFamily: 'Inter', fontSize: 16 },]}
                    placeholder='Mật khẩu'
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={!showPassWord}
                />
                <TouchableOpacity style={{ marginRight: 20 }}
                    onPress={() => setShowPassWord(!showPassWord)}
                >
                    <Text style={{ padding: 6 }} size={12} color='#999999'>{showPassWord ? 'Hide' : 'Show'}</Text>
                </TouchableOpacity>
            </View>
            { errorMessage && <Text size={14} style={[styles.textErr]}>{errorMessage}</Text>}
        </View >
    )
}

export { TextInput, Password };