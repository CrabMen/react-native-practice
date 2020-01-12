import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, NavigationActions } from 'react-navigation';
import DynamicTabNavigator from '../navigator/DynamicTabNavigator';
import NavigationUtil from '../navigator/NavigationUtil';
import BackPressComponent from '../common/BackPressComponent';
import CustomTheme from '../page/CustomTheme';
import actions from "../action";
import { connect } from 'react-redux'

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
    AppState.addEventListener("change", (newState) => {
      newState === "active" && codePush.sync();
  });
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
  renderCustomThemeView() {
    const { customThemeViewVisible, onShowCustomThemeView } = this.props;
  
    return (<CustomTheme
      visible={customThemeViewVisible}
      {...this.props}
      onClose={() => onShowCustomThemeView(false)}
    />)
  }

  render() {
    // const {navigation} = this.props;
    // const Tab = this._tabNavigator();
    NavigationUtil.navigation = this.props.navigation;
    return <View style={{flex: 1}}>
      <DynamicTabNavigator />
      {this.renderCustomThemeView()}
    </View>


      ;
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'white',
  },
});

const mapStateToProps = state => ({
  nav: state.nav,
  customThemeViewVisible: state.theme.customThemeViewVisible,
});

const mapDispatchToProps = dispatch => ({
  onShowCustomThemeView: (show) => dispatch(actions.onShowCustomThemeView(show)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
// export default HomePage;
