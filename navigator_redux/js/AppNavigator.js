import React, {PureComponent} from 'react';
import {Text} from 'react-native';
import PropTypes from 'prop-types';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons';

import MineScreen from './MineScreen';
import HomeScreen from './HomeScreen';

export const BottomTabNavigator = createBottomTabNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: '首页',
        tabBarIcon: ({tintColor, focused}) => (
          <Ionicons
            name={'ios-home'}
            size={26}
            style={{color: focused ? 'blue' : 'gray'}}
          />
        ),
      },
    },
    MineScreen: {
      screen: MineScreen,
      navigationOptions: {
        tabBarLabel: '我的',
        tabBarIcon: ({tintColor, focused}) => (
          <Ionicons
            name={'ios-people'}
            size={26}
            style={{color: focused ? 'blue' : 'gray'}}
          />
        ),
      },
    },
  },
  {tabBarOptions: {activeTintColor: 'red', inactiveTintColor: 'gray'}},
);

export const AppNavigator = createStackNavigator(
  {
    BottomTabNavigator: {
      screen: BottomTabNavigator,
      navigationOptions: {
        title: '底部导航器',
        header: null,
      },
    },
    HomeScreen: {screen: HomeScreen},
    MineScreen: {screen: MineScreen},
  },
  {
    initialRouteName: 'BottomTabNavigator',
  },
);
