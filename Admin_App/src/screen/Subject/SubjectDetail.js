import React from 'react';
import { SafeAreaView, View } from 'react-native';

import { mainWhite } from '../../style/color';

const SubjectDetail = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: mainWhite }}>
            <HeaderText navigation={navigation}>Chi tiết</HeaderText>

        </SafeAreaView>
    );
};

export default SubjectDetail;