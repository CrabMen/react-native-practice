import React, {PureComponent} from 'react';
import PopularPage from './../page/PopularPage';
import TrendingPage from './../page/TrendingPage';
import MinePage from './../page/MinePage';
import FavoritePage from './../page/FavoritePage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';

const TABS = {
  PopularPage: {
    screen: PopularPage,
    navigationOptions: {
      tabBarLabel: '最热',
      tabBarIcon: ({tintColor, focused}) => (
        <MaterialIcons name={'whatshot'} size={26} style={{color: tintColor}} />
      ),
    },
  },
  FavoritePage: {
    screen: FavoritePage,
    navigationOptions: {
      tabBarLabel: '最爱',
      tabBarIcon: ({tintColor, focused}) => (
        <Ionicons
          name={'md-trending-up'}
          size={26}
          style={{color: tintColor}}
        />
      ),
    },
  },

  TrendingPage: {
    screen: TrendingPage,
    navigationOptions: {
      tabBarLabel: '收藏',
      tabBarIcon: ({tintColor, focused}) => (
        <MaterialIcons name={'favorite'} size={26} style={{color: tintColor}} />
      ),
    },
  },

  MinePage: {
    screen: MinePage,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarIcon: ({tintColor, focused}) => (
        <Entypo name={'user'} size={26} style={{color: tintColor}} />
      ),
    },
  },
};

export default class DynamicTabNavigator extends React.Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }
  _tabNavigator() {
    const {PopularPage, TrendingPage, FavoritePage, MinePage} = TABS;
    const tabs = {PopularPage, TrendingPage, FavoritePage, MinePage}; //根据需要定制显示的tab
    PopularPage.navigationOptions.tabBarLabel = '最热啊'; //动态配置Tab属性

    return createAppContainer(
      createBottomTabNavigator(tabs, {
        tabBarComponent: TabBarComponent,
      }),
    );
  }

  render() {
    const Tab = this._tabNavigator();

    return <Tab />;
  }
}

class TabBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.theme = {
      tintColor: props.activeTintColor,
      updateTime: new Date().getTime(),
    };
  }

  render() {
    const {routes, index} = this.props.navigation.state;
    if (routes[index].params) {
      const {theme} = routes[index].params;
      //以最新的更新时间为主,防止被其他的tab覆盖
      if (theme && theme.updateTime > this.theme.updateTime) {
        this.theme = theme;
      }
    }

    return (
      <BottomTabBar
        {...this.props}
        activeTintColor={this.theme.tintColor || this.props.activeTintColor}
      />
    );
  }
}
