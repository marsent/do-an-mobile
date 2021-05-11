/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import ListClass from './src/components/ClassManagement/listClass';
import SetAccount from './src/components/SetAccount/index';
import listStudent from './src/components/ClassManagement/listStudent';
import information from './src/components/ClassManagement/informationOfStudent';
import listNoti from './src/components/createNotification/listNoti';
import createNotification from './src/components/createNotification/createNotification';
AppRegistry.registerComponent(appName, () => createNotification);
