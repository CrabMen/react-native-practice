import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, ActivityIndicator, RefreshControl, Button, DeviceInfo } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, ThemeColors } from 'react-navigation';
import { connect } from 'react-redux';
import actions from '../action';
import PopularItem from '../common/PopularItem';
import Toast from 'react-native-easy-toast'
import NavigationBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
import NavigationUtil from '../navigator/NavigationUtil';
import FavoriteDAO from '../expand/FavoriteDAO';
import { FLAG_STORAGE } from '../expand/DataStore';
import FavoriteUtil from '../util/FavoriteUtil';
import EventBus from 'react-native-event-bus';
import EventTypes from '../util/EventTypes';
import { FLAG_LANGUAGE } from '../expand/LanguageDao';


const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const THEME_COLOR = '#678';
const favoriteDao = new FavoriteDAO(FLAG_STORAGE.flag_popular)



class PopularPage extends Component {
  constructor(props) {
    super(props);

    const { onLoadLanguage } = this.props
    onLoadLanguage(FLAG_LANGUAGE.flag_key)


    // this.tabNames = [
    //   'Java',
    //   'PHP',
    //   '.Net',
    //   'iOS', 
    //   'Android',
    //   'HTML',
    //   'React-Native',
    // ];
    this.preKeys = [] //判断两次的key是否一致，不一致重新渲染
  }
  _generateTabs() {
    const tabs = {};
    const { keys } = this.props
    console.log('所有的标签'+JSON.stringify(keys))
    this.preKeys = keys
    keys.forEach((item, index) => {
      if (item.checked) {
        tabs[`tab${index}`] = {
          screen: props => <PopularTabPage {...props} tabLabel={item.name} />,
          navigationOptions: {
            title: item.name,
          },
        };
      }
    });

    return tabs;
  }

  render() {
    const { keys } = this.props
    let statusBar = {
      backgroundColor: THEME_COLOR,
      barStyle: 'light-content',
    };
    let navigationBar = <NavigationBar
      title={'最热'}
      statusBar={statusBar}
      style={{ backgroundColor: THEME_COLOR }}
    />;


    const TopTabNavigator = keys.length ? createAppContainer(
      createMaterialTopTabNavigator(this._generateTabs(), {
        tabBarOptions: {
          tabStyle: styles.tabStyle,
          upperCaseLabel: false,
          scrollEnabled: true,
          style: {
            backgroundColor: '#a67',
            // height: 40,//fix 开启scrollEnabled后在Android上初次加载时的闪烁问题
          },
          indicatorStyle: styles.indicatorStyle,
          labelStyle: styles.labelStyle,
        },
      }),
    ) : null;

    return (
      <View style={styles.container}>
        {navigationBar}
       {TopTabNavigator && <TopTabNavigator />}
      </View>
    );
  }
}


const mapPopularStateToProps = state => ({
  keys: state.language.keys
});
const mapPopularDispatchToProps = dispatch => ({
  onLoadLanguage: (flag) => dispatch(actions.onLoadLanguage(flag))
});
export default connect(mapPopularStateToProps, mapPopularDispatchToProps)(PopularPage)



const pageSize = 10;//设为常量，防止修改
class PopularTab extends Component {
  constructor(props) {
    super(props)
    const { tabLabel } = this.props
    this.storeName = tabLabel
    this.isFavoriteChanged = false
  }

  componentDidMount() {
    this.loadData()
    EventBus.getInstance().addListener(EventTypes.favorite_changed_popular, this.favoriteChangeListener = () => {
      this.isFavoriteChanged = true;
    });
    EventBus.getInstance().addListener(EventTypes.bottom_tab_select, this.bottomTabSelectListener = (data) => {
      if (data.to === 0 && this.isFavoriteChanged) {
        this.loadData(null, true);
      }
    })
  }

  componentWillUnmount() {
    EventBus.getInstance().removeListener(this.favoriteChangeListener);
    EventBus.getInstance().removeListener(this.bottomTabSelectListener);
  }

  loadData(loadMore, refreshFavorite) {
    const { onRefreshPopular, onLoadMorePopular, onFlushPopularFavorite } = this.props;
    const store = this._store();
    const url = this.generateFetchUrl(this.storeName);
    if (loadMore) {
      onLoadMorePopular(this.storeName, store.pageIndex, pageSize, store.items, favoriteDao, callback => {
        this.refs.toast.show('没有更多了');
      })
    } else if (refreshFavorite) {
      onFlushPopularFavorite(this.storeName, store.pageIndex, pageSize, store.items, favoriteDao)
      this.isFavoriteChanged = false;
    } else {
      onRefreshPopular(this.storeName, url, pageSize, favoriteDao)
    }
  }

  _store() {
    const { popular } = this.props;
    let store = popular[this.storeName];
    if (!store) {
      store = {
        items: [],
        isLoading: false,
        projectModels: [],//要显示的数据
        hideLoadingMore: true,//默认隐藏加载更多
      }
    }
    return store;
  }

  generateFetchUrl(key) {
    return `${URL}${key}${QUERY_STR}`
  }

  genIndicator() {
    return this._store().hideLoadingMore ? null :
      <View style={styles.indicatorContainer}>
        <ActivityIndicator
          style={styles.indicator}
        />
        <Text>正在加载更多</Text>
      </View>
  }

  renderItem(data) {
    const item = data.item;
    return <PopularItem
      projectModel={item}
      onSelect={(callback) => {
        NavigationUtil.goPage({
          projectModel: item,
          flag: FLAG_STORAGE.flag_popular,
          callback,
        }, 'DetailPage')
      }}
      onFavorite={(item, isFavorite) => FavoriteUtil.onFavorite(favoriteDao, item, isFavorite, FLAG_STORAGE.flag_popular)}
    />
  }

  render() {
    let store = this._store();

    return (
      <View style={styles.container}>
        <FlatList
          data={store.projectModels}
          renderItem={data => this.renderItem(data)}
          keyExtractor={item => `${item.item.id}`}
          refreshControl={
            <RefreshControl
              title={'Loading'}
              titleColor={THEME_COLOR}
              colors={[THEME_COLOR]}
              refreshing={store.isLoading}
              onRefresh={() => this.loadData()}
              tintColor={THEME_COLOR}
              ListFooterComponent={() => this.genIndicator()}
            />
          }
          ListFooterComponent={() => this.genIndicator()}
          onEndReached={() => {
            console.log('---onEndReached----');
            setTimeout(() => {
              if (this.canLoadMore) {//fix 滚动时两次调用onEndReached https://github.com/facebook/react-native/issues/14015
                this.loadData(true);
                this.canLoadMore = false;
              }
            }, 100);
          }}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => {
            this.canLoadMore = true; //fix 初始化时页调用onEndReached的问题
            console.log('---onMomentumScrollBegin-----')
          }}
        />
        <Toast ref={'toast'} position={'center'} />

      </View>
    );
  }
}

const mapStateToProps = state => ({
  popular: state.popular
});
const mapDispatchToProps = dispatch => ({
  onRefreshPopular: (storeName, url, pageSize, favoriteDao) => dispatch(actions.onRefreshPopular(storeName, url, pageSize, favoriteDao)),
  onLoadMorePopular: (storeName, pageIndex, pageSize, items, favoriteDao, callBack) => dispatch(actions.onLoadMorePopular(storeName, pageIndex, pageSize, items, favoriteDao, callBack)),
  onFlushPopularFavorite: (storeName, pageIndex, pageSize, items, favoriteDao) => dispatch(actions.onFlushPopularFavorite(storeName, pageIndex, pageSize, items, favoriteDao)),

});
const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab)


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
    margin: 0
  },
  indicatorContainer: {
    alignItems: "center"
  },
  indicator: {
    color: 'red',
    margin: 10
  }


});
