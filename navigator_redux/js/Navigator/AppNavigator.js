import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MinePage from '../page/MinePage';
import HomePage from '../page/HomePage';
import WelcomePage from '../page/WelcomePage';
import DetailPage from '../page/DetailPage';
import FetchDemoPage from '../page/FetchDemoPage';
import AsynStorageDemoPage from '../page/AsynStorageDemoPage';
import DataStoreDemoPage from '../page/DataStoreDemoPage';
import WebViewPage from '../page/WebViewPage';
import AboutPage from '../page/about/AboutPage';
import AboutMePage from '../page/about/AboutMePage';

const InitNavigator = createStackNavigator({
  WelcomePage: {
    screen: WelcomePage,
    navigationOptions: {
      title: '欢迎页面',
      header: null,
    },
  },
});

const MainNavigator = createStackNavigator({
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      title: '首页',
      header: null,
    },
  },

  DetailPage: {
    screen: DetailPage,
    navigationOptions: {
        header: null,// 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
    }
},
  FetchDemoPage:FetchDemoPage,
  WebViewPage :{
    screen:WebViewPage,
    navigationOptions: {
      header: null,
    },
  },
  AboutPage :{
    screen:AboutPage,
    navigationOptions: {
      header: null,
    },
  },
  AboutMePage :{
    screen:AboutMePage,
    navigationOptions: {
      header: null,
    },
  },
  AsynStorageDemoPage: AsynStorageDemoPage,
  DataStoreDemoPage: DataStoreDemoPage,

});

export default createAppContainer(
  createSwitchNavigator(
    {
      Init: InitNavigator,
      Main: MainNavigator,
    },
    {
      navigationOptions: {
        header: null,
      },
    },
  ),
);
