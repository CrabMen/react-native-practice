import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, ShadowPropTypesIOS, RefreshControl } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import NavigationUtil from '../Navigator/NavigationUtil';
import { connect } from 'react-redux';
import actions from '../action';
import action from '../action';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';

export default class PopularPage extends Component {
  constructor(props) {
    super(props);
    this.tabNames = [
      'Java',
      'PHP',
      '.Net',
      'iOS',
      'Android',
      'HTML',
      'React-Native',
    ];
  }
  _generateTabs() {
    const tabs = {};
    this.tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: props => <PopularTabPage {...props} tabLabel={item} />,
        navigationOptions: {
          title: item,
        },
      };
    });

    return tabs;
  }

  render() {

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
        <TopTabNavigator />
      </View>
    );
  }
}

class PopularTab extends Component {
  constructor(props) {
    super(props)
    const { tabLabel } = this.props
    this.storeName = tabLabel
  }

  componentDidMount() {
    this.loadData()

  }

  loadData() {
    const { onLoadPopularData } = this.props
    const url = this.generateFetchUrl(this.storeName)
    onLoadPopularData(this.storeName, url)

  }

  generateFetchUrl(key) {
    return URL + key + QUERY_STR

  }

  renderItem(data) {
    const item = data.item
    return <View style={{marginBottom:10}}>
      <Text style={{backgroundColor:'#faa'}}>
        {JSON.stringify(item)}
      </Text>
    </View>

  }

  render() {
    let { popular } = this.props
    let store = popular[this.storeName]//动态获取state 
    if (!store) {
      store = {
        items: [],
        isLoading: false
      }
    }


    return (
      <View style={styles.container}>
        <FlatList
          data={state.items}
          renderItem={data => this.renderItem(data)}
          keyExtractor={item=>''+item.id }
          refreshControl={
            <RefreshControl
            title={'Loading'}
            titleColor='red'
            colors={['rend']}
            refreshing={store.isLoading}
            onRefresh ={()=>this.loadData()}
            tintColor='red'
            />
          }
        />

      </View>
    );
  }
}

const mapStateToProps = state => ({
  popular: state.popular
})

const mapDispatchToProps = dispatch => ({
  onLoadPopularData: (storeName, url) => dispatch(actions.onLoadPopularData(storeName, url))
})

const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab)


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
});
