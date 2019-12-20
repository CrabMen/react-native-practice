/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './js/App';
import {name as appName} from './app.json';
import AppNavigator from './js/Navigator/AppNavigator';
import WelcomePage from './js/page/WelcomePage';
AppRegistry.registerComponent(appName, () => App);
