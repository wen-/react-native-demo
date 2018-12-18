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
import Toast from 'components/base/toast';
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
      <View style={{flex: 1}}>
        <Text>中姓名：{this.props.testData.name}</Text>
        <TouchableOpacity onPress={()=>{
          Toast.show({msg: '1111111111'});
        }}>
          <Text>测试提示框1</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{
          Toast.show('222222');
        }}>
          <Text>测试提示框2</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
