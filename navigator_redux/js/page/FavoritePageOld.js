import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import actions from '../action';
import { onThemeChange } from '../action/theme';
class FavoritePageOld extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Text>FavoritePage</Text>
        <Button
          title={'主题'}
          // onPress={() =>
          //   navigation.setParams({
          //     theme: {
          //       tintColor: 'red',
          //       updateTime: new Date().getTime(),
          //     },
          //   })
          // }
          onPress={()=>this.props.onThemeChange('green')}
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

const mapDispathchToProps = dispatch => ({
  onThemeChange: theme => dispatch(actions.onThemeChange(theme)) 
  }
)
export default connect(null,mapDispathchToProps)(FavoritePage)