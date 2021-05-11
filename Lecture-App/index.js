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
AppRegistry.registerComponent(appName, () => information);
