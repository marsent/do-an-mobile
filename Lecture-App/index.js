/**
 * @format
 */
import listStudent from './src/components/ClassManagement/listStudent';

import listNoti from './src/components/createNotification/listNoti';
import createNotification from './src/components/createNotification/createNotification';
import ListNoti from './src/components/createNotification/listNoti';
import {Provider as PaperProvider} from 'react-native-paper';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import information from './src/components/ClassManagement/informationOfStudent';
import {StackNavigation} from 'react-navigation';
import Login from './src/components/Login';
import detail from './src/components/accountDetail';
AppRegistry.registerComponent(appName, () => App);
