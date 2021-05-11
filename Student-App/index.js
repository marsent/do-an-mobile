/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import TimeTable from './src/components/TimeTable'
import Notification from './src/components/Notification'
import OnlineExam from './src/components/OnlineExam'
import AccountDetail from './src/components/accountDetail'
AppRegistry.registerComponent(appName, () => AccountDetail);
