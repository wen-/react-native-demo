import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  DeviceEventEmitter, Animated, Easing,
} from 'react-native';
import { connect } from 'dva-no-router';
import Toast from 'components/base/toast';
import Actions from '../actions/test1';

const mapStateToProps = ({ testData }) => ({ testData, title: '测试页' });

@connect(mapStateToProps)
export default class Test1 extends Component {
  constructor(props) {
    super(props);
    new Actions(this);
  }

  componentDidMount() {
    Toast.show({msg: '测试toast提示框', duration: 5000});
  }

  render() {
    const { title } = this.props;
    return (
        <View style={{flex:1}}>
          <Text>左姓名：{this.props.testData.name}</Text>
          <TouchableOpacity onPress={()=>{
            this.changeName(123);
          }}>
            <Text>修改姓名为：123</Text>
          </TouchableOpacity>
        </View>
    );
  }
}
