/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import ListClass from './src/components/ClassManagement/listClass';
AppRegistry.registerComponent(appName, () => ListClass);
