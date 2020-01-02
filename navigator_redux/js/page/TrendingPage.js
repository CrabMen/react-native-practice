import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, ActivityIndicator, RefreshControl, Button } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, ThemeColors } from 'react-navigation';
import { connect } from 'react-redux';
import actions from '../action';
import PopularItem from '../common/PopularItem';
import Toast from 'react-native-easy-toast'
import NavigationBar from '../common/NavigationBar';




const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const THEME_COLOR = '#678';




export default class TrendingPage extends Component {
  constructor(props) {
    super(props);
    this.tabNames = ['All', 'C', 'C#', 'PHP', 'JavaScript'];
  }
  _generateTabs() {
    const tabs = {};
    this.tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: props => <TrendingTabPage {...props} tabLabel={item} />,
        navigationOptions: {
          title: item,
        },
      };
    });

    return tabs;
  }

  render() {

    let statusBar = {
      backgroundColor: THEME_COLOR,
      barStyle: 'light-content',
    };
    let navigationBar = <NavigationBar
      title={'趋势'}
      statusBar={statusBar}
      style={{ backgroundColor: THEME_COLOR }}
    />;


    const TopTabNavigator = createAppContainer(
      createMaterialTopTabNavigator(this._generateTabs(), {
        tabBarOptions: {
          tabStyle: styles.tabStyle,
          upperCaseLabel: false,
          scrollEnabled: true,
          style: { backgroundColor: '#a67' },
          indicatorStyle: styles.indicatorStyle,
          labelStyle: styles.labelStyle,
        },
      }),
    );

    return (
      <View style={styles.container}>
        {navigationBar}
        <TopTabNavigator />
      </View>
    );
  }
}

const pageSize = 10;//设为常量，防止修改
class TrendingTab extends Component {
  constructor(props) {
    super(props)
    const { tabLabel } = this.props
    this.storeName = tabLabel
  }

  componentDidMount() {
    this.loadData()

  }

  loadData(loadMore) {
    const { onRefreshTrending, onLoadMoreTrending } = this.props;
    const store = this._store();
    const url = this.generateFetchUrl(this.storeName);
    if (loadMore) {
      onLoadMoreTrending(this.storeName, store.pageIndex, pageSize, store.items, callback => {
        this.refs.toast.show('没有更多了');
      })
    } else {
      onRefreshTrending(this.storeName, url, pageSize)
    }
  }

  _store() {
    const { trending } = this.props;
    let store = trending[this.storeName];
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
      item={item}
      onSelect={() => {

      }}
    />
  }

  render() {
    let store = this._store();

    return (
      <View style={styles.container}>
        <FlatList
          data={store.projectModels}
          renderItem={data => this.renderItem(data)}
          keyExtractor={item => `${item.id}`}
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
  trending: state.trending
});
const mapDispatchToProps = dispatch => ({
  onRefreshTrending: (storeName, url, pageSize) => dispatch(actions.onRefreshTrending(storeName, url, pageSize)),
  onLoadMoreTrending: (storeName, pageIndex, pageSize, items, callBack) => dispatch(actions.onLoadMoreTrending(storeName, pageIndex, pageSize, items, callBack)),
});
const TrendingTabPage = connect(mapStateToProps, mapDispatchToProps)(TrendingTab)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    // justifyContent: 'center',
    // alignItems: 'center',
  },

  tabStyle: {
    minWidth: 50,
  },

  indicatorStyle: {
    height: 2,
    backgroundColor: 'white',
  },

  labelStyle: {
    fontSize: 13,
    marginTop: 6,
    marginBottom: 6,
  },
  indicatorContainer: {
    alignItems: "center"
  },
  indicator: {
    color: 'red',
    margin: 10
  }


});
