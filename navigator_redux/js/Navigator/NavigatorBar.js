import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes, StatusBar } from 'react-native';

export default class NavigatorBar extends Component {

    static PropTypes = {
        style: ViewPropTypes.style,
        title: PropTypes.string,
        titleView: PropTypes.element,
        titleLayoutStyle: ViewPropTypes.style,
        hide: PropTypes.bool,
        statusBar: PropTypes.shape(StatusBarShape),
        rightButton: PropTypes.element,
        leftButton: PropTypes.element,
    }

    render() {
        return (
            <View></View>
        )
    }

}
