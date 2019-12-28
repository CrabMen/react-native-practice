/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './js/App';
import {name as appName} from './app.json';
import AppNavigator from './js/navigator/AppNavigator';
import WelcomePage from './js/page/WelcomePage';
AppRegistry.registerComponent(appName, () => App);
