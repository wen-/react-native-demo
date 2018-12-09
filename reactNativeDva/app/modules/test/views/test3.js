import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  DeviceEventEmitter,
} from 'react-native';
import { connect } from 'dva-no-router';
//import Actions from '../actions/test1';

const mapStateToProps = ({ testData }) => ({ testData, title: '测试页' });

@connect(mapStateToProps)
export default class Test1 extends Component {
  constructor(props) {
    super(props);
    //new Actions(this);
  }

  render() {
    const { title } = this.props;
    return (
      <View style={{flex:1, paddingTop: 44}}>
        <Text>右姓名：{this.props.testData.name}</Text>
      </View>
    );
  }
}
