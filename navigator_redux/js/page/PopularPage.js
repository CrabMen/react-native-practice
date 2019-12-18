import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
export default class PopularPage extends Component {
  constructor(props) {
    super(props);
    this.tabNames = [];
  }

  render() {
    const TopTabNavigator = createAppContainer(
      createMaterialTopTabNavigator({
        PopularPageTab1: {
          screen: PopularTab,
          navigationOptions: {
            title: 'PopularPageTab1',
          },
        },

        PopularPageTab2: {
          screen: PopularTab,
          navigationOptions: {
            title: 'PopularPageTab2',
          },
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
});
