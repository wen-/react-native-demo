import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  DeviceEventEmitter,
} from 'react-native';
import { connect } from 'tools/dva';
import Toast from 'components/base/toast';
import Dialogs from 'components/base/dialogs';
//import Actions from '../actions/test1';

class Test2 extends Component {
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
          Dialogs.alert('1111111111');
        }}>
          <Text>测试提示框1</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{
          Dialogs.confirm({msg: '222222222222222222', cancelPress: ()=>{console.log('点了取消')}, confirmPress: ()=>{console.log('点了确定')}});
        }}>
          <Text>测试提示框2</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(({ testData }) => ({ testData, title: '测试页' }))(Test2);
