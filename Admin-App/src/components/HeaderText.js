import React, { Children } from 'react'
import { View, Text } from 'react-native';

import styles from '../style/style'

export default HeaderText = ({ children }) => {
    return (<View style={[styles.headerView,]}>
        <Text style={styles.headerText}>{children}</Text>
    </View>)
}