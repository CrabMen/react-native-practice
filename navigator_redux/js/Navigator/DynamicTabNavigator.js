import React, { PureComponent } from 'react';
import PopularPage from './../page/PopularPage';
import TrendingPage from './../page/TrendingPage';
import MinePage from './../page/MinePage';
import FavoritePage from './../page/FavoritePage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import { connect } from 'react-redux';
import { DeviceInfo } from 'react-native';
import action from '../action';
import EventBus from 'react-native-event-bus';
import EventTypes from '../util/EventTypes';
const TABS = {
  PopularPage: {
    screen: PopularPage,
    navigationOptions: {
      tabBarLabel: '最热',
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialIcons name={'whatshot'} size={26} style={{ color: tintColor }} />
      ),
    },
  },
  TrendingPage: {
    screen: TrendingPage,
    navigationOptions: {
      tabBarLabel: '趋势',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={'md-trending-up'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    },
  },

  FavoritePage: {
    screen: FavoritePage,
    navigationOptions: {
      tabBarLabel: '收藏',
      tabBarIcon: ({ tintColor, focused }) => (
        <MaterialIcons name={'favorite'} size={26} style={{ color: tintColor }} />
      ),
    },
  },

  MinePage: {
    screen: MinePage,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarIcon: ({ tintColor, focused }) => (
        <Entypo name={'user'} size={26} style={{ color: tintColor }} />
      ),
    },
  },
};

class DynamicTabNavigator extends React.Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }
  _tabNavigator() {
    if (this.tabs) { return this.tabs }
    const { PopularPage, TrendingPage, FavoritePage, MinePage } = TABS;
    const tabs = { PopularPage, TrendingPage, FavoritePage, MinePage }; //根据需要定制显示的tab
    PopularPage.navigationOptions.tabBarLabel = '最热'; //动态配置Tab属性

    return this.tabs = createAppContainer(
      createBottomTabNavigator(tabs, {
        // tabBarComponent: TabBarComponent,
        tabBarComponent: props => {
          return <TabBarComponent  {...props} theme={this.props.theme} />
        }
      }),
    );
  }

  render() {
    const Tab = this._tabNavigator();
    return <Tab
      onNavigationStateChange={(prevState, newState, action) => {
        EventBus.getInstance().fireEvent(EventTypes.bottom_tab_select, {
          //发送底部tab切换的事件
          from: prevState.index,
          to: newState.index,
        }
        )
      }}
    />;
  }
}

class TabBarComponent extends React.Component {
  constructor(props) {
    super(props);
    // this.theme = {
    //   tintColor: props.activeTintColor,
    //   updateTime: new Date().getTime(),
    // };
  }

  render() {
    // const {routes, index} = this.props.navigation.state;
    // if (routes[index].params) {
    //   const {theme} = routes[index].params;
    //   //以最新的更新时间为主,防止被其他的tab覆盖
    //   if (theme && theme.updateTime > this.theme.updateTime) {
    //     this.theme = theme;
    //   }
    // }

    return (
      <BottomTabBar
        {...this.props}
        activeTintColor={this.props.theme.themeColor}
      />
    );
  }
}

const mapStateToProps = state => ({
  theme: state.theme.theme
});
export default connect(mapStateToProps)(DynamicTabNavigator)