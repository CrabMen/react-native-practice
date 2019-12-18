export default class NavigationUtil {
  static gotoPage(page, params = {}) {
    const {navigation} = NavigationUtil;
    if (!navigation) {
      console.log('NavigationUtil.navigation can not be null');
      return;
    }

    navigation.navigate(page, {...params});
  }

  static resetToHomePage(params) {
    const {navigation} = params;
    navigation.navigate('Main');
  }
}
