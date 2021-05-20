import React from 'react';
import { Text } from 'react-native'
const TextCustom = ({ children }) => {
    return (
        <Text style={{ fontFamily: 'Inter', fontSize: 16 }}>
            {children}
        </Text>
    );
};

export default TextCustom;