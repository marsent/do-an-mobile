import React from 'react';
import { TouchableOpacity, Text } from 'react-native'

import styles from '../style/style'

const Button = () => {
    return (
        <TouchableOpacity
            style={{ backgroundColor: '#0598FC', height: 40, alignItems: 'center', width: 170, borderRadius: 30, elevation: 5, paddingVertical: 5 }}
            onPress={onSubmitPress}
        >
            <Text style={{ fontFamily: 'Inter', fontSize: 18, color: '#FFFFFF' }}>Thêm tài khoản</Text>
        </TouchableOpacity>
    );
};

export default Button;