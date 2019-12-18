import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

export default class DetailPage extends Component {
  render() {
    const {navigation} = this.props;

    return (
      <View style={styles.container}>
        <Text>DetailPage</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
