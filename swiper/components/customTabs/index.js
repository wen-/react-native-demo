
import React from 'react';
import {
    Animated,
    Platform,
    StyleSheet,
    View,
    ViewPropTypes,
    PixelRatio, Text
} from 'react-native';

import Tab from './TabBarBottom'

export default class CustomTabBarComponent extends React.Component {
    render() {
        return (
            <Tab {...this.props}/>
        );
    }
}