import React, { Children } from 'react'
import { View, Text } from 'react-native';

import styles from '../style/style'

export default HeaderText = ({ children }) => {
    return (<View style={[styles.headerView, { marginBottom: 100 }]}>
        <Text style={styles.headerText}>{children}</Text>
    </View>)
}