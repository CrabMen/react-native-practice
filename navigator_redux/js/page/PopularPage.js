import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import NavigationUtil from '../Navigator/NavigationUtil';
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
        screen: props => <PopularTab {...props} tabLabel={item} />,
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
          style: {backgroundColor: '#a67'},
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
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>PopularTab</Text>
        <Text
          onPress={() => {
            NavigationUtil.gotoPage('DetailPage');
          }}>
          跳转到详情页
        </Text>
      </View>
    );
  }
}

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
