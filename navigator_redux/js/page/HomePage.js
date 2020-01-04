import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, NavigationActions } from 'react-navigation';
import DynamicTabNavigator from '../navigator/DynamicTabNavigator';
import NavigationUtil from '../navigator/NavigationUtil';
import BackPressComponent from '../common/BackPressComponent';

class HomePage extends PureComponent {
  constructor(props) {
    super(props);

    // this.backPress = new BackPressComponent({ backPress: this.onBackPress() })
  }

  // _tabNavigator() {
  //   return createAppContainer(createBottomTabNavigator({}));
  // }

  componentDidMount() {
    // this.backPress.componentDidMount()
  }

  componentWillUnmount() {
    // this.backPress.componentWillUnmount();
  }

   /**
     * 处理 Android 中的物理返回键
     * https://reactnavigation.org/docs/en/redux-integration.html#handling-the-hardware-back-button-in-android
     * @returns {boolean}
     */
  //   onBackPress = () => {
  //     const {dispatch, nav} = this.props;
  //     // if (nav.index === 0) {
  //     if (nav.routes[1].index === 0) {//如果RootNavigator中的MainNavigator的index为0，则不处理返回事件
  //         return false;
  //     }
  //     dispatch(NavigationActions.back());
  //     return true;
  // }

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
