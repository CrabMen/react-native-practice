import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

export default class FavoritePage extends Component {
  render() {
    const {navigation} = this.props;

    return (
      <View style={styles.container}>
        <Text>FavoritePage</Text>
        <Button
          title={'主题'}
          onPress={() =>
            navigation.setParams({
              theme: {
                tintColor: 'red',
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
