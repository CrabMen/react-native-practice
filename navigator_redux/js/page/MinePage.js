import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {connect} from 'react-redux';
import actions from '../action';
 class MinePage extends Component {
  render() {
    const {navigation} = this.props;

    return (
      <View style={styles.container}>
        <Text>MinePage</Text>
        <Button
          title={'主题'}
          // onPress={() =>
          //   navigation.setParams({
          //     theme: {
          //       tintColor: 'pink',
          //       updateTime: new Date().getTime(),
          //     },
          //   })
          // }
          onPress={()=>this.props.onThemeChange('#539')}
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

const mapDispatchToProps=dispatch=>({
  onThemeChange:theme=>dispatch(actions.onThemeChange(theme))
})

export default connect(null,mapDispatchToProps)(MinePage)