import React, { Component } from 'react';
import { StyleSheet, Text, View, Button,TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import actions from '../action';
import NavigationUtil from '../navigator/NavigationUtil';
import NavigationBar from '../common/NavigationBar';
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
 
const THEME_COLOR = '#678';
class MinePage extends Component {

  getRightButton() {
    return <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity
        onPress={() => {
        }}
      >
        <View style={{ padding: 5, marginRight: 8 }}>
          <Feather
            name={'search'}
            size={24}
            style={{ color: 'white' }}
          />
        </View>

      </TouchableOpacity>
    </View>
  }

  getLeftButton(callBack) {
    return <TouchableOpacity
      style={{ padding: 8, paddingLeft: 12 }}
      onPress={callBack}>
      <Ionicons
        name={'ios-arrow-back'}
        size={26}
        style={{ color: 'white' }} />
    </TouchableOpacity>
  }

  render() {
    const { navigation } = this.props;

    let statusBar = {
      backgroundColor: THEME_COLOR,
      barStyle: 'light-content',
    };
    let navigationBar =
      <NavigationBar
        title={'我的'}
        statusBar={statusBar}
        style={{ backgroundColor: THEME_COLOR, }}
        rightButton={this.getRightButton()}
        leftButton={this.getLeftButton()}
      />;

    return (

      <View style={styles.container}>
        {navigationBar}
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
          onPress={() => this.props.onThemeChange('#539')}
        />

        <Button
          title={"Fetch 使用"}
          onPress={() =>
            NavigationUtil.goPage({
              navigation: this.props.navigation
            }, "FetchDemoPage")
          } />
        <Button
          title={"AsyncStorage 使用"}
          onPress={() => {
            NavigationUtil.goPage({
              navigation: this.props.navigation
            }, "AsynStorageDemoPage")
          }} />
        <Button
          title={"离线缓存框架"}
          onPress={() => {
            NavigationUtil.goPage({
              navigation: this.props.navigation
            }, "DataStoreDemoPage")
          }} />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    marginTop: 30
  },
});

const mapDispatchToProps = dispatch => ({
  onThemeChange: theme => dispatch(actions.onThemeChange(theme))
})

export default connect(null, mapDispatchToProps)(MinePage)