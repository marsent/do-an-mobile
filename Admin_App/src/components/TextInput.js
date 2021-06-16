import React, { useState } from 'react';

import { View, TextInput as TextInputBase } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'

import styles from '../style/style'
import { errorColor, mainBlack, mainBlue } from '../style/color'
import Text from './Text'
const TextInput = ({ placeholder, onChangeText, errorMessage = false, value, leftIcon = false, style, outlineColor = '#999999', outLine = false, focusColor = mainBlue, isFocus = false, type = 'outline', editable = true, multiline = false, }) => {
    const [hasFocus, setHasForcus] = useState(false)

    if (type == 'flat') {
        return (
            <View >
                <View style={[{ flexDirection: 'row', alignItems: 'center', borderBottomColor: outlineColor, borderBottomWidth: outLine ? 2 : 0 }, style, !errorMessage ? null : { borderBottomColor: errorColor },]}>
                    {leftIcon && <View style={{ marginLeft: 15 }}>
                        <Icon name={leftIcon} size={24} color={errorMessage ? "#ED557A" : '#999999'} />
                    </View>
                    }
                    <TextInputBase
                        multiline={multiline}
                        style={[{ flex: 1, marginLeft: 10, fontFamily: 'Inter', fontSize: 16, color: mainBlack }]}
                        placeholder={placeholder}
                        value={value}
                        onChangeText={onChangeText}
                        editable={editable}
                    />
                </View>
                {errorMessage && <Text size={14} style={styles.textErr}>{errorMessage}</Text>}
            </View>
        )
    }

    return (
        <View >
            <View style={[{ flexDirection: 'row', alignItems: 'center', borderRadius: 30, elevation: 1, borderColor: hasFocus ? focusColor : outlineColor, borderWidth: outLine ? 1 : 0, }, style, !errorMessage ? null : styles.borderErr,]}>
                {leftIcon && <View style={{ marginLeft: 15 }}>
                    <Icon name={leftIcon} size={24} color={errorMessage ? "#ED557A" : '#999999'} />
                </View>}
                <TextInputBase
                    multiline={multiline}
                    style={[{ flex: 1, marginLeft: 10, fontFamily: 'Inter', fontSize: 16 }]}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    editable={editable}
                    onFocus={() => {
                        if (isFocus) {
                            setHasForcus(true)
                        }
                    }}
                    onBlur={() => {
                        if (isFocus) {
                            setHasForcus(false)
                        }
                    }}
                />
            </View>
            {errorMessage && <Text size={14} style={styles.textErr}>{errorMessage}</Text>}
        </View>
    );
};

export default TextInput