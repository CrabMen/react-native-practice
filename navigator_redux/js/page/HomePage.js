import React, {PureComponent} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import DynamicTabNavigator from '../navigator/DynamicTabNavigator';
import NavigationUtil from '../navigator/NavigationUtil';

class HomePage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  // _tabNavigator() {
  //   return createAppContainer(createBottomTabNavigator({}));
  // }

  MaterialIcons;

  render() {
    // const {navigation} = this.props;
    // const Tab = this._tabNavigator();
    NavigationUtil.navigation = this.props.navigation;
    return <DynamicTabNavigator />;
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'white',
  },
});

export default HomePage;
