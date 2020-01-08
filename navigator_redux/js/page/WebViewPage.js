import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import NavigationBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import WebView from 'react-native-webview';
import NavigationUtil from '../navigator/NavigationUtil';
import FavoriteDAO from '../expand/FavoriteDAO';
const TRENDING_URL = 'https://githu.com/'
const THEME_COLOR = '#a68'
export default class WebViewPage extends Component {

  constructor(props) {
    super(props)
    this.params = this.props.navigation.state.params
  const {title,url} = this.params 

    this.state = {
      title: title,
      url: url,
      canGoBack: false,
    }

  }

  onBack() {
    if (this.state.canGoBack) {
      this.webView.goBack()
    } else {
      NavigationUtil.goBack(this.props.navigation)
    }
  }  
  
  onNavigationStateChange(naviState) {
    this.setState({
      canGoBack: naviState.canGoBack
    })

  }
  render() {
   
    let navigationBar = <NavigationBar
      leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
      title={this.state.title}
      style={{ backgroundColor: THEME_COLOR }}
    />;

    return (
      <View style={styles.container}>
        {navigationBar}
        <WebView
          startInLoadingState={true}
          ref={e => this.webView = e}
          onNavigationStateChange={e => this.onNavigationStateChange(e)}
          source={{ uri: this.state.url }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
