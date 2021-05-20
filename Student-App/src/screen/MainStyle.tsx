
import Icon from 'react-native-vector-icons/Ionicons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import BubbleTabBar, {
  IBubbleTabConfig,
  IIconRenderer,
} from 'react-native-bubble-tabbar';

const tabs : IBubbleTabConfig[] = [
  {
    activeColor: '#cc0066',
    activeBackgroundColor: '#f76a8c',
    activeIcon: "calendar-outline",
  },
  {
    activeColor: '#ff6f5e',
    activeBackgroundColor: '#f8dc88',
    activeIcon: "person-circle-outline" ,
  },
  {
    activeColor: '#1eb2a6',
    activeBackgroundColor: '#ccf0e1',
    activeIcon: "notifications-outline",
  },
  {
    activeColor: '#4d80e4',
    activeBackgroundColor: '#9aceff',
    activeIcon: "person-circle-outline" ,
  },
];

const IconRenderer = ({ icon, color }: IIconRenderer) =>
  <Icon
    icon={icon}
    color={color}
    size={18}
  />;

const CustomTabBar = ({
  state, descriptors, navigation,
}) => {
  return (
    <BubbleTabBar
      state={state}
      descriptors={descriptors}
      navigation={navigation}
      tabs={tabs}
      iconRenderer={IconRenderer}
    />
  );
};