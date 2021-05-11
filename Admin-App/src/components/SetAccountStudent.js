import React, { useState } from 'react'
import { KeyboardAvoidingView, View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { passwordValidator, retypePassValidator } from '../helpers/passwordValidator';
import { usernameValidator } from '../helpers/usernameValidator'
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from '../style/style';
export default SetAccountStudent = () => {
    const year = new Date().getFullYear()
    const yearList = [];
    for (let i = year - 10; i <= year; i++) yearList.push(i);
}
