/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {__init_push} from './src/utils/utils';

__init_push();
AppRegistry.registerComponent(appName, () => App);
