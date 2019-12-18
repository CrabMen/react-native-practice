import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

export default class MinePage extends Component {
  render() {
    const {navigation} = this.props;

    return (
      <View style={styles.container}>
        <Text>MinePage</Text>
        <Button
          title={'主题'}
          onPress={() =>
            navigation.setParams({
              theme: {
                tintColor: 'pink',
                updateTime: new Date().getTime(),
              },
            })
          }
        />
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
