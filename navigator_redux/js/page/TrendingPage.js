import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  RefreshControl,
  Button,
  TouchableOpacity,
  DeviceInfo,
  DeviceEventEmitter,
} from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, ThemeColors } from 'react-navigation';
import { connect } from 'react-redux';
import actions from '../action';
import TrendingItem from '../common/TrendingItem';
import Toast from 'react-native-easy-toast';
import NavigationBar from '../common/NavigationBar';
import TrendingDialog, { TimeSpans } from '../common/TrendingDialog';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FavoriteDAO from '../expand/FavoriteDAO';
import { FLAG_STORAGE } from '../expand/DataStore';
import EventBus from 'react-native-event-bus';
import EventTypes from '../util/EventTypes';
import NavigationUtil from '../navigator/NavigationUtil';
import FavoriteUtil from '../util/FavoriteUtil';
import { FLAG_LANGUAGE } from '../expand/LanguageDao';

const URL = 'https://github.com/trending/';
const QUERY_STR = '&sort=stars';
const THEME_COLOR = '#678';

const EVENT_TYPE_TIME_SPAN_CHANGE = 'EVENT_TYPE_TIME_SPAN_CHANGE';
const favoriteDao = new FavoriteDAO(FLAG_STORAGE.flag_trending);

class TrendingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeSpan: TimeSpans[0],
    };
    const { onLoadLanguage } = this.props;
    onLoadLanguage(FLAG_LANGUAGE.flag_language);
    this.preKeys = [];
  }
  _generateTabs() {
    const tabs = {};
    const { keys, theme } = this.props;
    this.preKeys = keys
    keys.forEach((item, index) => {
      if (item.checked) {
        tabs[`tab${index}`] = {
          screen: props => (
            <TrendingTabPage
              {...props}
              timeSpan={this.state.timeSpan}
              tabLabel={item.name}
              theme={theme}
            />
          ),
          navigationOptions: {
            title: item.name,
          },
        };
      }

    });

    return tabs;
  }
  renderTrendingDialog() {
    return (
      <TrendingDialog
        ref={dialog => (this.dialog = dialog)}
        onSelect={tab => this.onSelectTimeSpan(tab)}
      />
    );
  }

  onSelectTimeSpan(tab) {
    this.dialog.dismiss();
    this.setState({
      timeSpan: tab,
    });
    DeviceEventEmitter.emit(EVENT_TYPE_TIME_SPAN_CHANGE, tab);
  }

  _renderTitleView() {
    return (
      <View>
        <TouchableOpacity
          underlayColor="transparent"
          onPress={() => this.dialog.show()}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 18,
                color: '#FFFFFF',
                fontWeight: '400',
              }}>
              趋势 {this.state.timeSpan.showText}
            </Text>
            <MaterialIcons
              name={'arrow-drop-down'}
              size={22}
              style={{ color: 'white' }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  _tabNav() {
    const { theme } = this.props;
    if (!this.tabNav) {
      this.tabNav = createAppContainer(
        createMaterialTopTabNavigator(this._generateTabs(), {
          tabBarOptions: {
            tabStyle: styles.tabStyle,
            upperCaseLabel: false,
            scrollEnabled: true,
            style: {
              backgroundColor: theme.themeColor,
              // height:40
            },
            indicatorStyle: styles.indicatorStyle,
            labelStyle: styles.labelStyle,
          },
        }),
      );
    }
    return this.tabNav;
  }

  render() {
    const { keys, theme } = this.props;

    let statusBar = {
      backgroundColor: theme.themeColor,
      barStyle: 'light-content',
    };
    let navigationBar = (
      <NavigationBar
        // title={'趋势'}
        titleView={this._renderTitleView()}
        statusBar={statusBar}
        style={theme.styles.navBar}
      />
    );
    const TopTabNavigator = keys.length ? this._tabNav() : null; return (
      <View style={styles.container}>
        {navigationBar}
        {TopTabNavigator && <TopTabNavigator />}
        {this.renderTrendingDialog()}
      </View>
    );
  }
}


const mapTrendingStateToProps = state => ({
  keys: state.language.languages,
  theme: state.theme.theme,
});
const mapTrendingDispatchToProps = dispatch => ({
  onLoadLanguage: (flag) => dispatch(actions.onLoadLanguage(flag))
});
//注意：connect只是个function，并不应定非要放在export后面
export default connect(mapTrendingStateToProps, mapTrendingDispatchToProps)(TrendingPage);

const pageSize = 10; //设为常量，防止修改
class TrendingTab extends Component {
  constructor(props) {
    super(props);
    const { timeSpan, tabLabel } = this.props;
    // this.tabNames = ['PHP'];
    this.timeSpan = timeSpan;
    this.storeName = tabLabel;
    this.isFavoriteChanged = false;
  }

  componentDidMount() {
    this.loadData();
    this.timeSpanChangeListener = DeviceEventEmitter.addListener(
      EVENT_TYPE_TIME_SPAN_CHANGE,
      timeSpan => {
        this.timeSpan = timeSpan;
        this.loadData();
      },
    );
    EventBus.getInstance().addListener(
      EventTypes.favoriteChanged_trending,
      (this.favoriteChangeListener = () => {
        this.isFavoriteChanged = true;
      }),
    );
    EventBus.getInstance().addListener(
      EventTypes.bottom_tab_select,
      (this.bottomTabSelectListener = data => {
        if (data.to === 1 && this.isFavoriteChanged) {
          this.loadData(null, true);
        }
      }),
    );
  }

  componentWillUnmount() {
    if (this.timeSpanChangeListener) {
      this.timeSpanChangeListener.remove();
    }
  }

  loadData(loadMore, refreshFavorite) {
    const {
      onRefreshTrending,
      onLoadMoreTrending,
      onFlushTrendingFavorite,
    } = this.props;
    const store = this._store();
    const url = this.generateFetchUrl(this.storeName);
    if (loadMore) {
      onLoadMoreTrending(
        this.storeName,
        ++store.pageIndex,
        pageSize,
        store.items,
        favoriteDao,
        callback => {
          this.refs.toast.show('没有更多了');
        },
      );
    } else if (refreshFavorite) {
      onFlushTrendingFavorite(
        this.storeName,
        store.pageIndex,
        pageSize,
        store.items,
        favoriteDao,
      );
      this.isFavoriteChanged = false;
    } else {
      onRefreshTrending(this.storeName, url, pageSize, favoriteDao);
    }
  }

  _store() {
    const { trending } = this.props;
    let store = trending[this.storeName];
    if (!store) {
      store = {
        items: [],
        isLoading: false,
        projectModels: [], //要显示的数据
        hideLoadingMore: true, //默认隐藏加载更多
      };
    }
    return store;
  }

  generateFetchUrl(key) {
    // return URL + key + '?since=daily';
    return `${URL}${key}?${this.timeSpan.searchText}`;
  }

  genIndicator() {
    return this._store().hideLoadingMore ? null : (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator style={styles.indicator} />
        <Text>正在加载更多</Text>
      </View>
    );
  }

  renderItem(data) {
    const item = data.item;
    const { theme } = this.props;

    return (
      <TrendingItem
        theme={theme}
        projectModel={item}
        onSelect={(callback) => {
          NavigationUtil.goPage(
            {
              theme,
              projectModel: item,
              flag: FLAG_STORAGE.flag_trending,
              callback,
            },
            'DetailPage',
          );
        }}
        onFavorite={(item, isFavorite) => FavoriteUtil.onFavorite(favoriteDao, item, isFavorite, FLAG_STORAGE.flag_trending)}
      />
    );
  }

  render() {
    let store = this._store();
    const {theme} = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          data={store.projectModels}
          renderItem={data => this.renderItem(data)}
          keyExtractor={item => '' + item.id || item.fullName}
          refreshControl={
            <RefreshControl
              title={'Loading'}
              titleColor={theme.themeColor}
              colors={[theme.themeColor]}
              refreshing={store.isLoading}
              onRefresh={() => this.loadData()}
              tintColor={theme.themeColor}
              ListFooterComponent={() => this.genIndicator()}
            />
          }
          ListFooterComponent={() => this.genIndicator()}
          onEndReached={() => {
            console.log('---onEndReached----');
            setTimeout(() => {
              if (this.canLoadMore) {
                //fix 滚动时两次调用onEndReached https://github.com/facebook/react-native/issues/14015
                this.loadData(true);
                this.canLoadMore = false;
              }
            }, 100);
          }}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => {
            this.canLoadMore = true; //fix 初始化时页调用onEndReached的问题
            console.log('---onMomentumScrollBegin-----');
          }}
        />
        <Toast ref={'toast'} position={'center'} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  trending: state.trending,
});
const mapDispatchToProps = dispatch => ({
  onRefreshTrending: (storeName, url, pageSize, favoriteDao) =>
    dispatch(actions.onRefreshTrending(storeName, url, pageSize, favoriteDao)),
  onLoadMoreTrending: (
    storeName,
    pageIndex,
    pageSize,
    items,
    favoriteDao,
    callBack,
  ) =>
    dispatch(
      actions.onLoadMoreTrending(
        storeName,
        pageIndex,
        pageSize,
        items,
        favoriteDao,
        callBack,
      ),
    ),
  onFlushTrendingFavorite: (
    storeName,
    pageIndex,
    pageSize,
    items,
    favoriteDao,
  ) =>
    dispatch(
      actions.onFlushTrendingFavorite(
        storeName,
        pageIndex,
        pageSize,
        items,
        favoriteDao,
      ),
    ),
});
const TrendingTabPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrendingTab);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: DeviceInfo.isPhoneX_deprecated ? 30 : 0,
    // justifyContent: 'center',
    // alignItems: 'center',
  },

  tabStyle: {
    // minWidth: 50,// fix minWidth 会导致tabStyle初次加载时闪烁s
    padding: 0,
  },

  indicatorStyle: {
    height: 2,
    backgroundColor: 'white',
  },

  labelStyle: {
    fontSize: 13,
    // marginTop: 6,
    // marginBottom: 6,
    margin: 0,
  },
  indicatorContainer: {
    alignItems: 'center',
  },
  indicator: {
    color: 'red',
    margin: 10,
  },
});
