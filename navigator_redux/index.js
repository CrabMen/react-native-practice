/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import AppNavigator from './js/Navigator/AppNavigator';
import WelcomePage from './js/page/WelcomePage';
AppRegistry.registerComponent(appName, () => AppNavigator);
