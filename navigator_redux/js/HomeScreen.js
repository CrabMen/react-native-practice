import React, {PureComponent} from 'react';
import {View} from 'react-native';
class HomeScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return <View style={{backgroundColor: 'blue'}} />;
  }
}

export default HomeScreen;
