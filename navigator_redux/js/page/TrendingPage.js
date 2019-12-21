import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {connect} from 'react-redux';
import {actions} from '../action';
 class TrendingPage extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Text>TrendingPage</Text>
        <Button
          title={'主题'} 
          onPress={() =>
            // navigation.setParams({
            //   theme: {
            //     tintColor: 'blue',
            //     updateTime: new Date().getTime(),
            //   },
            // })
            this.props.onThemeChange('orange')
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

const  mapDispatchToProps = dispatch=>({
  onThemeChange:theme=>dispatch(actions.onThemeChange(theme))
})
export default connect(null,mapDispatchToProps)(TrendingPage)
