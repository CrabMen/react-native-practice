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
export default class DetailPage extends Component {

  constructor(props) {
    super(props)
    this.params = this.props.navigation.state.params
    const { projectModel,flag} = this.params
    this.url = projectModel.item.html_url || TRENDING_URL + projectModel.item.fullName
    const title = projectModel.item.full_name || projectModel.item.fullName
    this.favoriteDao = new FavoriteDAO(flag);

    this.state = {
      title: title,
      url: this.url,
      canGoBack: false,
      isFavorite: projectModel.isFavorite
    }

  }

  onBack() {
    if (this.state.canGoBack) {
      this.webView.goBack()
    } else {
      NavigationUtil.goBack(this.props.navigation)
    }
  }
  onFavoriteButtonClick() {
    const { projectModel, callback } = this.params;
    const isFavorite = projectModel.isFavorite = !projectModel.isFavorite;
    callback(isFavorite);//更新Item的收藏状态
    this.setState({
      isFavorite: isFavorite,
    });
    let key = projectModel.item.fullName ? projectModel.item.fullName : projectModel.item.id.toString();
    if (projectModel.isFavorite) {
      this.favoriteDao.saveFavoriteItem(key, JSON.stringify(projectModel.item));
    } else {
      this.favoriteDao.removeFavoriteItem(key);
    }
  }
  renderRightButton() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => {
          this.onFavoriteButtonClick()
        }}>
          <FontAwesome name={this.state.isFavorite ? 'star' : 'star-o'}
            size={20} style={{ color: 'white', marginRight: 10 }} />
        </TouchableOpacity>
        {ViewUtil.getShareButton(() => {

        })}

      </View>
    )
  }
  onNavigationStateChange(naviState) {
    this.setState({
      canGoBack: naviState.canGoBack
    })

  }
  render() {
    const { navigation } = this.props;
    const titleLayoutStyle = this.state.title.length > 20 ? { paddingRight: 20 } : null
    let statusBar = {
      backgroundColor: THEME_COLOR,
      barStyle: 'light-content',
    };
    let navigationBar = <NavigationBar
      leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
      rightButton={this.renderRightButton()}
      title={this.state.title}
      titleLayoutStyle={titleLayoutStyle}
      statusBar={statusBar}
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
